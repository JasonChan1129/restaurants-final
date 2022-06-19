const express = require('express');
const router = express.Router();

const home = require('./modules/home');
const restaurants = require('./modules/restaurants');
const apiRequest = require('./modules/apiRequest');
const users = require('./modules/users');

router.use('/restaurants', restaurants);
router.use('/users', users);
router.use('/google', apiRequest);
router.use('/', home);

module.exports = router;
