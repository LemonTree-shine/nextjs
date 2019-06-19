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

//存稿文章
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
            var insertSql = `INSERT INTO article_list (title,filename,userId,createTime,author,support,type)
                        VALUES
                        ('${title}','${String(time)}','${userid}','${time}','${req.session.loginName}','0','0')`;
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
    
});

//发布,取消发布接口
common.use("/publishUnpublishArticle",function(req,res){
    if(!req.session.loginName){
        res.send(JSON.stringify(config.notLoginData())); 
        return;
    }
    try{
        let params = JSON.parse(req.body);

        var updateSql = `UPDATE article_list SET type = '${params.type}' WHERE id = '${params.id}'`

        //发布文章，插入数据库
        sqlPoor.query(updateSql,(err,data)=>{
            if(err){
                res.send(JSON.stringify(config.serverErr(err)));
            }else{
                res.send(JSON.stringify(config.okData("0","成功",{data:"发布成功"})));
            }
            
        })
    }catch{
        res.send(JSON.stringify(config.okData("500","服务器出错！",{})));
    }
})

//更新文章
common.use("/uploadArticle",function(req,res){
    //console.log(req.session.loginName)
    //console.log(JSON.parse(req.body));
    // if(!req.session.loginName){
    //     res.send(JSON.stringify(config.notLoginData())); 
    //     return;
    // }
    try{
        let params = JSON.parse(req.body);

        var updateSql = `UPDATE article_list SET title = '${params.title}' WHERE id = '${params.id}'`

        //发布文章，插入数据库
        sqlPoor.query(updateSql,(err,data)=>{
            if(err){
                res.send(JSON.stringify(config.serverErr(err)));
            }else{
                fs.writeFile(`${config.articlePath}/${params.filename}.md`,params.content,(err)=>{
                    if(err){
                        res.send(JSON.stringify(config.serverErr(err)));
                    }else{
                        res.send(JSON.stringify(config.okData("0","成功",{data:"更新成功"})));
                    }
                })
                
            }
            
        })
        

        
    }catch{
        res.send(JSON.stringify(config.okData("500","服务器出错！",{})));
    }
    
});

//读取文章
common.use("/readArticle",function(req,res){
    let params = JSON.parse(req.body);
    let id = params.id;

    // var sql = `SELECT * FROM article_list WHERE id=${id}`;
    //关联查询
    var sql = `SELECT * FROM article_list INNER JOIN user_info on article_list.userId = user_info.id WHERE article_list.id=${id}`;
    sqlPoor.query(sql,(err,data)=>{
        
        if(err){
            res.send(JSON.stringify(config.serverErr(err)));
        }else{
            if(data.length){
                var resData = data[0];
                var content = fs.readFileSync(`${config.articlePath}/${resData.filename}.md`,'utf-8');

                res.send(JSON.stringify(config.okData("0","成功",{
                    ...resData,
                    content:content,
                })));
            }else{
                res.send(JSON.stringify(config.okData("2","文章不存在",{data:"文章不存在"})));
            }
        }
    });
});

//获取文章列表
common.use("/getArticleList",function(req,res){
    var sql = `SELECT * FROM article_list`;
    sqlPoor.query(sql,(err,data)=>{
        
        if(err){
            res.send(JSON.stringify(config.serverErr(err)));
        }else{
            var dataStr = JSON.stringify(config.okData("0","成功",{
                data
            }))
            res.send(dataStr);
        }
    });
});

//删除文章
common.use("/deleteArticle",function(req,res){
    let params = JSON.parse(req.body);
    if(!req.session.loginName){
        res.send(JSON.stringify(config.notLoginData())); 
        return;
    }

    var deleteSql = `DELETE FROM article_list WHERE id = '${params.id}'`;
    sqlPoor.query(deleteSql,(err,data)=>{
        if(err){
            res.send(JSON.stringify(config.serverErr(err)));
        }else{
            var filePath = config.articlePath+"/"+params.filename+".md";
            fs.unlink(filePath,(err)=>{
                if(err){
                    res.send(JSON.stringify(config.serverErr(err)));
                }else{
                    var dataStr = JSON.stringify(config.okData("0","删除成功",{}));
                    res.send(dataStr);
                }
            });
        }
    });
});

//文章点赞功能
common.use("/supportArticle",function(req,res){
    let params = JSON.parse(req.body);
    var loginName = req.session.loginName;
    if(!loginName){
        res.send(JSON.stringify(config.notLoginData())); 
        return;
    }

    var sql = `SELECT * FROM support WHERE Aid=${params.id} AND login_name='${req.session.loginName}'`;

    sqlPoor.query(sql,(err,data)=>{
        if(err){
            res.send(
                JSON.stringify(config.serverErr(err))
            );
        }else{
            //如果有，则说明已经点过赞了
            if(data.length){
                //status=1说明已经点过赞
                var dataStr = JSON.stringify(config.okData("0","本篇文章您已经点过赞了哦~~",{
                    status:"1"
                }));
                res.send(dataStr);
            }else{
                //如果查不到数据，说明没有点过赞;
                //UPDATE article_list SET support = article_list.support+1 WHERE id = ${params.id};
                var sql = `UPDATE article_list SET support = article_list.support+1 WHERE id = ${params.id};INSERT INTO support (Aid,login_name) VALUES ('${params.id}','${loginName}');`
                sqlPoor.query(sql,(err,data)=>{
                    if(err){
                        res.send(JSON.stringify(config.serverErr(err)));
                    }else{
                        var dataStr = JSON.stringify(config.okData("0","点赞成功，非常感谢您的支持~~",{}));
                        res.send(dataStr);
                    }
                });
            }
        }
    });
    

});

//评论功能
common.use("/comment",function(req,res){
    let params = JSON.parse(req.body);
    var loginName = req.session.loginName;
    if(!loginName){
        res.send(JSON.stringify(config.notLoginData())); 
        return;
    }

    var sql = `INSERT INTO commit (Aid,content,login_name,Plogin_ame,root_login_name,Puid,Pid,Uid,header_url) VALUES (
        '${params.Aid}',
        '${params.content}',
        '${loginName}',
        '${params.PloginName||""}',
        '${params.rootLoginName||""}',
        '${params.Puid||""}',
        '${params.Pid||""}',
        (SELECT id FROM user_info WHERE login_name='${loginName}'),
        (SELECT avatar_url FROM user_info WHERE login_name='${loginName}')
    );`

    sqlPoor.query(sql,(err,data)=>{
        if(err){
            res.send(JSON.stringify(config.serverErr(err)));
        }else{
            var dataStr = JSON.stringify(config.okData("0","评论成功",{}));
            res.send(dataStr);
        }
    })
    
});

//获取评论列表
common.use("/getCommentList",function(req,res){
    let params = JSON.parse(req.body);

    var sql = `SELECT * FROM commit WHERE Aid = '${params.Aid}'`

    sqlPoor.query(sql,(err,data)=>{
        if(err){
            res.send(JSON.stringify(config.serverErr(err)));
        }else{
            var dataStr = JSON.stringify(config.okData("0","评论成功",{
                data
            }));
            res.send(dataStr);
        }
    })
})

module.exports = common;