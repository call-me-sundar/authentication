const db = require('../Models/db');
const bcrypt = require('bcryptjs');

const LoginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [result] = await db.query(
            `SELECT * FROM userdetails WHERE (username = ? OR usermail = ?)`,
            [username, username]
        );

        if (result.length === 1) {
            const hashedPassword = await bcrypt.compare(password, result[0].userpassword);
            console.log(hashedPassword);
            if(hashedPassword){
                res.status(200).json([result])
            }
            else{
                res.status(401).json({ msg: 'login failed' })
            }
        }
        else {
            res.status(401).json({ msg: 'login failed' })
        }
    } catch (err) {
        res.status(500).json({ "error": err })
    }
}

module.exports = {LoginUser}