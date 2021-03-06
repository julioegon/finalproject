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

exports.addCode = (email, code) => {
    return db.query(
        `
        INSERT INTO reset_codes (email, code)
        VALUES ($1, $2)
    `,
        [email, code]
    );
};

exports.getCode = (email) => {
    return db.query(
        `SELECT * FROM reset_codes
        WHERE CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes' 
        AND email = $1
        ORDER BY id DESC
        LIMIT 1;
        `,
        [email]
    );
};

exports.updatePassword = (hash, email) => {
    return db.query(`UPDATE users SET password = $1 WHERE email = $2`, [
        hash,
        email,
    ]);
};

exports.postImages = (profileimg, id) => {
    return db.query(
        `UPDATE users SET profileimg = $1 WHERE id = $2 RETURNING profileimg;
    `,
        [profileimg, id]
    );
};

exports.addBio = (bio, id) => {
    return db.query(
        `UPDATE users SET bio = $1 WHERE id = $2 RETURNING bio;
    `,
        [bio, id]
    );
};

exports.getUserById = (id) => {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
};

module.exports.findUsers = () => {
    return db.query(`SELECT * FROM users ORDER BY id DESC LIMIT 3`);
};

module.exports.getMatchUsers = (val) => {
    return db.query(
        `SELECT id, first, last, profileimg FROM users WHERE first ILIKE $1 ORDER BY first 
        ASC LIMIT 3;`,
        [val + "%"]
    );
};

module.exports.checkFriendStatus = (userId, otherId) => {
    return db.query(
        `
        SELECT * FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)
        `,
        [userId, otherId]
    );
};

//INSERT - runs when you send a friend request
module.exports.sendFriendRequest = (userId, otherId) => {
    return db.query(
        `
        INSERT INTO friendships 
        (sender_id, recipient_id) 
        VALUES($1, $2);
        `,
        [userId, otherId]
    );
};

module.exports.cancelFriendRequest = (userId, otherId) => {
    return db.query(
        `
        DELETE FROM friendships 
        WHERE sender_id=$1 AND recipient_id=$2
        `,
        [userId, otherId]
    );
};

module.exports.acceptFriendRequest = (userId, otherId) => {
    return db.query(
        `
        UPDATE friendships 
        SET accepted=true
        WHERE sender_id=$2 AND recipient_id=$1
        `,
        [userId, otherId]
    );
};

module.exports.removeFriend = (userId, otherId) => {
    return db.query(
        `
        DELETE FROM friendships 
        WHERE sender_id=$1 AND recipient_id=$2 
        OR sender_id=$2 AND recipient_id=$1 
        `,
        [userId, otherId]
    );
};

// Get Friends, receivedRequests and sentRequests

module.exports.getFriends = (userId) => {
    return db.query(
        `
        SELECT users.id, first, last, profileimg, accepted, sender_id, recipient_id
        FROM friendships
        JOIN users
        ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = false AND sender_id = $1 AND recipient_id = users.id)
        OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
        `,
        [userId]
    );
};

module.exports.getLast10Msgs = () => {
    return db.query(
        `
        SELECT users.id AS user_id, first, last, profileimg, chat.id AS chat_id, message, sender_id, chat.timestamp
        FROM chat 
        JOIN users
        ON (sender_id=users.id)
        ORDER BY chat.id DESC
        LIMIT 10;
        `
    );
};

module.exports.addNewMessage = (message, senderId) => {
    return db.query(
        `
        INSERT INTO chat 
        (message, sender_id) 
        VALUES($1,$2)
        RETURNING *
        `,
        [message, senderId]
    );
};
