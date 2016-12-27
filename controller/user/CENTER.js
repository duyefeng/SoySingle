var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');  
var async = require('async');
var URL = require('url');
var cookieParser = require('cookie-parser');


app.set('view engine', 'jade'); // 设置模板引擎
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('views', __dirname+'/views'); // 设置模板相对路径(相对当前目录)
app.use(express.static(__dirname + '/views/public')); // 设置静态文件(相对当前目录)
app.use(cookieParser());


// 渲染用户中心页面
exports.init = function (req, res) {
    data = {
      name : req.cookies.username,
      avatar_src : req.cookies.avatar,
      pannel: req.params.pannel,
      temeplate : req.cookies.temeplate
    }
    res.render('userCenter.jade',data);
}

exports.tempSelect = function (req, res) {
    res.setHeader('Content-Type','text/html;charset=UTF-8');
    response = {
        code: 0,
        message: '更换模板成功',
        data: {
          temp: req.body.temp,
        }
    };
    var date=new Date();
    var expireDays=10;
    date.setTime(date.getTime()+expireDays*24*3600*1000);
    res.cookie('temeplate', response.data.temp, { expire : date.toGMTString(), httpOnly: true });
    res.end(JSON.stringify(response));
}
