const express = require("express")
const UserInfoRouter = express.Router();
const jwt = require("jsonwebtoken");
const { LoggedUserModel } = require("../models/loggedUser.model");

UserInfoRouter.get("/", async (req, res) => {

    const token = req.headers.authorization
    const decoded = jwt.verify(token, process.env.SECRET_CODE)
    console.log(decoded)

    try {
        if(decoded){
            const Info = await LoggedUserModel.find({"ID" : decoded.userId})
            console.log(Info)
            res.status(200).send(Info)
        }
    } catch (error) {
       console.log(error)
       res.status(400).send({"msg" : error.message})
    }
})

module.exports = { UserInfoRouter };