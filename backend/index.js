const express = require("express");
const dotenv = require("dotenv");
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/user.routes");
const { auth } = require("./middlewares/auth.middleware");
const { UserInfoRouter } = require("./routes/userInfo.routes");
const { EMIRouter } = require("./routes/emi.routes");
dotenv.config()



const app = express()
app.use(express.json()) // middleware


app.use("/users", UserRouter)

// app.use(auth) // middleware
app.use("/usersInfo", UserInfoRouter)

app.use("/emi", EMIRouter)



app.listen(process.env.PORT, async () => {
    try {
       await connection 
       console.log('Connected to MongoDb') 
    } catch (error) {
        console.log(error)
        console.log('Cannot Connect to MongoDb')
    }

    console.log(`Server is Running at port 8080`)
})

