const {Schema, model} = require('mssql');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
});
module.exports = model('User',userSchema);