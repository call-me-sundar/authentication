const express = require('express');
const route = express.Router();

const { getData , tableDatas, columnDatas, getAdminDetails} = require ('../controllers/Taskcontroller')
const { checkUser, sendOtp} = require ('../controllers/CreateUser')
route.post('/login' , getData);
route.get('/tabledatas' , tableDatas);
route.get('/columndatas' , columnDatas);
route.post('/getadmin' , getAdminDetails);
route.post('/checkuser' , checkUser);
route.post('/otp' , sendOtp);

module.exports = route;