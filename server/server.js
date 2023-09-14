const express = require('express')
const app = express()
require('dotenv').config();
const taskroutes = require('../backend/Routes/TaskRoutes')
var cors = require('cors')

app.use(cors());

app.get('/', function (req, res) {
  res.send('starting backend')
})

app.use(express.json());
app.use('/', taskroutes);

app.use((req, res, next) => {
    console.log(req.method , req.path);
    next();
})


app.listen(process.env.PORT, ()=>{
    console.log('listening on the port', process.env.PORT);
});