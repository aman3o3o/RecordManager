const joi = require("joi");

const signup_validate = joi.object({
    name : joi.string().required().pattern(/[A-Za-z ]+/).min(3).max(50),
    email : joi.string().email().required(),
    password : joi.string().required().min(5).max(10)
})

const login_validate = joi.object({
    email : joi.string().email().required(),
    password : joi.string().required().min(5).max(10)
})

const data_validate = joi.object({
    email : joi.string().email().required(),
    experience : joi.string().pattern(/[0-9]+/).required(),
    salary : joi.string().pattern(/[0-9]+/).required(),
    designation : joi.string().pattern(/[A-Za-z ]+/).required(),
    company : joi.string().pattern(/[A-Za-z ]+/).required(),
    state : joi.string().pattern(/[A-Za-z ]+/).required(),
    number : joi.string().pattern(/[0-9]+/).min(10).max(10).required(),
    country : joi.string().pattern(/[A-Za-z ]+/).required(),
    dob : joi.date().required().min("2000-01-01")
})

const resetpassword_validate = joi.object({
    password : joi.string().required().min(5).max(10),
    confirmpass : joi.valid(joi.ref("password")).required().messages({"any.only":"password not matched"})
})

module.exports={signup_validate,data_validate,resetpassword_validate,login_validate};