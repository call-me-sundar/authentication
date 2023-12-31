const db = require('../Models/db');
const bcrypt = require('bcryptjs');


const tableDatas = async (req, res) => {
    try {
        const [result] = await db.query(`select * from 	dashboardtable`);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({error:err})
    }
}

const columnDatas = async (req, res) => {
    try {
        const [result] = await db.query(`select * from 	columndetails`);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({error:err})
    }
}

const getAdminDetails = async (req, res) => {
    const { username } = req.body;
    try {
        const [result] = await db.query(`SELECT * FROM userdetails WHERE username = ? `, [username]);
        const pass = result[0].userpassword;
        console.log(pass);
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({error:err})
    }
}


module.exports = {  tableDatas, columnDatas, getAdminDetails }; 
