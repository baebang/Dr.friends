const { response } = require('express');
var express = require('express');
var router = express.Router();


// mysql 모듈 불러오기
// const mysql = require('mysql');
// const dbconfig = require('./config/database.js');
// const connection = mysql.createConnection(dbconfig);

var db_config = require('./config/database.js');
var conn = db_config.init();

db_config.connect(conn);


/* GET home page. */
router.get('/', function(req, res) {
  res.render('main_screen', { title: 'main' });
});

router.get('/dignosis', function(req, res) {
  res.render('dignosis', { title: 'dignosis' });
});


router.get('/dignosis/:dignosisId', function(req, res){
  var sql = 'SELECT * from symptom WHERE part="머리"';
  conn.query(sql, function(err, rows, fields){
    console.log(rows);
    if(err) console.log('query is not excuted. insert fail...\n' + err);
    else res.render('./dignosis/' + req.params.dignosisId, {contents : rows[0]});  
  });
});

router.get('/search', function(req, res) {
  res.render('search', { title: 'search' });
});

router.get('/introduction', function(req, res) {
  res.render('introduction', { title: 'introduction' });
});




module.exports = router;