const express = require('express');

const employmentController = require('../controllers/employmentIndistry');

const router = express.Router();

const PATH = '/industries';

router.get(PATH, employmentController.industries);

module.exports = router;

