const { response } = require('express');
var express = require('express');
var router = express.Router();
// var JSAlert = require('js-alert');

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

var prestageqId;

router.get('/dignosis/:dignosisId/:stageId/:preqid', function(req, res){
  var dignosisid = req.params.dignosisId;
  var stageid = req.params.stageId;
  var preqid;
  var pre = req.query.pre;
  console.log(prestageqId);
  // console.log(dignosisid);
  // console.log(stageid);
  if (pre == undefined) {
    preqid = req.params.preqId;
    var sql = 'SELECT * from question WHERE stage= 1';
    conn.query(sql, function(err, rows, fields){
      console.log(rows);
      prestageqId = -1;
      console.log(prestageqId);
      if(err) console.log('query is not excuted. insert fail...\n' + err);
      else res.render('./dignosis/' + dignosisid , {contents : rows, part : dignosisid, stage : stageid});
    });
  }else{
    preqid = pre;
    console.log("preqid:" + preqid);
    console.log("prestageqid:" + prestageqId);
    var sql = 'SELECT * from question WHERE pre_q =' + preqid + ' and stage = ' + stageid + ' and prestage_q= ' + prestageqId;
    prestageqId= preqid;
    conn.query(sql, function(err, rows, fields){
      console.log(rows);
      if(err) console.log('query is not excuted. insert fail...\n' + err);
      else res.render('./dignosis/' + dignosisid , {contents : rows, part : dignosisid, stage : stageid});   
    });
  }
});


router.get('/search', function(req, res) {
  res.render('search', { title: 'search' });
});

router.get('/introduction', function(req, res) {
  res.render('introduction', { title: 'introduction' });
});


module.exports = router;