const express = require("express");
const { EMIModel } = require("../models/emi.model");
const EMIRouter = express.Router()
const jwt = require("jsonwebtoken")


EMIRouter.post("/", async(req, res) => {

    const token = req.headers.authorization
    const decoded = jwt.verify(token, process.env.SECRET_CODE)
    console.log(decoded)

    let { P, r, n } = req.body;

    let R = (( r / 12 ) / 100).toFixed(6)
    let N = n * 12
    let X = (1 + R) * N
    
    let E = (P * R * X) / ( X - 1 ) 

    let T = E * N;

    let I = T - P

    const newEMI = new EMIModel({userID : decoded.userId, LoanPrincipalAmount: P, Rate: R, Tenure:N, EMI:E, Interest:I, Total:T})
    await newEMI.save()
    console.log(newEMI)
    res.status(201).send(newEMI)

})

module.exports = { EMIRouter };