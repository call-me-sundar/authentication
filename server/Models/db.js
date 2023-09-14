// get the client
const mysql = require('mysql2/promise');

// create the connection to database
const pool = mysql.createPool({
  host: 'srv787.hstgr.io',
  user: 'u842521168_new',
  database: 'u842521168_new',
  password:"Admin@123"
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
