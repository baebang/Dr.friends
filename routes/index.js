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


router.get('/search', function(req, res) {
  res.render('search', { title: 'search' });
});

router.get('/introduction', function(req, res) {
  res.render('introduction', { title: 'introduction' });
});

router.get('/nearby_hospitals', function(req, res) {
  res.render('nearby_hospitals', { title: 'nearby_hospitals' });
});


module.exports = router;