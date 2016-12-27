var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');  
var async = require('async');
var URL = require('url');
var cookieParser = require('cookie-parser');
var UTIL = require('./../../UTIL')


app.set('view engine', 'jade'); // 设置模板引擎
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('views', __dirname+'/views'); // 设置模板相对路径(相对当前目录)
app.use(express.static(__dirname + '/views/public')); // 设置静态文件(相对当前目录)
app.use(cookieParser());


// 文章列表初始化
exports.listsInit = function() {
  var connection = mysql.createConnection({    
    host     : '127.0.0.1',      
    user     : 'root',             
    password : 'root',      
    port: '3306',                  
    database: 'canvas',
  });
}

// 文章页渲染
exports.init = function (req, res) {
    var connection = mysql.createConnection({    
        host     : '127.0.0.1',      
        user     : 'root',             
        password : 'root',      
        port: '3306',                  
        database: 'canvas',
    });
    var aid = req.params.articleid;
    var artSelectSql = 'SELECT * FROM node_articles_link WHERE aid = ?';
    var artSelectCommentSql = 'SELECT * FROM node_articles_comment WHERE aid = ?';
    var data = {};
    var task1 = function(callback) {
            connection.query(artSelectSql,aid,function (err, result) {
            if(err){
              console.log('[Select ERROR] - ',err.message);
              return;
            }    
            if (result.length==0) {
                return res.render('error/404.jade',{
                    message : '似乎未找到该文章呢~',
                    code : '404'
                });
            }
            // console.log('-------Select----------');    
            // console.log('Select ID:',result);  
            UTIL.dateFom(result,'created_at','YY-MM-dd hh:mm');
            data = {
                aid : aid,
                name : req.cookies.username,
                avatar_src : req.cookies.avatar,
                author: result[0].author,
                time: result[0].created_at,
                title: result[0].title,
                type: result[0].type,
                articleBody: result[0].content
            } 
            callback(null,"task1"); 
        });
    };
    var task2 = function(callback) {
        connection.query(artSelectCommentSql,aid,function (err, result) {
            if(err){
              console.log('[Select ERROR] - ',err.message);
              return;
            }    

            // console.log('-------Select----------');    
            // console.log('Select ID:',result);      
            UTIL.dateFom(result,'created_at','YY-MM-dd hh:mm:ss');
            data.comments = result;
            res.render('articles.jade',data); 
            connection.end();
        });
        callback(null,"task2"); 
    };

    async.series([task1,task2],function(err,result){  
  
    console.log("series");  
  
    if (err) {  
        console.log(err);  
    }  
  
      console.log(result);  
    });
}

// 评论页面
exports.commit = function(req,res) {
    res.setHeader('Content-Type','text/html;charset=UTF-8');
    var nowTime = UTIL.nowDate();
    var connection = mysql.createConnection({    
        host     : '127.0.0.1',      
        user     : 'root',             
        password : 'root',      
        port: '3306',                  
        database: 'canvas',
    });
    var artInsertCommentSql = 'INSERT INTO node_articles_comment(cid,name,content,aid,created_at) VALUES(000000,?,?,?,?)';
    var commentAddSql_Params = [req.body.name,req.body.text,req.body.aid,nowTime];
    connection.query(artInsertCommentSql,commentAddSql_Params,function (err, result) {
        if(err){
          console.log('[Select ERROR] - ',err.message);
          return;
        }    
  
        console.log('-------Select----------');    
        console.log('Select ID:',result);      
        response = {
          code: 0,
          message: '评论成功',
          data: {
            userid: '12345',
            nickname: req.body.nickname
          }
        };
        res.end(JSON.stringify(response));
        connection.end();
    });
}