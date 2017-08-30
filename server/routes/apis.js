const express = require('express');
var app = express();
const router = express.Router();

const imp =  require('./apis/import');
router.use('/import', imp);
const book =  require('./apis/book.api');
router.use('/book', book);

module.exports = router;