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
        host            : 'sh-cynosdbmysql-grp-0zvpp24a.sql.tencentcdb.com',
        user            : 'root',
        password        : 'wscz1993...',
        database        : 'bloc_center',
        port:'22669',
        multipleStatements: true,
        connectionLimit: 100,
        connectTimeout: 60 * 60 * 1000,
        acquireTimeout: 60 * 60 * 1000,
    });
    // return mysql.createPool({
    //     host            : '47.105.42.195',
    //     user            : 'root',
    //     password        : '123456',
    //     database        : 'bloc_center',
    //     multipleStatements: true,
    //     connectionLimit: 100,
    //     connectTimeout: 60 * 60 * 1000,
    //     acquireTimeout: 60 * 60 * 1000,
    // });
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

//返回未登录状态信息
exports.notLoginData = function(){
    return {
        code:"10001",
        message:"不好意思，您没有登录，请先返回首页登录！",
        data:{}
    }
}

//返回服务器出错问题
exports.serverErr = function(errdata,errMessage){
    return {
        code:"999",
        message:errMessage||"服务端出错，请及时联系管理员",
        data:errdata
    }
}

exports.articlePath = "./server/article";


//im的appKey和AppSecret
exports.ImSecrateData = {
    AppKey:"fd0a8cee8e5f33678eb327a7d592cfe7",
    AppSecret:"b6d70bdba868"
}


exports.emailConfig = {
    host : 'smtp.163.com',
    port: 465,
    secure: true,
    auth : {
        user : '18815288453@163.com', //发送邮件的邮箱
        pass : 'Wscz1993' //第三方授权密码，POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务
    },
}

