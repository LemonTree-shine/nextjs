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

//判断是否登录
manage.use("/ifLogin",function(req,res){
    var loginName = req.session.loginName;
    if(!loginName){
        res.send(JSON.stringify(config.notLoginData())); 
    }else{
        res.send(JSON.stringify(config.okData("0","已登录",{
            loginName 
        })));
    }
});

//获取首页的菜单
manage.use("/getMenu",function(req,res){
    var params = JSON.parse(req.body);
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

//获取管理平台的菜单
manage.use("/getManageMenu",function(req,res){
    var params = JSON.parse(req.body);
    var Sql = `SELECT * FROM manage_menu`;
    if(params.type==="recommend"){
        //推荐列表文章
        Sql = `SELECT * FROM mamage_recommend_menu`;
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

//添加菜单
manage.use("/addManageMenu",function(req,res){
    var params = JSON.parse(req.body);
    var Sql = `INSERT INTO manage_menu (linkUrl,name,icon) VALUES ('${params.linkUrl}','${params.name}','${params.icon}')`;
    if(params.type==="recommend"){
        //添加推荐文章
        Sql = `INSERT INTO mamage_recommend_menu (linkUrl,name,read_num,type) VALUES ('${params.linkUrl}','${params.name}',0,${params.menuType||1})`;
    }
    sqlPoor.query(Sql,(err,data)=>{
        if(err) console.log(err);
        res.send(JSON.stringify(config.okData("0","添加成功",data)));
    });
});

//编辑菜单
manage.use("/editManageMenu",function(req,res){
    var params = JSON.parse(req.body);
    var Sql = `UPDATE manage_menu SET linkUrl = '${params.linkUrl}' , name = '${params.name}' , icon = '${params.icon}' WHERE id = ${params.id}`;
    if(params.type==="recommend"){
        //编辑推荐文章
        Sql = `UPDATE mamage_recommend_menu SET linkUrl = '${params.linkUrl}' , name = '${params.name}',type = ${params.menuType} WHERE id = ${params.id}`;
    }
    sqlPoor.query(Sql,(err,data)=>{
        if(err) console.log(err);
        res.send(JSON.stringify(config.okData("0","编辑成功",data)));
    });
});

//删除菜单
manage.use("/deleteManageMenu",function(req,res){
    var params = JSON.parse(req.body);
    var Sql = `DELETE FROM manage_menu WHERE id = ${params.id}`;
    if(params.type==="recommend"){
        //删除推荐文章
        Sql = `DELETE FROM mamage_recommend_menu WHERE id = ${params.id}`;
    }
    sqlPoor.query(Sql,(err,data)=>{
        if(err) console.log(err);
        res.send(JSON.stringify(config.okData("0","删除成功",data)));
    });
});

//配置主题功能
manage.use("/setTheme",function(req,res){
    var params = JSON.parse(req.body);
    var Sql = `UPDATE user_info SET theme = '${params.theme}' WHERE id = ${params.id}`;
    sqlPoor.query(Sql,(err,data)=>{
        if(err) console.log(err);
        res.send(JSON.stringify(config.okData("0","设置成功",data)));
    });
});



module.exports = manage;