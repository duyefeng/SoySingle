var express = require('express');
var path = require('path');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var mysql = require('mysql');  
var async = require('async'); // -> 异步对象
var URL = require('url');
var cookieParser = require('cookie-parser');
var server = require('http').createServer(app);
var multiparty = require('multiparty'); // -> 处理上传文件(多数据)模块
var io = require('socket.io').listen(server); // -> ws对象
var schedule = require("node-schedule"); // -> 定时器对象
var userLogin = require('./controller/user/LOGIN');
var userCenter = require('./controller/user/CENTER');
var Article = require('./controller/articles/ARTICLE');
var Video = require('./controller/videos/VIDEO');
var UTIL = require('./UTIL');

app.set('view engine', 'jade'); // 设置模板引擎
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('views', __dirname+'/views'); // 设置模板相对路径(相对当前目录)
app.use(express.static(__dirname + '/public')); // 设置静态文件(相对当前目录)
app.use(cookieParser());

/*** 通用方法 ***/
Date.prototype.Format = function(format) { //author: meizz
    var o = {
        "Y+": this.getFullYear(), // 年
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if(/(Y+)/.test(format)) {  
      format = format.replace(RegExp.$1, this.getFullYear());  
    }  
      
    for(var k in o) {  
      if(new RegExp("("+ k +")").test(format)) {  
      format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));  
      }  
    } 
    return format;
}


app.get('/', function (req, res) {
    res.setHeader('Content-Type','text/html;charset=UTF-8');
    //创建连接  
    var data = {
      name : req.cookies.username,
      avatar_src : req.cookies.avatar,
      hotLists: {
        'articleList' : [],  // 文章列表
        'videoList' : [] // 视频列表
      }
    };
    var connection = mysql.createConnection({    
      host     : '127.0.0.1',      
      user     : 'root',             
      password : 'root',      
      port: '3306',                  
      database: 'canvas',
    });
    connection.connect();
    // sql query 
    var articleSelectSql =  'SELECT * FROM node_articles_link';
    var videoSelectSql = 'SELECT * FROM node_videos_link';

    // article list query
    var articleTask = function(callback) {
      connection.query(articleSelectSql,function (err, result) {
        if(err){
          console.log('[ARTICLE QUERY ERROR] - ',err.message);
          return;
        }   
        console.log('-------ARTICLE----------');    
        // console.log('ARTICLES:',result);       
        console.log('#######################');
        UTIL.dateFom(result,'created_at','YY-MM-dd hh:mm');
        for (var item in result) {
          delete result[item]['content'];
        }
        data.hotLists.articleList = result;
        callback(null,"articleTask"); 
      });
    }
    // video list query
    var videoTask = function(callback) {
      connection.query(videoSelectSql,function (err, result) {
        if(err){
          console.log('[VIDEO QUERY ERROR] - ',err.message);
          return;
        }  

        console.log('-------VIDEO----------');    
        // console.log('ARTICLES:',result);       
        console.log('&&&&&&&&&&&&&&&&&&&&&&&');
        UTIL.dateFom(result,'created_at','YY-MM-dd hh:mm');
        data.hotLists.videoList = result; 
        connection.end(); 
        res.render('index.jade',data);
      });
      callback(null,videoTask);
    } 
    
    async.series([articleTask,videoTask],function(err,result){    
      // console.log("series");  
      if (err) {  
          console.log(err);  
      }    
      console.log(result);  
    });
});

app.get('/login', function (req, res) {
    data = {
      login : true
    }
    res.render('login.jade',data);
});

app.get('/register', function (req,res) {
    res.render('register.jade');
});

//  注册接口
app.post('/register_post', urlencodedParser, function (req, res) {
    userLogin.register(req, res) ;
});
//  登录接口
app.post('/login_post', urlencodedParser, function (req, res) {
    userLogin.login(req, res) ;
})
//  注销登录
app.get('/logout', function (req, res) {
  userLogin.logout(req, res) ;
})
// 提交评论
app.post('/commit',  urlencodedParser, function (req,res) {
  Article.commit(req, res) ;
})
//  用户个人中心
app.get('/user_center/:pannel', function (req, res) {
  userCenter.init(req,res);
})
// 个人中心/模板/更换模板接口
app.post('/user_center/temp/select', urlencodedParser, function(req, res) {
  userCenter.tempSelect(req,res);
})


//  文章区
app.get('/articles/:articleid', function (req, res) {
  Article.init(req,res);
})

// ws => 弹幕系统
var roomInfo = {};
//当前在线人数
io.sockets.on("connection", function(socket){
    var url = socket.request.headers.referer;
    var splited = url.split('/');
    var roomID = "video"+splited[splited.length - 1]; 
    var user = "";
    console.log(roomID);
    //从客户端获得命令
    //监听新用户加入
    socket.on('userLogin', function(data){
      if (data.username==='') {
        user = '未登录用户';
      } else {
        user = data.username;
      }
      if (!roomInfo[roomID]) {
        roomInfo[roomID] = [];
      }
      roomInfo[roomID].push(user);
      socket.join(roomID);    // 加入房间
      // 通知房间内人员
      io.to(roomID).emit('sys', {
        'user' : user,
        'roomList' : roomInfo[roomID],
        'roomNum' :  roomInfo[roomID].length,
        'method' : '开始观看'
      });  
      console.log(user + '加入了' + roomID);
    })
    socket.on('disconnect', function(){
      var index = roomInfo[roomID].indexOf(user);
      if (index !== -1) {
        roomInfo[roomID].splice(index, 1);
      }
      socket.leave(roomID);    // 退出房间
      io.to(roomID).emit('sys', {
        'user' : user,
        'roomList' : roomInfo[roomID],
        'roomNum' :  roomInfo[roomID].length,
        'method' : '结束观看'
      });
      console.log(user + '退出了' + roomID);
    });
    socket.on('DmkSend', function(data, limitH, name, vid){      
      // nowTime => 弹幕生成时间
      var nowTime = UTIL.nowDate();
      // TOP => 弹幕生成位置
      const TOP =  Math.floor(Math.random()*limitH+20);
      data.position = TOP;
      Video.insert(data, name, vid, nowTime);
      var LocalTime = new Date(nowTime*1000).Format('YY-MM-dd hh:mm');
      io.to(roomID).emit('DmkReturn', data, LocalTime);
      console.log('返回弹幕成功!');  
    });
});
//  视频区
app.get('/videos/:videoid', function (req, res) {
  Video.init(req,res);
})
app.post('/danmaku/init', urlencodedParser, function (req,res) {
  Video.sendDamaku(req,res);
})
//每天00:00 定时刷新弹幕数和访问数
!function(){
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(1, 6)];
    rule.hour = 23;
    rule.minute = 59;
    var updateVideoInfo = schedule.scheduleJob(rule, function(){
        var nowTime = UTIL.nowDate();
        console.log(new Date(nowTime*1000).Format('YY-MM-dd hh:mm')+', 弹幕更新成功！');
        Video.update();
    });
}();
// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('*', function(req, res) {   
  res.render('error/404.jade',{
    message : '报告！似乎没有发现该页面',
    code : '404'
  });
})
server.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})