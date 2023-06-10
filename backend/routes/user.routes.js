const express = require ("express");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { UserModel } = require("../models/users.models");
const { LoggedUserModel } = require("../models/loggedUser.model");
dotenv.config()


// Registration 

UserRouter.post("/register", async (req, res) => {

    const {name, email, password} = req.body
      
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
           console.log({password: hash})
           const user = new UserModel({name, email, password:hash})
            await user.save()
            res.status(200).send({'msg' : 'Registration is Successfull.'})
        }) 
    } catch (error) {
        console.log(error)
        res.send(400).send({'msg': error.message})
    }
})



// Login

UserRouter.post("/login", async(req, res) => {
    const {email, password} = req.body;
    

    try {
        const userData = await UserModel.find({email:email})
        console.log(userData[0])
        if(userData.length === 0){
            res.status(400).send({'msg': 'User not found.'})
            } else {
                bcrypt.compare(password, userData[0].password, async (err, result) => {
                    if(result){
                        const token = jwt.sign({userId: userData[0]._id},'mockten')

                        const loggedUser = new LoggedUserModel({ID:userData[0]._id, name: userData[0].name, email:userData[0].email, password:userData[0].password})
                        await loggedUser.save()

                        // localStorage.setItem("token" , JSON.stringify(token))

                        res.status(200).send({'msg': 'Login is Successfull.', token})
                    } else {
                        res.status(400).send({'msg': `Wrong Credentials \n Login is UnSuccessful`})
                    }
                });
            }    
    } catch (error) { 
        res.send(400).send({'msg' : error.message})
    }
})

module.exports = { UserRouter };

