var mysql     = require('mysql');
// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 


var comment = {
  host: 'localhost',
  user: 'root',
  port: '3306',
  password : '111111',
  database : 'comment'
};


module.exports = {
  setcomment: function () {
      return mysql.createConnection(comment);
  },
  connect3: function(conn3) {
      conn3.connect(function(err) {
          if(err) console.error('답글메롱메롱 김재정만 쓸 수 있지롱' + err);
          else console.log('재정답글sql is connected successfully!');
      });
  }
}