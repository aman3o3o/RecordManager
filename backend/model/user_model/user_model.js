let mongoose = require("mongoose");
const { loginsetup } = require("../../dbConnect/loginConnection");

let user_schema = mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    resettoken : {
        type : String
    },
    resettokenexpire : {
        type : Date
    }
})

//login database connection
let loginConnection = loginsetup();

let user_model = loginConnection.model("user",user_schema);

module.exports = user_model;