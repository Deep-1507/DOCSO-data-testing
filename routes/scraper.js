const express = require('express');
const { scrapeData } = require('../controllers/scraperController');

const router = express.Router();

router.post('/', scrapeData);

module.exports = router;
