//console.log('sanity check');
const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require("cookie-session");
const db = require("./db");
const { hash, compare } = require("./bc");

app.use(
    cookieSession({
        secret: "Whatever Secret",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(compression());

app.use(express.json());

app.use(express.static("public"));

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//// ROUTES /////

app.post("/register", (req, res) => {
    const { first, last, email, password } = req.body;
    hash(password)
        .then((hashedPw) => {
            console.log("hashedPw in / register:", hashedPw);
            if (
                first !== "" &&
                last !== "" &&
                email !== "" &&
                password !== ""
            ) {
                db.addRegistration(first, last, email, hashedPw)
                    .then((results) => {
                        console.log("results:", results);
                        req.session.userId = { 
                            id: results.rows[0].id,
                            first: first,
                            last: last,
                            email: email,
                        };
                        res.json({ success:true });
                        console.log(
                            "req.session.userId: ",
                            req.session.userId
                        );
                        
                        // res.redirect("/petition");
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

// app.post("/register", (req,res) => {
//     console.log("Hit the post register route!!");
//     console.log("req.body: ", req.body);
//     req.session.userId = 1;
//     res.json({ succes:true });
// });


app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});


app.get('*', function(req, res) {
    console.log('req.session: ', req.session);
    // console.log('req.session.userId: ', req.session.userId);
    // console.log('!res.session.userId: ', !res.session.userId);
    if (!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
