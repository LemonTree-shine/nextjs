var express = require("express");
var config = require("../serverConfig");
const querystring = require('querystring');
const url = require('url');
var request = require('request');

var common = express.Router();

//处理post传过来的数据
config.setPostConfig(common);

//链接数据库
let sqlPoor = config.connecMysql();

common.use("/common/:id",function(req,res){
    //获取restful接口数据
    console.log(req.params);
    //获取post参数
    console.log(req.body);

    
    // sqlPoor.query("select * from user_info",function(err,result){
    //     res.send(JSON.stringify(result));
    // })

    res.send("asdasdasd11");
    
});

common.use("/getToken",function(req,res){
    //获取restful接口数据
    //console.log(req.params);
    //获取post参数
    //console.log(req.body);

    console.log(url.parse(req.url).query)

    var code = querystring.parse(url.parse(req.url).query).code;
    console.log(code);

    var urla = `https://github.com/login/oauth/access_token?client_id=fff6005ce888eb378dbe&client_secret=ee9c4585898e161054d703a3ade74c73b07945f1&code=${code}`
    request.post(urla,{},function(req,result){
        console.log(1)
        console.log(querystring.parse(result.body));
        var resultData = querystring.parse(result.body);
        request.post(`https://api.github.com/user?access_token=${resultData.access_token}`,{},function(req,result){
            console.log(result.body)
            res.send("asdasdasd");
        });
    });
    //https://api.github.com/user?access_token=access_token

    
})

module.exports = common;