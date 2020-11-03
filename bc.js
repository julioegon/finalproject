const { match } = require("assert");
const bcrypt = require("bcryptjs");
let { genSalt, hash, compare } = bcrypt;
const { promisify } = require("util");

genSalt = promisify(genSalt);
hash = promisify(hash);
compare = promisify(compare);

module.exports.compare = compare;
module.exports.hash = (plainTxtPw) =>
    genSalt().then((salt) => hash(plainTxtPw, salt));