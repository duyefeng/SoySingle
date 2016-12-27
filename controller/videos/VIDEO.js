var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');  
var async = require('async');
var URL = require('url');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var cookieParser = require('cookie-parser');
var UTIL = require('./../../UTIL')


app.set('view engine', 'jade'); // 设置模板引擎
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('views', __dirname+'/views'); // 设置模板相对路径(相对当前目录)
app.use(express.static(__dirname + '/views/public')); // 设置静态文件(相对当前目录)
app.use(cookieParser());

// 视频页渲染
exports.init = function (req, res) {
    var connection = mysql.createConnection({    
        host     : '127.0.0.1',      
        user     : 'root',             
        password : 'root',      
        port: '3306',                  
        database: 'canvas',
    });
    var vid = req.params.videoid;
    var vdSelectSql = 'SELECT * FROM node_videos_link WHERE vid = ?';
    var vdSelectDanMaKuSql = 'SELECT * FROM node_danmaku WHERE vid = ?';
    var vdSelectCommentSql = 'SELECT * FROM node_articles_comment WHERE vid = ?';
    var data = {};
    var task1 = function(callback) {
        connection.query(vdSelectSql,vid,function (err, result) {
            if(err){
              console.log('[Select ERROR] - ',err.message);
              return;
            }    
            if (result.length==0) {
                return res.render('error/404.jade',{
                    message : '似乎未找到该视频呢~',
                    code : '404'
                });
            }
            UTIL.dateFom(result,'created_at','YY-MM-dd hh:mm');
            data = {
                vid : vid,
                name : req.cookies.username,
                avatar_src : req.cookies.avatar,
                time: result[0].created_at,
                title: result[0].title,
                src: result[0].video_url,
                pv: result[0].pv,
                dmk_num: result[0].dmk_num,
                pop_num: result[0].pop_num
            }    
            callback(null,"task1");     
        });       
    };
    var task2 = function(callback) {
        connection.query(vdSelectDanMaKuSql,vid,function (err, result) {
            if(err){
              console.log('[Select ERROR] - ',err.message);
              return;
            }    

            UTIL.dateFom(result,'created_at','YY-MM-dd hh:mm');
            if (result.length==0) {
                result = []
            }
            data.danmaku = result;

            res.render('videos.jade',data); 
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
// 弹幕渲染
exports.sendDamaku = function (req, res) {
    res.setHeader('Content-Type','text/html;charset=UTF-8');
    var response = {
        code: 0,
        message: '注册成功',
        data: {
            danmaku: []
        }
    }; 
    var vid = req.body.id;
    var connection = mysql.createConnection({    
        host     : '127.0.0.1',      
        user     : 'root',             
        password : 'root',      
        port: '3306',                  
        database: 'canvas',
    });  
    var vdSelectDanMaKuSql = 'SELECT * FROM node_danmaku WHERE vid = ?';
    connection.query(vdSelectDanMaKuSql,vid,function (err, result) {
        if(err){
            console.log('[Select ERROR] - ',err.message);
            return;
        }    

        console.log('select:'+result);
        UTIL.dateFom(result,'created_at','YY-MM-dd hh:mm');
        if (result.length==0) {
            result = [{
                vid : vid,
                time : null,
                content : '',
                created_at : null
            }]
        }
        response.data.danmaku = result;
        res.end(JSON.stringify(response));
        connection.end();     
    });  
}

// 弹幕存储数据库
exports.insert = function(dmkObj,name,vid,nowTime) {
    var connection = mysql.createConnection({    
        host     : '127.0.0.1',      
        user     : 'root',             
        password : 'root',      
        port: '3306',                  
        database: 'canvas',
    }); 
    var danmakuInsertSql = 'INSERT INTO node_danmaku(danmakuid,created_at,vid,time,content,size,type,color,position,name) VALUES(000000,?,?,?,?,?,?,?,?,?)';
    var danmakuInsertSql_Params = [nowTime,vid,dmkObj['time'],dmkObj['content'],dmkObj['size'],dmkObj['type'],dmkObj['color'],dmkObj['position'],name];
    connection.query(danmakuInsertSql,danmakuInsertSql_Params,function (err, result) {
        if(err){
          console.log('[Insert ERROR] - ',err.message);
          return;
        }    
  
        console.log('-------弹幕插入成功！----------');    
        console.log('Insert ID:',result);      
        connection.end();
    });
}

// 弹幕总数更新
exports.update = function() {
    var connection = mysql.createConnection({    
        host     : '127.0.0.1',      
        user     : 'root',             
        password : 'root',      
        port: '3306',                  
        database: 'canvas',
    });
    var DMK = [];
    var dmknumsSelectSql = 'SELECT vid,COUNT(*) FROM node_danmaku GROUP BY vid';
    var dmknumsUpdatesql = 'UPDATE node_videos_link SET dmk_num = ? WHERE vid = ?';
    var task1 = function(callback) {
        connection.query(dmknumsSelectSql,function (err, result) {
            if(err){
                console.log('[DMKNUMS QUERY ERROR] - ',err.message);
                return;
            }   
            console.log('-------DanMaKu----------');         
            console.log('#######################');
            DMK = result;      
            callback(null,"task1");       
        });
    };    
    var task2 = function(callback) {
        for (var i = 0; i<DMK.length ; i++) {
            connection.query(dmknumsUpdatesql,[DMK[i]["COUNT(*)"],DMK[i].vid],function (err, result) {
                if(err){
                    console.log('[DMKNUMS QUERY ERROR] - ',err.message);
                    return;
                }   
                console.log('-------DanMaKu UPDATE---------');         
                console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~');
            });       
        }
        connection.end();
    };

    async.series([task1,task2],function(err,result){  
  
        console.log("series");  
  
        if (err) {  
            console.log(err);  
        }  
  
        console.log(result);  
    });
}