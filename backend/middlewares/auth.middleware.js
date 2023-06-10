const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config()


const auth = (req, res, next) => {

    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, process.env.SECRET_CODE, (err, decoded) => {

            if(decoded){console.log(decoded.userId)
                req.body.userId = decoded.userId
                next()
            } else {
                res.status(400).send({"msg" : "Please Login First"})
            }
           
        })

        res.status(400).send({'msg' : 'Please Login!'})
    }
}

module.exports = { auth };