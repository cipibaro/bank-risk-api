const express = require('express');

const employmentController = require('../controllers/profession');

const router = express.Router();

const PATH = '/professions';

router.get(PATH, employmentController.professions);

module.exports = router;

