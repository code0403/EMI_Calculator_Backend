const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    ID : String, 
    name : String,
    email : String,
    password : String
})

const LoggedUserModel = mongoose.model("loggedUser", userSchema)

module.exports = { LoggedUserModel };