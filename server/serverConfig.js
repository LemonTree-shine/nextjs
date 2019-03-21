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
        database        : 'bloc_center'
    });
}

//github登录id,密匙数据
const githubData = {
    client_id:"fff6005ce888eb378dbe",
    client_secret:"69ed89f3689868f2acede3f62ea391c99317dd7d"
}
exports.githubData = githubData;