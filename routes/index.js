const express = require('express');
const router = express.Router();

// routes
const home = require('./modules/home');
const restaurants = require('./modules/restaurants');
const apiRequest = require('./modules/apiRequest');
const users = require('./modules/users');

// auth middleware
const { authenticator } = require('../middleware/auth');

router.use('/restaurants', authenticator, restaurants);
router.use('/users', users);
router.use('/google', apiRequest);
router.use('/', authenticator, home);

module.exports = router;
