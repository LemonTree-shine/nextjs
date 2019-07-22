var express = require("express");
var config = require("../serverConfig");
const querystring = require('querystring');
const url = require('url');
var request = require('request');
const cookieParser = require("cookie-parser"); //读取cookie
const session = require('express-session');
var fs = require('fs');

var manage = express.Router();

//链接数据库
let sqlPoor = config.connecMysql();

//处理post传过来的数据
//config.setPostConfig(manage);

//处理cookie
//manage.use(cookieParser());

//处理session
// manage.use(session({
//     name:"Login_session",
//     secret:"chenze",
//     maxAge: 24*60 * 1000 * 30,
//     signed:true,
// }));

manage.use("/getMenu",function(req,res){
    var params = JSON.parse(req.body);
    console.log(req.session.loginName);
    if(params.admin=="1"){
        var Sql = `SELECT * FROM menu`;
    }else{
        var Sql = `SELECT * FROM menu WHERE control='all'`;
    }
    sqlPoor.query(Sql,(err,data)=>{
        if(err) console.log(err);
        if(data.length){
            res.send(JSON.stringify(config.okData("0","成功",data)));
        }else{
            res.send(JSON.stringify(config.notLoginData())); 
        }
        
    });
});


module.exports = manage;