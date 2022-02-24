const router = require('express').Router();
// const express = require('express');
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// connect your API routes here!
router.use('/weather', require('./weather'));
module.exports = router;
