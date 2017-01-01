var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');  
var async = require('async');
var URL = require('url');
var cookieParser = require('cookie-parser');
var RakuDatabase = require('./../../database/raku-database.js');

var database = {};
exports.start = function(req,res) {
  RakuDatabase.init('database/database.config.json',function(result){
    database = result[0];
    init(req,res);
  });
}
app.set('view engine', 'jade'); // 设置模板引擎
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('views', __dirname+'/views'); // 设置模板相对路径(相对当前目录)
app.use(express.static(__dirname + '/views/public')); // 设置静态文件(相对当前目录)
app.use(cookieParser());


// 渲染用户中心页面
var init = function (req, res) {
    database.open();
    database.connect();
    data = {
      name : req.cookies.username,
      avatar_src : req.cookies.avatar,
      pannel: req.params.pannel,
      template : req.cookies.template
    }
    database.select('node_user_info',{'username':data.name},function(err,result){
      if ( result.length>0 ) {
        data.template = result[0].template
        data.theme = result[0].theme
      }
      res.render('userCenter.jade',data);
    });
}

exports.tempSelect = function (req, res) {
    res.setHeader('Content-Type','text/html;charset=UTF-8');
    var obj = {
      'username' : req.body.name,
      'template' : req.body.temp,
      'theme' : req.body.theme
    }
    database.replace('node_user_info',{ 
      'username' : obj.username,
      'template' : obj.template,
      'theme'    : obj.theme 
    },function(err,result){
        if(err){
          console.log('[REPLACE ERROR] - ',err.message);
          return;
        }    
        console.log('-------REPLACE----------');    
        console.log('REPLACE ID:',result);       
        console.log('#######################');    
        response = {
          code: 0,
          message: '更换模板成功',
          data: {
            temp: req.body.temp,
          }
        }
        res.end(JSON.stringify(response));
        database.close();
    });    
}
