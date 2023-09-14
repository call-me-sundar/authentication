const db = require('../Models/db')

const getData = async (req, res) => {
    const {username, password} = req.body;
    try {
        const [result] = await db.query(`SELECT * FROM details WHERE username = ? AND userpassword = ?`,[username, password]);
        if(result.length === 1){
            res.status(200).json({msg:"login successful"})
        }
        else{
            res.status(401).json({msg:'login failed'})
        }
    } catch (err) {
        res.status(500).json("error", err)
    }
}
module.exports = { getData } 
