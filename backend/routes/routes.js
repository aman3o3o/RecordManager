const express = require("express");
const { datafetch, datainsert, dataupdate, datadelete, datafetchE } = require("../controller/data_controller");
const { usersignup, userlogin, alluser } = require("../controller/user_controller");
// const {userfetch} = require("../controller/user_controller");
const { tokenvalidate } = require("../controller/token_controller");
const { forgotpassword, resetpassword } = require("../controller/password_controller");
const { tokenValidate } = require("../middleware/tokenvalidate");

// todo controller
let dataroutes = express.Router();

dataroutes.get("/data/fetch",tokenValidate,datafetch);
dataroutes.get("/data/fetchE/:email",tokenValidate,datafetchE);
dataroutes.post("/data/insert",tokenValidate,datainsert);
dataroutes.patch("/data/update/:id",tokenValidate,dataupdate);
dataroutes.delete("/data/delete/:id",tokenValidate,datadelete);

// user controller
let userroutes = express.Router();

userroutes.post("/user/signup",usersignup);
userroutes.post("/user/login",userlogin);
// userroutes.get("/user/fetch/:email",userfetch);
userroutes.get("/alluser",tokenValidate,alluser);

// token controller
let tokenroutes = express.Router();

tokenroutes.post("/tokenvalidate",tokenvalidate);

// password controller
let passwordroutes = express.Router();

passwordroutes.post("/forgotpassword",forgotpassword);
passwordroutes.post("/resetpassword/:token",resetpassword);

module.exports={dataroutes,userroutes,tokenroutes,passwordroutes};