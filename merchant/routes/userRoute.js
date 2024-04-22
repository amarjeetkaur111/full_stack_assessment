
const express = require('express');
const router = express.Router();
const { registration, login, getUsers } = require('../controllers/userController');

//routes for user getUsers , login & registration
router.get("/getUsers", getUsers);
router.post('/register', registration);
router.post('/login', login);

module.exports = router;