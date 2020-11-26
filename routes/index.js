const { response } = require('express');
var express = require('express');
var router = express.Router();
// var JSAlert = require('js-alert');

var db_config = require('./config/database.js');
var board_config = require('./config/dashboard.js');
var comment = require('./config/comment.js');

var conn = db_config.init();
var conn2 = board_config.setdashboard();
var conn3 = comment.setcomment();

db_config.connect(conn);
board_config.connect2(conn2);
comment.connect3(conn3);



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
  console.log(dignosisid);
  if (pre == undefined) {
    if(stageid !=1){
      stageid -= 1;
      preqid = req.params.preqId;
      var sql = 'SELECT * from question WHERE part =? and stage=' + stageid;
      conn.query(sql, dignosisid, function(err, rows, fields){
        console.log(rows);
        prestageqId = -1;
        console.log(prestageqId);
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else res.render('./dignosis/' + dignosisid , {contents : rows, part : dignosisid, stage : stageid});
      });
    }else{
      preqid = req.params.preqId;
      var sql = 'SELECT * from question WHERE part =? and stage= 1';
      conn.query(sql, dignosisid, function(err, rows, fields){
        console.log(rows);
        prestageqId = -1;
        console.log(prestageqId);
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else res.render('./dignosis/' + dignosisid , {contents : rows, part : dignosisid, stage : stageid});
      });
    }
  }else{
    preqid = pre;
    console.log("preqid:" + preqid);
    console.log("prestageqid:" + prestageqId);
    var sql = 'SELECT * from question WHERE part =? and pre_q =' + preqid + ' and stage =' + stageid + ' and prestage_q=' + prestageqId;
    prestageqId= preqid;
    conn.query(sql, dignosisid, function(err, rows, fields){
      console.log(rows);
      if(err) console.log('query is not excuted. insert fail...\n' + err);
      else res.render('./dignosis/' + dignosisid , {contents : rows, part : dignosisid, stage : stageid});   
    });
  }
});



router.get('/eyeball/:stageId/:preqid', function(req, res){
  var stageid = req.params.stageId;
  var preqid;
  var pre = req.query.pre;
  if (pre == undefined) {
    if(stageid !=1){
      stageid -= 1;
      preqid = req.params.preqId;
      var sql = 'SELECT * from ques WHERE stage=' + stageid;
      conn.query(sql, function(err, rows, fields){
        console.log(rows);
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else res.render('./dignosis/eyeball' , {contents : rows, part : "eyeball", stage : stageid});
      });
    }else{
      preqid = req.params.preqId;
      var sql = 'SELECT * from ques WHERE stage= 1';
      conn.query(sql, function(err, rows, fields){
        console.log(rows);
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else res.render('./dignosis/eyeball' , {contents : rows, part : "eyeball", stage : stageid});
      });
    }
  }else{
    preqid = pre;
    console.log("preqid:" + preqid);
    console.log(stageid);
    var sql = 'SELECT * from ques WHERE pre_q =? and stage ='+stageid;
    conn.query(sql, preqid, function(err, rows, fields){
      console.log(rows);
      if(err) console.log('query is not excuted. insert fail...\n' + err);
      else res.render('./dignosis/eyeball', {contents : rows, part : "eyeball", stage : stageid});   
    });
  }
});

router.get('/menstyalpain/:stageId/:preqid', function(req, res){
  var stageid = req.params.stageId;
  var preqid;
  var pre = req.query.pre;
  if (pre == undefined) {
    if(stageid !=1){
      stageid -= 1;
      preqid = req.params.preqId;
      var sql = 'SELECT * from mens_q WHERE stage=' + stageid;
      conn.query(sql, function(err, rows, fields){
        console.log(rows);
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else res.render('./dignosis/menstyalpain' , {contents : rows, part : "eyeball", stage : stageid});
      });
    }else{
      preqid = req.params.preqId;
      var sql = 'SELECT * from mens_q WHERE stage= 1';
      conn.query(sql, function(err, rows, fields){
        console.log(rows);
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else res.render('./dignosis/menstyalpain' , {contents : rows, part : "eyeball", stage : stageid});
      });
    }
  }else{
    preqid = pre;
    console.log("preqid:" + preqid);
    console.log(stageid);
    var sql = 'SELECT * from mens_q WHERE pre_q =? and stage ='+stageid;
    conn.query(sql, preqid, function(err, rows, fields){
      console.log(rows);
      if(err) console.log('query is not excuted. insert fail...\n' + err);
      else res.render('./dignosis/menstyalpain', {contents : rows, part : "eyeball", stage : stageid});   
    });
  }
});

router.get('/dignosis/search_result', function(req, res) {
  var search = req.query.search;
  console.log(search);
  var sql = 'SELECT * from symptom WHERE symptom=?';
 conn.query(sql, search, function(err, rows, fields){
   console.log(rows);
   if(err) console.log('query is not excuted. insert fail...\n' + err);
   else res.render('search_result' , {result : rows});
 })
});

router.get('/dignosis/msearch_result', function(req, res) {
  var search = req.query.search;
  console.log(search);
  var sql = 'SELECT * from medicine WHERE name=?';
  
 conn.query(sql, search, function(err, rows, fields){
   console.log(rows);
   if(err) console.log('query is not excuted. insert fail...\n' + err);
   else res.render('msearch_result' , {result : rows});
 })

});



router.get('/search', function(req, res) {
  res.render('search', { title: 'search' });
});

router.get('/introduction', function(req, res) {
  res.render('introduction', { title: 'introduction' });
});

router.get('/nearby_hospitals', function(req, res) {
  res.render('nearby_hospitals', { title: 'nearby_hospitals' });
});


router.get('/msearch', function(req, res) {
  res.render('msearch', { title: 'msearch' });
});

router.get('/login_check', function(req, res) {
  res.render('login_check', { title: 'login_check' });
});

router.get('/board', function(req, res) {
  var sql = 'SELECT * FROM dashboard';
  conn2.query(sql, function(err, rows, fields){
    console.log(rows);
    if(err) console.log('query is not excuted. insert fail...\n' + err);
    else res.render('board' , {result : rows});
  })
});

router.get('/write', function(req, res) {
  res.render('write', { title: 'write' });
});

router.get('/write/process', function(req, res) {
  var title = req.query.title;
  var password = req.query.password;
  var content = req.query.content;
  var sql = 'INSERT INTO dashboard (title, password, content, created) VALUES (?, ?, ?, NOW())';
  console.log(title);
  conn2.query(sql, [title, password, content], function(err, rows){
    console.log(rows);
    if(err) console.log('query is not excuted. insert fail...\n' + err);
    else res.redirect('/board');
  })
});

router.get('/content/:boardid', function(req, res) {
  var title = req.params.boardid;
  var comment = req.params.boardid;
  var sql = 'SELECT * from dashboard WHERE title=?';

  conn2.query(sql, title, function(err, rows){
    console.log(title);
    console.log(rows);
    if(err) console.log('query is not excuted. insert fail...\n' + err);
    else res.render('content' , {result : rows});
  })
});

router.get('/modify', function(req, res) {
  res.render('modify', { title: 'modify' });
});

router.get('/content/comment', function(req, res) {
  var comment_content = req.query.comment_content;
  var dashboard_id = req.query.dashboard_id;
  var sql = 'INSERT INTO dashboard (comment_content, dashboard_id) VALUES (?, ?)';
  console.log(comment_content);
  conn3.query(sql, [comment_content, dashboard_id], function(err, rows){
    console.log(rows);
    if(err) console.log('query is not excuted. insert fail...\n' + err);
    else res.redirect('/board');
  })
});

module.exports = router;