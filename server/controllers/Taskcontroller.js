const db = require('../Models/db');
const bcrypt = require('bcryptjs');

const getData = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [result] = await db.query(
            `SELECT * FROM userdetails WHERE (username = ? OR usermail = ?) AND userpassword = ?`,
            [username, username, password]
        );

        if (result.length === 1) {
            res.status(200).json([result])
        }
        else {
            res.status(401).json({ msg: 'login failed' })
        }
    } catch (err) {
        res.status(500).json({ "error": err })
    }
}

const tableDatas = async (req, res) => {
    try {
        const [result] = await db.query(`select * from 	dashboardtable`);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json("error", err)
    }
}

const columnDatas = async (req, res) => {
    try {
        const [result] = await db.query(`select * from 	columndetails`);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json("error", err)
    }
}

const getAdminDetails = async (req, res) => {
    const { username } = req.body;
    try {
        const [result] = await db.query(`SELECT * FROM details WHERE username = ? `, [username]);
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json("error", err)
    }
}


module.exports = { getData, tableDatas, columnDatas, getAdminDetails }; 
