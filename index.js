//console.log('sanity check');
const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const { hash, compare } = require("./bc");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const ses = require("./ses");
const s3 = require("./s3");
const s3Url = "https://s3.amazonaws.com/image-board-pimento/";
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

// COOKIE SESSION MIDDLEWARE //
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(compression());

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});
// BOILER PLATE FOR REQ.BODY POST REQ NOT TO BE EMPTY //
app.use(express.json());

app.use(express.static("public"));

// BUNDLE SERVER THAT COMPILED OUR CODE //
if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//// ROUTES /////
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.getUserByEmail(email)
        .then((results) => {
            compare(password, results.rows[0].password).then((match) => {
                if (match) {
                    req.session.userId = results.rows[0].id;
                    res.json({ success: true });
                } else {
                    res.json({ success: false });
                }
            });
        })
        .catch((err) => {
            console.log("Email or password didn't match:", err);
        })
        .catch((err) => {
            console.log("Email or password didn't match:", err);
        });
});

app.post("/register", (req, res) => {
    const { first, last, email, password } = req.body;
    hash(password)
        .then((hashedPw) => {
            if (
                first !== "" &&
                last !== "" &&
                email !== "" &&
                password !== ""
            ) {
                console.log("first: ", first);
                db.addRegistration(first, last, email, hashedPw)
                    .then((results) => {
                        //console.log('results.rows[0].id: ', results.rows[0].id);
                        req.session.userId = results.rows[0].id;
                        res.json({ success: true });
                    })
                    .catch((err) => {
                        console.log("error with addRegistration", err);
                    });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("error in POST register hash", err);
        });
});

app.post("/password/reset/start", (req, res) => {
    const { email } = req.body;
    db.getUserByEmail(email).then(({ rows }) => {
        if (rows[0]) {
            const secretCode = cryptoRandomString({
                length: 6,
            });
            db.addCode(email, secretCode)
                .then(() => {
                    const subject = "Your verification code";
                    const message = `Welcome, 
                    Please use the following code for resetting your password: ${secretCode}`;
                    return ses.sendEmail(email, message, subject);
                })
                .then(() => {
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("error while adding secret code", err);
                    res.json({
                        errorMessage:
                            "Oops, something went wrong, please try again",
                    });
                });
        } else {
            res.json({
                errorMessage:
                    "Sorry, given e-mail is not registered in our service",
            });
        }
    });
});

app.post("/password/reset/verify", (req, res) => {
    console.log(req.body);
    const { email, code, password } = req.body;
    db.getCode(email).then(({ rows }) => {
        if (code == rows[0].code) {
            console.log("match");
            hash(password)
                .then((hash) => {
                    console.log(hash);
                    return db.updatePassword(hash, email);
                })
                .then(() => {
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("error while updating a password", err);
                    res.json({
                        errorMessage:
                            "Sorry, something went wrong, please try again",
                    });
                });
        } else {
            res.json({
                errorMessage:
                    "Sorry, but the verification code does not match or has expired",
            });
        }
    });
});

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("/user", (req, res) => {
    const { userId } = req.session;
    console.log("userId: ", userId);
    db.getUserById(userId)
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("error in GET /user: ", err);
        });
});

app.get("/api/user/:id", (req, res) => {
    console.log("ACCESSED GET /api/user route ");
    const { id } = req.params;
    if (id) {
        db.getUserById(id)
            .then(({ rows }) => {
                // console.log("rows in GET /user", rows);
                res.json({
                    success: true,
                    rows: rows[0],
                });
            })
            .catch((err) => {
                "err in GET /user with getUserInfo()", err;
                res.json({
                    success: false,
                    errorMsg: "Server error: Could not find user details",
                });
            });
    } else {
        //user is not logged in
        res.redirect("/");
    }
});

app.post(
    "/upload/profilepic",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        if (req.file) {
            //console.log("req.session.userId: ", req.session.userId);
            const id = req.session.userId;
            const { filename } = req.file;
            const url = s3Url + filename;
            console.log("url from post image:", url);
            console.log("id from post image:", id);
            db.postImages(url, id)
                .then(({ rows }) => {
                    rows = rows[0];
                    console.log("image url after upload:", rows);
                    res.json(rows);
                })
                .catch((err) => {
                    console.log("error in posting image: ", err);
                    res.json({
                        success: false,
                    });
                });
        } else {
            res.json({
                success: false,
            });
        }
    }
);

app.post("/bioeditor", (req, res) => {
    const bio = req.body.bio;
    console.log("req.body.bio: ", req.body.bio);
    const id = req.session.userId;

    db.addBio(bio, id)
        .then(({ rows }) => {
            console.log("rows: ", rows[0].bio);
            console.log("userId after upload:", rows);
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("error in posting image: ", err);
            res.json({
                success: false,
            });
        });
});

app.get("/api/users", (req, res) => {
    console.log("ACCESSED GET /api/users route");

    db.findUsers()
        .then(({ rows }) => {
            //console.log("res from findUsers()", rows);
            res.json({
                success: true,
                rows,
            });
        })
        .catch((err) => {
            console.log("err in /api/:users with findUsers()", err);
        });
});

app.get(`/api/users/:search`, (req, res) => {
    console.log("ACCESSED GET /api/:search route");
    console.log("req.params in api/search", req.params);
    const { search } = req.params;

    db.getMatchUsers(search)
        .then(({ rows }) => {
            if (rows.length != 0) {
                console.log("res from getMatchUsers()", rows);
                res.json({
                    success: true,
                    rows,
                });
            } else {
                res.json({
                    success: false,
                    error: "No users found",
                });
            }
        })
        .catch((err) => {
            console.log("err in /api/:users with getMatchUsers()", err);
        });
});

////// FRIEND REQUEST ////

app.get(`/api/friendStatus/:otherId`, async (req, res) => {
    console.log("ACCESSED GET /api/friendStatus/:otherId route");
    const { otherId } = req.params;
    const { userId } = req.session;

    try {
        let { rows } = await db.checkFriendStatus(userId, otherId);
        if (rows.length == 0) {
            res.json({
                status: "Send Friend Request",
            });
        } else if (!rows[0].accepted && rows[0].sender_id == userId) {
            res.json({
                status: "Cancel Friend Request",
            });
        } else if (!rows[0].accepted && rows[0].sender_id == otherId) {
            res.json({
                status: "Accept Friend Request",
            });
        } else if (rows[0].accepted) {
            res.json({
                status: "Remove Friend",
            });
        }
    } catch (err) {
        console.log(
            "err in /api/friendStatus/:otherId with checkFriendStatus",
            err
        );
    }
});

app.post(`/api/friendStatus/button`, async (req, res) => {
    console.log("ACCESSED POST /api/friendStatus/button route");
    let { buttonText, otherId } = req.body;
    let { userId } = req.session;

    if (buttonText == "Send Friend Request") {
        try {
            await db.sendFriendRequest(userId, otherId);
            res.json({ status: "Cancel Friend Request" });
        } catch (err) {
            console.log("err in POST .../button with sendFriendRequest", err);
        }
    } else if (buttonText == "Cancel Friend Request") {
        try {
            await db.cancelFriendRequest(userId, otherId);
            res.json({ status: "Send Friend Request" });
        } catch (err) {
            console.log("err in POST .../button with cancelFriendRequest", err);
        }
    } else if (buttonText == "Accept Friend Request") {
        try {
            await db.acceptFriendRequest(userId, otherId);
            res.json({ status: "Remove Friend", id: otherId });
        } catch (err) {
            console.log("err in POST .../button with acceptFriendRequest", err);
        }
    } else if (buttonText == "Remove Friend") {
        try {
            await db.removeFriend(userId, otherId);
            res.json({ status: "Send Friend Request", id: otherId });
        } catch (err) {
            console.log("err in POST .../button with removeFriend", err);
        }
    }
});

app.get("/getFriends", async (req, res) => {
    const { userId } = req.session;
    console.log("userId: ", userId);
    try {
        const { rows } = await db.getFriends(userId);
        let received = rows.filter(function (user) {
            return !user.accepted && user.sender_id != userId;
        });
        let sent = rows.filter(function (user) {
            return !user.accepted && user.sender_id == userId;
        });
        res.json({ rows, received, sent });
    } catch (e) {
        console.log(e);
    }
});

/// LOGOUT ///

app.get("/api/logout", (req, res) => {
    req.session = null;
    res.redirect("*");
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, function () {
    console.log("I'm listening.");
});

//// SOCKET SERVER ////

io.on("connection", (socket) => {
    console.log(`socket with the id ${socket.id} is now connected`);

    // socket.on("disconnect", function () {
    //     console.log(`socket with the id ${socket.id} is now disconnected`);
    // });

    const userId = socket.request.session.userId;

    if (!userId) {
        return socket.disconnect(true);
    }

    db.getLast10Msgs().then(({ rows }) => {
        io.sockets.emit("chatHistory", rows.reverse());
    });

    //io.sockets.emit("chatHistory", "");

    // receiving a new message from a connected socket
    socket.on("My amazing new msg", (newMsg) => {
        console.log("received amazing new msg from client:", newMsg);
        // we want to find out who send this msg :D
        console.log("author of the msg was user with id:", userId);
        db.addNewMessage(newMsg, userId).then(({ rows }) => {
            const timestamp = rows[0].timestamp;
            // const chat_id = rows[0].id;

            db.getUserById(userId).then(({ rows }) => {
                const payload = {
                    user_id: rows[0].id,
                    first: rows[0].first,
                    last: rows[0].last,
                    profileimg: rows[0].profileimg,
                    message: newMsg,
                    timestamp: timestamp,
                };
                io.emit("My amazing new msg", payload);
            });
        });
    });
});
