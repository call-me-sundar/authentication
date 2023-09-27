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
        res.status(500).json({ "error": err })
    }
}

const sendOtp = async (req, res) => {
    const { username, mail } = req.body;
    try {
        const OTP = Math.floor(Math.random() * 900000) + 100000;
        const [result] = await db.query(`SELECT usermail FROM userdetails WHERE username = ? OR usermail = ?`, [username, username]);
        let email = '';
        if (result.length === 1) {
            email = result[0].usermail;
            console.log(result[0].usermail);
        } else {
            email = mail
            console.log('ila');
        }
        console.log(email);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sundar10072001@gmail.com",
                pass: "wiiy olia hsth cczf" // Replace with your actual Gmail password
            }
        });

        const message = {
            from: 'sundar10072001@gmail.com',
            to: email,
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
        res.status(500).json({ "error": err })
    }
}


const createUser = async (req, res) => { // You need to pass req and res as parameters
    const { username, mail, confirmPassword } = req.body;
    try {
        // Check if the username or email already exists
        const [check] = await db.query(`SELECT * FROM userdetails WHERE username = ? OR usermail = ?`, [username, mail]);

        if (check.length === 0) { // Use check.length to check if any rows were found
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(confirmPassword, saltRounds);

            // Use backticks instead of single quotes for column names
            const [result] = await db.query(
                `INSERT INTO userdetails (username, userpassword, usermail) VALUES (?,?,?)`,
                [username, hashedPassword, mail]
            );

            res.status(200).json('User created successfully');
        } else {
            res.status(400).json('Username or email already exists'); // 400 Bad Request for duplicate entries
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('User not created');
    }
}



module.exports = { checkUser, sendOtp, createUser }