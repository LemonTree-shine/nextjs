var bodyParser = require('body-parser');
var mysql = require('mysql');


//配置服务器post请求数据
exports.setPostConfig = function(app){
    /**
     * 处理application/x-www-form-urlencoded
    */
   app.use(bodyParser.urlencoded({ extended: false }))

    /**
     * 处理application/json
    */
   app.use(bodyParser.json())

    /**
     * 处理text/plain
    */
   app.use(bodyParser.text());
}

//服务器数据库配置
exports.connecMysql  = function(){
    return mysql.createPool({
        host            : '47.105.42.195',
        user            : 'root',
        password        : '123456',
        database        : 'bloc_center',
        connectionLimit: 100,
        connectTimeout: 60 * 60 * 1000,
        acquireTimeout: 60 * 60 * 1000,
    });
}

//github登录id,密匙数据
const githubData = {
    client_id:"fff6005ce888eb378dbe",
    client_secret:"69ed89f3689868f2acede3f62ea391c99317dd7d"
}
exports.githubData = githubData;


//返回正确的数据格式
exports.okData = function(code,message,data){
    return {
        code:code||"0",
        message:message||"ok",
        data
    }
}