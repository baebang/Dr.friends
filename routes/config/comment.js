var mysql     = require('mysql');
// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 


var comment = {
  host: 'us-cdbr-east-02.cleardb.com',
  user: 'b5172d3e03b038',
  port: '3306',
  password : '5ac1158b18069b4 ',
  database : 'heroku_214a7006414301d'
};


module.exports = {
  setcomment: function () {
      return mysql.createConnection('mysql://b5172d3e03b038:5ac1158b18069b4@us-cdbr-east-02.cleardb.com/heroku_214a7006414301d?reconnect=true');
  },
  connect3: function(conn3) {
      conn3.connect(function(err) {
          if(err) console.error('답글메롱메롱 김재정만 쓸 수 있지롱' + err);
          else console.log('재정답글sql is connected successfully!');
      });

      conn3.on('error', function(err) {
        console.log(err.code)
     })
  }
}