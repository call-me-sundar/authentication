const db = require('../Models/db');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')

const checkUser = async (req, res) => {
    const { username, mail } = req.body;
    try {
        const [result] = await db.query(`SELECT * FROM userdetails WHERE username = ? OR usermail = ?`, [username, mail]);
        if (result.length === 1) {
            res.status(200).json("user has exist")
            console.log(result.length);
        }
        else {
            res.status(201).json({ msg: 'user Not found' })
        }
    } catch (err) {
        res.status(500).json({"error": err})
    }
}

const sendOtp =  async (req, res) => {
    const {mail} = req.body;
    try {
        const OTP = Math.floor(Math.random() * 900000) + 100000;
        const [result] = await db.query(`SELECT * FROM userdetails WHERE usermail = ?`, [mail]);
        
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sundar10072001@gmail.com",
                pass: "wiiy olia hsth cczf" // Replace with your actual Gmail password
            }
        });

        const message = {
            from: 'sundar10072001@gmail.com',
            to: mail,
            subject: 'Account Registeration',
            text: `This is your valid OTP: /n ${OTP}`
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Something went wrong with sending the email" });
            }
            res.status(200).json(OTP);
        });
    } catch (err) {
        res.status(500).json({"error": err})
    }
}



module.exports = { checkUser, sendOtp }