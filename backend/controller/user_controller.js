const user_model = require("../model/user_model/user_model");
const { signup_validate, login_validate } = require("../validation/user_validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let usersignup = async (req, res) => {
    try {
        await signup_validate.validateAsync(req.body);
        let { name, email, password } = req.body;
        let email_check = await user_model.findOne({ email });
        if (email_check) {
            return res.status(409).json({
                message: "email already exists"
            })
        }
        password = await bcrypt.hash(password, 10);
        let data = { name, email, password };
        let result = new user_model(data);
        await result.save();
        return res.status(200).json({
            message: "you are successfully signed up",
            success: true
        })
    }
    catch (err) {
        console.log("user/signup error - ");
        console.log(err);
        return res.status(500).json({
            message: err.message,
            name: err.name
        })
    }
}

let userlogin = async (req, res) => {
    try {
        await login_validate.validateAsync(req.body);
        let { email, password } = req.body;
        let result = await user_model.findOne({ email });
        if (!result) {
            return res.status(404).json({
                // message: "invalid credentials"
                message: "Invalid credentials"
            })
        }
        let enc_pass = result.password;
        let pass_check = await bcrypt.compare(password, enc_pass);
        if (!pass_check) {
            return res.status(404).json({
                // message: "invalid credentials"
                message: "Invalid credentials"
            })
        }
        let token = jwt.sign({ email }, process.env.JWTSECRET, { expiresIn: "1h" });
        return res.status(200).json({
            message: "congrats, you are successfully logged in",
            success: true,
            token: token,
            email: email
        })
    }
    catch (err) {
        console.log("user/login error - ");
        console.log(err);
        return res.status(500).json({
            message: err.message,
            name: err.name
        })
    }
}

let userfetch = async (req, res) => {
    try {
        let { email } = req.params;
        let data = await user_model.findOne({ email });
        if (!data) {
            return res.status(404).json({
                message: "signup data is empty"
            })
        }
        return res.status(200).json({
            success: true,
            signupdata: data
        })
    }
    catch (err) {
        console.log("userfetch error -");
        return res.status(500).json({
            message: err.message,
            name: err.name
        })
    }
}

module.exports = { usersignup, userlogin, userfetch };