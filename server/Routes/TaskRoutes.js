const express = require('express');
const route = express.Router();

const { getData } = require ('../controllers/Taskcontroller')
route.post('/login' , getData);

module.exports = route;