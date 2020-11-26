var mysql = require('mysql');
var db_info = {
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'b5172d3e03b038',
    port: '3306',
    password : '5ac1158b18069b4 ',
    database : 'heroku_214a7006414301d'
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}

// module.exports = {
//     host     : 'localhost',
//     user     : 'root',
//     password : '915dbfl',
//     database : 'symptom'
//   };