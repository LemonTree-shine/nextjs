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

common.use(function(req,res,next){
    next();
})


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

common.use("/getGithubCode",function(req,res){
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.githubData.client_id}`);
});

common.use("/getToken",function(req,res){
    //根据client_id获取code
    var code = querystring.parse(url.parse(req.url).query).code;

    //获取access_token
    var get_access_token_url = `https://github.com/login/oauth/access_token?client_id=${config.githubData.client_id}&client_secret=${config.githubData.client_secret}&code=${code}`
    request.get(get_access_token_url,{},function(req,result){
        var resultData = querystring.parse(result.body);
        //根据access_token获取用户信息
        request.get(`https://api.github.com/user?access_token=${resultData.access_token}`,{
            headers:{
                'User-Agent':'LemonTree-shine'
            }
        },function(req,result){
            //处理用户信息
            res.redirect("/")
        });
    });   
})

module.exports = common;