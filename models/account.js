const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test');

const account = new Schema({
    username: String,
    password: String,
    role: String
}, {
    collection: 'account'
})

const AccountModel = mongoose.model('account', account);
module.exports = AccountModel;
