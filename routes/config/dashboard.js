var mysql     = require('mysql');
// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 

var db = {
  host: 'localhost',
  user: 'root',
  port: '3306',
  password : '111111',
  database : 'dashboard'
};



// router.get('/board', function(req, res) {
//     res.render('board', { title: 'board' });
  
//   });

module.exports = {
  setdashboard: function () {
      return mysql.createConnection(db);
  },
  connect2: function(conn2) {
      conn2.connect(function(err) {
          if(err) console.error('메롱메롱 김재정만 쓸 수 있지롱' + err);
          else console.log('mysql is connected successfully!');
      });
  }
}