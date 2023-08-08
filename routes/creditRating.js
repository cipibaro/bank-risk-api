const express = require('express');

const creditRatingController = require('../controllers/creditRating');

const router = express.Router();

const PATH = '/clients';

router.get(PATH + '/ratings', creditRatingController.clientRatings);

module.exports = router;

