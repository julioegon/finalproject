  
const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

exports.addRegistration = (first, last, email, password) => {
    return db.query(
        `
        INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id
    `,
        [first, last, email, password]
    );
};

exports.getUserByEmail = (email) => {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};