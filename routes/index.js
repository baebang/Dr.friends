var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main_screen', { title: '라라라' });
});




module.exports = router;
