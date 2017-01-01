var fs = require('fs');
var colors = require('colors');  
var mysql = require('mysql'); 


// 数据库构造函数
var CreateDatabase = function(origin) {
    this.origin = origin;
    this.copy = {};
};
CreateDatabase.prototype.print = function() {
    console.log(this.green);
}
CreateDatabase.prototype.open = function() {
    var _this = this;
    _this.copy = mysql.createConnection(_this.origin);
    return mysql.createConnection(_this.origin);
}
CreateDatabase.prototype.close = function() {
     var _this = this;
    _this.copy.end();
}
CreateDatabase.prototype.connect = function() {
    var _this = this;
    _this.copy.connect();
}
CreateDatabase.prototype.select = function(table,data,callback) {
    var _this = this;
    var values = [];
    var params_str = '';
    for (var item in data) {
        params_str = item;
        values.push(data[item]);
    }
    var selectSql = 'SELECT * FROM ' +table+ ' WHERE '+params_str+' = ?';
    _this.copy.query(selectSql,values,callback);
}
CreateDatabase.prototype.selectAll = function(table,callback) {
    var _this = this;
    var selectAllSql = 'SELECT * FROM '+table;
    _this.copy.query(selectAllSql,callback);
}
CreateDatabase.prototype.replace = function(table,data,callback) {
    var _this = this;
    var params = [];
    var values = [];
    var params_str = '';
    for (var item in data) {
        params.push(item);
        values.push(data[item]);
    }
    params_str = params.join(',');
    var replaceSql = 'REPLACE INTO ' +table+ '('+params_str+') '+'VALUES(?,?,?)';
    _this.copy.query(replaceSql,values,callback);
}

var database = {
    author : 'dyff',
    array : [],
    version : '1.0.0',
    init : function (src,success) {
        var stream = fs.createReadStream(src);
        var data = "";
        var json = "";
        stream.on('data',function(chrunk){
            data += chrunk;
        });
        stream.on('end',function(){
            databaseOutput = JSON.parse(data);
            // console.log(databaseOutput);
            for (var single in databaseOutput) {
                var o = new CreateDatabase(databaseOutput[single]);
                database.array.push(o);
            }
            if (success) {success(database.array);}
            return database;
        });
        function muli() {

        }
    },
    log : function (arg) {
        if (arguments.length==0) {
            console.log(this);
            return;
        } else {
            if ( !database.hasOwnProperty(arg) ) {
                var errorInfo = 'error: can not find "'+arg+'", please check it again!';
                console.log(errorInfo.red);
            } else {
                if (!database[arg]) {
                    console.log('warn: please create a database object!'.yellow);
                } else {
                    console.log(database[arg]);
                }
            }
        }
    },
}

module.exports = exports = database;