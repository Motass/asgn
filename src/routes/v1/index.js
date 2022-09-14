const express = require('express');
const contactRoute = require('./contact.route');

const router = express.Router();

router.use('/contacts', contactRoute);

module.exports = router;
