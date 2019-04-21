var express = require("express");
var config = require("../serverConfig");
const querystring = require('querystring');
const url = require('url');
var request = require('request');
const cookieParser = require("cookie-parser"); //读取cookie
const session = require('express-session');

var fs = require('fs');

var common = express.Router();

//处理post传过来的数据
config.setPostConfig(common);

//链接数据库
let sqlPoor = config.connecMysql();

//处理cookie
common.use(cookieParser());

//处理session
common.use(session({
    name:"Login_session",
    secret:"chenze",
    maxAge: 24*60 * 1000 * 30,
    signed:true,
}));

//所有理由都走这边，以后便于做拦截处理
common.use(function(req,res,next){
    next();   
})

//获取登录信息
common.use("/getUserInfo",function(req,res){
    //判断session是否存在
    if(req.session.loginName){
        sqlPoor.query(`SELECT * FROM user_info WHERE login_name='${req.session.loginName}'`,(err,data)=>{
            if(err) console.log(err);
            if(data.length){
                res.send(JSON.stringify(config.okData("0","成功",data[0])));
            }else{
                res.send(JSON.stringify(config.notLoginData())); 
            }
            
        });
        
    }else{
        res.send(JSON.stringify(config.notLoginData())); 
    }
});

//获取githubCode
common.use("/getGithubCode",function(req,res){
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.githubData.client_id}`);
});

//点击登录接口
common.use("/getToken",function(requestBody,res){

    //根据client_id获取code
    var code = querystring.parse(url.parse(requestBody.url).query).code;

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
            var loginData = JSON.parse(result.body);
            //拿到登录信息需要现在数据库中查询信息是否已经存在，若存在，跳过将数据插入数据库的过程
            var queryUserInfo = `SELECT * FROM user_info WHERE login_name='${loginData.login}'`
            console.log(queryUserInfo);
            sqlPoor.query(queryUserInfo,(err,data)=>{
                if(err){
                    console.log(err)
                }else{
                    //console.log(JSON.stringify(data))
                    //查询到数据库中有数据
                    if(data.length){
                        //登录成功塞入一个session:loginName
                        requestBody.session.loginName = loginData.login;

                        //跳转到首页面
                        res.redirect("/")
                    }else{
                        var insertSql = `INSERT INTO user_info ( login_name, avatar_url,html_url,name,company,blog,location,email,bio,public_repos,followers,created_at,login_time )
                                VALUES 
                            ( '${loginData.login}','${loginData.avatar_url}','${loginData.html_url}','${loginData.name}','${loginData.company}','${loginData.blog}','${loginData.location}','${loginData.email}','${loginData.bio}','${loginData.public_repos}','${loginData.followers}','${loginData.created_at}','${new Date().getTime()}' );`
            
                        sqlPoor.query(insertSql,(err,data)=>{
                            if(err){
                                console.log(err)
                            }else{
                                //登录成功塞入一个session:loginName
                                requestBody.session.loginName = loginData.login;

                                //跳转到首页面
                                res.redirect("/")
                            }
                        });
                    }
                }
            }); 
        });
    });   
});

//发布文章
common.use("/publishArticle",function(req,res){
    //console.log(req.session.loginName)
    //console.log(JSON.parse(req.body));
    if(!req.session.loginName){
        res.send(JSON.stringify(config.notLoginData())); 
        return;
    }
    try{
        let params = JSON.parse(req.body);
        let title = params.title;
        let content = params.content;

        let time = new Date().getTime();

        //获取发布人的id
        sqlPoor.query(`SELECT * FROM user_info WHERE login_name='${req.session.loginName}'`,(err,data)=>{
            var userid = data[0].id;
            var insertSql = `INSERT INTO article_list (title,filename,userId,content,createTime,author)
                        VALUES
                        ('${title}','${String(time)}','${userid}','${content}','${time}','${req.session.loginName}')`;
            //发布文章，插入数据库
            sqlPoor.query(insertSql,(err,data)=>{
                if(err){
                    res.send(JSON.stringify(config.serverErr(err)));
                }else{
                    fs.writeFile(`${config.articlePath}/${String(time)}.md`,content,(err)=>{
                        if(err){
                            res.send(JSON.stringify(config.serverErr(err)));
                        }else{
                            res.send(JSON.stringify(config.okData("0","成功",{data:"发布成功"})));
                        }
                    })
                    
                }
                
            })
        });
        

        
    }catch{
        res.send(JSON.stringify(config.okData("500","服务器出错！",{})));
    }
    
})

module.exports = common;