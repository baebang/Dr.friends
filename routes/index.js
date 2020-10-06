var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('main_screen', { title: 'main' });
});

router.get('/dignosis', function(req, res) {
  res.render('dignosis', { title: 'dignosis' });
});

router.get('/dignosis_headache.html.com', function(req, res) {
  res.render('dignosis_headache', { title: 'headache' });
});




router.get('/search', function(req, res) {
  res.render('search', { title: 'search' });
});

router.get('/introduction', function(req, res) {
  res.render('introduction', { title: 'introduction' });
});




module.exports = router;
