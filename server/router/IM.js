var express = require("express");
var config = require("../serverConfig");
const querystring = require('querystring');
const url = require('url');
var request = require('request');
const cookieParser = require("cookie-parser"); //读取cookie
const session = require('express-session');
var fs = require('fs');
var sha1 = require('sha1');
var nodemailer = require("nodemailer");

var IM = express.Router();

//链接数据库
let sqlPoor = config.connecMysql();

//创建im信息
IM.use("/createUser",function(req,res){

    if(!req.session.loginName){
        res.send(JSON.stringify(config.notLoginData())); 
        return;
    }

    var querySql = `SELECT * FROM im_info WHERE name='${req.session.loginName}'`;

    sqlPoor.query(querySql,(err,data)=>{
        if(err){
            console.log(err);
            res.send(JSON.stringify(config.serverErr(err)));
            return;
        }

        if(data.length){
            res.send(config.okData("","",data[0]));
        }else{
            var AppKey = config.ImSecrateData.AppKey;
            var AppSecret = config.ImSecrateData.AppSecret;
            var Nonce = Math.random().toString(36).substr(2,15);
            var CurTime = parseInt(new Date().getTime() / 1000) + "";
            var CheckSum = sha1(AppSecret+Nonce+CurTime);

            request({
                url: "https://api.netease.im/nimserver/user/create.action",//请求路径
                method: "POST",//请求方式，默认为get
                headers: {//设置请求头
                    "content-type": "application/x-www-form-urlencoded;charset=utf-8;",
                    'AppKey': AppKey, //开发者平台分配的appkey 别写错了
                    'Nonce': Nonce,
                    'CurTime': CurTime,
                    'CheckSum': CheckSum
                },
                formData: {
                    accid:Math.random().toString(36).substr(2,15),
                    name:req.session.loginName
                }//post参数字符串
            },(error, response, body)=>{
                if(error){
                    res.send(config.serverErr()); 
                }
                var data = JSON.parse(body);

                if(data.code===200){
                    var insertSql = `INSERT INTO im_info (uid,accid,token,name) SELECT id,'${data.info.accid}','${data.info.token}','${req.session.loginName}' FROM user_info WHERE login_name = '${req.session.loginName}';`;
                    sqlPoor.query(insertSql,()=>{
                        if(err){
                            res.send(JSON.stringify(config.serverErr(err)));
                        }else{
                            res.send(config.okData("","创建用户成功",data.info));
                        }
                    });
                }else{
                    if(error){
                        res.send(config.serverErr()); 
                    }
                }
                
            })
        }

    })  
});

IM.use("/sendEmail",function(req,res){
    var params = JSON.parse(req.body);
    if(!req.session.loginName){
        res.send(JSON.stringify(config.notLoginData())); 
        return;
    }
    if(!params.email){
        res.send(JSON.stringify(config.serverErr({},"邮箱地址不能为空")));
        return;
    }
    
    const mailTransport = nodemailer.createTransport(config.emailConfig);
    
    mailTransport.sendMail({
        from: '"lemonTree-shine(陈泽)" <18815288453@163.com>', // sender address
        to: params.email, // list of receivers
        subject: 'IM消息通知', // Subject line
        html: '收到来自网站<a href="http://www.xiaogangji.com/im_chat/im_chat">http://www.xiaogangji.com/im_chat/im_chat</a>的消息，赶紧去看看吧！' // html body
    }, (error, info = {}) => {
        if(error){
            res.send(JSON.stringify(config.serverErr(err)));
        }else{
            res.send(config.okData("","发送成功",{}));
        }
    });
});

module.exports = IM;