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

app.use(
    cookieSession({
        secret: "Whatever Secret",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(compression());

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.json());

app.use(express.static("public"));

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
    const bio = req.body;
    console.log("req.body: ", req.body);
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

    // sending messaged to client from server
    socket.emit("welcome", {
        name: "Julio",
    });

    // io.emit: sends a message to Every Connected Client
    io.emit("messageSentWithIoEmit", {
        id: socket.id,
    });

    // socket.broadcast.emit
    socket.broadcast.emit("broadcastEmitFun", {
        socketId: socket.id,
    });

    // listening message from client
    socket.on("messageFromClient", (data) => {
        //console.log("data from socket: ", data);
    });
});
