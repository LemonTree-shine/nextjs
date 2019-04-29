var express = require("express");
var next = require("next");

//接口路由配置
var common = require("./server/router/common");

//判断环境
const dev = process.env.NODE_ENV !== 'production';

console.log(dev);

var app = next({dev});

//next暴露的方法，用于接入express
const handle = app.getRequestHandler()

//起一个express服务器，用于接入next和请求接口
const server = express();

//next处理托管到express端
app.prepare().then(function(req,res){
    
    //处理路由
    startServer(req,res);

}).catch((ex) => {
    console.error(ex.stack)
});


//处理路由请求等问题
function startServer(req,res){

    /**
     * 接口处理统一url加上/api 
     * 为了避免页面和接口重复，接口最好统一使用post方法
    */
    server.use("/api",common);

    //编辑文章地址
    server.use("/editor/:id",function(req,res){
        console.log(req.params)
        app.render(req, res, '/editor', req.params)
    });

    //阅读文章地址
    server.use("/article/:id",function(req,res){
        console.log(req.params)
        app.render(req, res, '/article', req.params)
    });

    //next.js服务器渲染统一走默认配置
    server.get("*",function(req,res){
        handle(req,res);
    });


    //启动80端口
    server.listen("80",function(err){
        if(err){
            console.log(err)
        }
        console.log("server run at:localhost:80");
    })  
}

