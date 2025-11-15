const data_model = require("../model/data_model/data_model");
const user_model = require("../model/user_model/user_model");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { resetpassword_validate } = require("../validation/user_validation");
const bcrypt = require("bcrypt");

let forgotpassword = async (req, res) => {
    try {
        let { email } = req.body;
        let data = await user_model.findOne({ email });
        if (!data) {
            return res.status(404).json({
                message: "email not found"
            })
        }

        let token = crypto.randomBytes(32).toString("hex");
        data.resettoken = crypto.createHash("sha256").update(token).digest("hex");
        data.resettokenexpire = Date.now() + (15 * 60 * 1000);
        await data.save();

        let name = "user";
        let data_data = await data_model.findOne({ email });
        if (data_data) {
            name = data_data.name;
        }

        let resetpasswordlink = `http://localhost:5173/resetpassword/${token}`;

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "amanpd14150518@gmail.com",
                pass: "nljk vdba qcos pboz"
            }
        })

        let receiver = {
            from: "amanpd14150518@gmail.com",
            to: data.email,
            subject: "PASSWORD RESET LINK",
            text: `Hey ${name}, please reset your password with the given link within 15 minutes. please NOTE on completion of the time, the reset link will not work`,
            html: `<a href="${resetpasswordlink}">Click here to reset your password</a>`
        }

        await transporter.sendMail(receiver);

        return res.status(200).json({
            success: true,
            message: "password reset link has been shared in your registered email account"
        })

    }
    catch (err) {
        console.log("forgotpassword error -");
        console.log(err);
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

let resetpassword = async (req, res) => {
    try {
        await resetpassword_validate.validateAsync(req.body);
        let { password } = req.body;
        let { token } = req.params;
        let hashpass = crypto.createHash("sha256").update(token).digest("hex");
        let data = await user_model.findOne({ resettoken: hashpass })
        if (!data) {
            return res.status(400).json({
                message: "token invalid"
            })
        }
        data = await user_model.findOne({ resettoken: hashpass ,resettokenexpire : {$gt : Date.now()}});
        if(!data){
            return res.status(410).json({
                message : "token expired"
            })
        }
        data.password = await bcrypt.hash(password,10);
        data.resettoken = "";
        data.resettokenexpire = "";
        await data.save();
        return res.status(200).json({
            message: "password changed successfully",
            success : true
        })
    }
    catch (err) {
        console.log("resetpassword error -");
        console.log(err);
        return res.status(500).json({
            message : err.message,
            name : err.name
        })
    }
}

module.exports={forgotpassword,resetpassword};