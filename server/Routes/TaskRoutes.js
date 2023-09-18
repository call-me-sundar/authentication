const express = require('express');
const route = express.Router();

const { getData , tableDatas, columnDatas, getAdminDetails} = require ('../controllers/Taskcontroller')
route.post('/login' , getData);
route.get('/tabledatas' , tableDatas);
route.get('/columndatas' , columnDatas);
route.post('/getadmin' , getAdminDetails);

module.exports = route;