var mysql = require('mysql');  

//创建连接  
var connection = mysql.createConnection({    
  host     : '127.0.0.1',      
  user     : 'root',             
  password : 'root',      
  port: '3306',                  
  database: 'canvas',
});

connection.connect();

var  userSelectNameSql = 'SELECT * FROM node_user WHERE name = "admin"';
//查 query
connection.query(userSelectNameSql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }       
 
       console.log('---------------SELECT----------------');
       console.log(result.length==0);       
       console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$'); 
});
 
connection.end();

