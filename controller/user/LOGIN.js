var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');  
var async = require('async');
var URL = require('url');
var cookieParser = require('cookie-parser');
var fs = require("fs"); // -> 文件处理模块(node自带)
var multiparty = require('multiparty'); // -> 处理上传文件(多数据)模块
var images = require("images"); // -> 图片处理模块

app.set('view engine', 'jade'); // 设置模板引擎
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('views', __dirname+'/views'); // 设置模板相对路径(相对当前目录)
app.use(express.static(__dirname + '/views/public')); // 设置静态文件(相对当前目录)
app.use(cookieParser());


// 注册
exports.register = function (req, res) {
    var User = {};
    var localurl = Math.random().toString(36).substr(2);
    var userSelectNameSql,userSelectPhoneSql,userSelectMailSql,userAddSql = '';
    var userAddSql_Params = [];
    res.setHeader('Content-Type','text/html;charset=UTF-8');
    //创建连接  
    var Cookies = {};
    var connection = mysql.createConnection({    
      host     : '127.0.0.1',      
      user     : 'root',             
      password : 'root',      
      port: '3306',                  
      database: 'canvas',
    });
    connection.connect();
    var task1 = function(callback) {     
        var form = new multiparty.Form({uploadDir: './public/avatar/'});
        //上传完成后处理
        form.parse(req, function(err, fields, files) {
          var filesTmp = JSON.stringify(files,null,2);
          if(err){
            console.log('parse error: ' + err);
          } else {
            // fields 包含所有键值对 以数组的形式存储
            Object.keys(fields).forEach(function(name) {
              console.log('got field named ' + name);
              console.log(fields[name][0]);
              User[name] = fields[name][0];
            });
            var imageX = parseInt(User.position.split(',')[0]);
            var imageY = parseInt(User.position.split(',')[1]);
            // files 包含所有的文件 对应多个属性 其中只需要取出img类型 img为数组
            console.log('parse files: ' + filesTmp);
            var inputFile = files.image[0];
            var uploadedPath = inputFile.path; // 上传文件路径
            /****** 图片重新存储为所选区域 ******/
            var smallImg =images(uploadedPath).resize(400);
            images(smallImg, imageX, imageY, 160, 160)
            .save('public/avatar/'+localurl+'.jpg',{
                operation : 100     //保存图片到文件,图片质量为100
            });
            /****** images(img,x,y,width,height) ******/
            /****** 删除原图 ******/
            fs.unlink(uploadedPath, function(err) {  
              if (err) {  
                  console.log(err);  
                  return false;  
              }  
              console.log("success");  
            });  
            /***** unlink *****/
            User.pathname = '/avatar/'+localurl+'.jpg'; // 保留图像路径
          }
          userSelectNameSql = 'SELECT * FROM node_user WHERE nickname = ?';
          userSelectPhoneSql = 'SELECT * FROM node_user WHERE phone = ?';
          userSelectMailSql = 'SELECT * FROM node_user WHERE mail = ?';
          userAddSql = 'INSERT INTO node_user(id,nickname,password,phone,mail,avatar_src) VALUES(000000,?,?,?,?,?)'
          userAddSql_Params = [User.nickname,User.password,User.phone,User.mail,User.pathname];
          callback(null,"task1");
        });
    }
    var task5 = function(callback) {
      connection.query(userAddSql,userAddSql_Params,function (err, result) {
        if(err){
          console.log('[INSERT ERROR] - ',err.message);
          return;
        }    
  
        console.log('-------INSERT----------');    
        console.log('INSERT ID:',result);       
        console.log('#######################');
      
        response = {
          code: 0,
          message: '注册成功',
          data: {
            userid: '12345',
            nickname: User.nickname,
            avatar_src: User.pathname
          }
        };
        var date=new Date();
        var expireDays=10;
        //将date设置为10天以后的时间
        date.setTime(date.getTime()+expireDays*24*3600*1000);
        res.cookie('username', response.data.nickname, { expire : date.toGMTString(), httpOnly: true });
        res.cookie('avatar', response.data.avatar_src, { expire : date.toGMTString(), httpOnly: true });
        res.end(JSON.stringify(response));
  
        connection.end();
      });
      callback(null,"task5");
    }
    // 检测用户名是否存在
    var task2 = function(callback) {
      connection.query(userSelectNameSql,userAddSql_Params[0],function (err, result) {
           if(err){
             console.log('[DELETE ERROR] - ',err.message);
             return;
           }       
          console.log('---------------SELECT----------------');
          console.log(result);       
          console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$'); 
          if ( result.length > 0 ) {
            console.log('该用户名已被注册');
            fs.unlink('public/avatar/'+localurl+'.jpg');  
            response = {
              code: 301,
              message: '该用户名已注册'
            };
            res.end(JSON.stringify(response));
            return connection.end();
          } else {
            callback(null,"task2"); 
          }
      });
    }
    // 检测手机号是否存在
    var task3 = function(callback) {
      connection.query(userSelectPhoneSql,userAddSql_Params[2],function (err, result) {
          if(err){
             console.log('[SELECT ERROR] - ',err.message);
             return;
          }       
          console.log('---------------SELECT----------------');
          console.log(result);       
          console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$'); 
          if ( result.length > 0 ) {
            console.log('该手机号已被注册');
            fs.unlink('public/avatar/'+localurl+'.jpg');  
            response = {
              code: 301,
              message: '该手机号已注册'
            };
            res.end(JSON.stringify(response));
            return connection.end();
          } else {
            callback(null,"task3"); 
          }
      });
    }
    // 检测邮箱是否存在
    var task4 = function(callback) {
      connection.query(userSelectMailSql,userAddSql_Params[3],function (err, result) {
           if(err){
             console.log('[SELECT ERROR] - ',err.message);
             return;
           }       
          console.log('---------------SELECT----------------');
          console.log(result);       
          console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$'); 
          if ( result.length > 0 ) {
            console.log('该邮箱已被注册');
            fs.unlink('public/avatar/'+localurl+'.jpg');  
            response = {
              code: 301,
              message: '该邮箱已注册'
            };
            res.end(JSON.stringify(response));
            return connection.end();
          } else {
            callback(null,"task4"); 
          }
      });
    }

    async.series([task1,task2,task3,task4,task5],function(err,result){  
  
    console.log("series");  
  
    if (err) {  
        console.log(err);  
    }  
  
      console.log(result);  
    });
}

// 登录
exports.login = function (req,res) {
    res.setHeader('Content-Type','text/html;charset=UTF-8');
    console.log(req.body);
    //创建连接  
    var Cookies = {};
    var connection = mysql.createConnection({    
      host     : '127.0.0.1',      
      user     : 'root',             
      password : 'root',      
      port: '3306',                  
      database: 'canvas',
    });
    connection.connect();
    var  userSelectPassSql = 'SELECT * FROM node_user WHERE phone = ? or mail = ?';
    var  userSelectPwdSql = 'SELECT * FROM node_user WHERE password = ?';
    var  userAddSql_Params = [req.body.passport,req.body.password];
    connection.query(userSelectPassSql,[userAddSql_Params[0],userAddSql_Params[0]],function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }    
      console.log('-------SELECT----------');    
      console.log('SELECT ID:',result);       
      console.log('#######################');

      if (result.length == 0) {
        response = {
          code: 401,
          message: '账号不存在'
        };
      } else {
        if ( result[0].password != req.body.password ) {
          response = {
            code : 402,
            message : '密码错误'
          };
        } else {
          response = {
            code: 0,
            message: '登录成功',
            data:  {
              userid: result[0].id,
              avatar_src: result[0].avatar_src,
              nickname: result[0].nickname
            }
          };
          var date=new Date();
          var expireDays=10;
          //将date设置为10天以后的时间
          date.setTime(date.getTime()+expireDays*24*3600*1000);
          res.cookie('username', response.data.nickname, { expire : date.toGMTString(), httpOnly: true });
          res.cookie('avatar', response.data.avatar_src, { expire : date.toGMTString(), httpOnly: true });
        }
      }
      res.end(JSON.stringify(response));
      connection.end();
    });
}

// 退出
exports.logout = function (req,res) {
    var response = {
      code : 0 ,
      message : '注销成功'
    }
    res.setHeader('Content-Type','text/html;charset=UTF-8');
    console.log("/logtout 响应 用户注销账号");
    res.clearCookie('username', { path: '/' });
    res.end(JSON.stringify(response));
}

