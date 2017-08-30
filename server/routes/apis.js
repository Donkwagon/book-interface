const express = require('express');
var app = express();
const router = express.Router();

const imp =  require('./apis/import');
router.use('/import', imp);

module.exports = router;