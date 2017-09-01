const express = require('express');
var app = express();
const router = express.Router();

const imp =  require('./apis/import');
const book =  require('./apis/book.api');
const user =  require('./apis/user.api');
const provider =  require('./apis/provider.api');
const tag =  require('./apis/tag.api');

router.use('/import', imp);
router.use('/book', book);
router.use('/user', user);
router.use('/provider', provider);
router.use('/tag', tag);

module.exports = router;