const express = require('express');
const route = express.Router();

const { tableDatas, columnDatas, getAdminDetails} = require ('../controllers/Taskcontroller')
const { checkUser, sendOtp, createUser} = require ('../controllers/CreateUser')
const {LoginUser} = require('../controllers/LoginUser')

route.post('/login' , LoginUser);
route.get('/tabledatas' , tableDatas);
route.get('/columndatas' , columnDatas);
route.post('/getadmin' , getAdminDetails);
route.post('/checkuser' , checkUser);
route.post('/otp' , sendOtp);
route.post('/create' , createUser);

module.exports = route;