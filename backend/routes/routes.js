const express = require("express");
const { datafetch, datainsert, dataupdate, datadelete } = require("../controller/data_controller");
const { usersignup, userlogin, userfetch } = require("../controller/user_controller");
const { tokenvalidate } = require("../controller/token_controller");
const { forgotpassword, resetpassword } = require("../controller/password_controller");

// todo controller
let dataroutes = express.Router();

dataroutes.get("/data/fetch/:email",datafetch);
dataroutes.post("/data/insert/:email",datainsert);
dataroutes.patch("/data/update/:id",dataupdate);
dataroutes.delete("/data/delete/:id",datadelete);

// user controller
let userroutes = express.Router();

userroutes.post("/user/signup",usersignup);
userroutes.post("/user/login",userlogin);
userroutes.get("/user/fetch/:email",userfetch);

// token controller
let tokenroutes = express.Router();

tokenroutes.post("/tokenvalidate",tokenvalidate);

// password controller
let passwordroutes = express.Router();

passwordroutes.post("/forgotpassword",forgotpassword);
passwordroutes.post("/resetpassword/:token",resetpassword);

module.exports={dataroutes,userroutes,tokenroutes,passwordroutes};