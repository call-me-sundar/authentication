// get the client
const mysql = require('mysql2/promise');
require('dotenv').config();

// create the connection to database
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DB,
  password: process.env.PASS
  // host: 'localhost',
  // user: 'root',
  // database: 'dashboard'
});

pool.getConnection()
  .then((connection) => {
    console.log('db connection successful');
    
    // Do your database operations here
    
    // Don't forget to release the connection when you are done with it
    connection.release();
  })
  .catch((err) => {
    console.log('db connection error');
    console.error(err);
  });

module.exports = pool;
