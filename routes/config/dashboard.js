var mysql     = require('mysql');
// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 

var db = {
  host: 'us-cdbr-east-02.cleardb.com',
  user: 'b5172d3e03b038',
  port: '3306',
  password : '5ac1158b18069b4 ',
  database : 'heroku_214a7006414301d'
};


module.exports = {
  setdashboard: function () {
      return mysql.createConnection(db);
  },
  connect2: function(conn2) {
      conn2.connect(function(err) {
          if(err) console.error('메롱메롱 김재정만 쓸 수 있지롱' + err);
          else console.log('재정sql is connected successfully!');
      });
  }
}

