const express = require('express');
var app = express();
const router = express.Router();

const imp =  require('./apis/import');
const book =  require('./apis/book.api');
const user =  require('./apis/user.api');

router.use('/import', imp);
router.use('/book', book);
router.use('/user', user);

module.exports = router;