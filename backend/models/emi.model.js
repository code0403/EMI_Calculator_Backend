const mongoose = require("mongoose");

const emiSchema = mongoose.Schema({
    userID : String,
    LoanPrincipalAmount : Number, 
    Rate : Number,
    Tenure : Number,
    EMI : Number,
    Interest : Number,
    Total : Number
})

const EMIModel = mongoose.model("emi", emiSchema)

module.exports = { EMIModel };