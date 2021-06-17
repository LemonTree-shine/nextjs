var express = require("express");
var next = require("next");
var fs = require("fs");
var path = require("path");
const cookieParser = require("cookie-parser"); //读取cookie
const session = require('express-session');
var config = require("./server/serverConfig");
var compression = require('compression');
var ioFn = require("./server/socketIo");
let http = require('http');

const sio = require('socket.io')

//接口路由配置
var common = require("./server/router/common");

var {configProxy} = require("./proxyConfig");   //转发配置文件

//判断环境
const dev = process.env.NODE_ENV !== 'production';

console.log(dev);

var app = next({dev});

//next暴露的方法，用于接入express
const handle = app.getRequestHandler()

//起一个express服务器，用于接入next和请求接口
let server = express();
let httpServer = http.createServer(server);



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
     * 处理静态页面资源路由
     */
    server.use("/staticPage/*",function(req,res){
        var htmlContent = "";
        htmlContent = fs.readFileSync(path.join(__dirname,req.originalUrl));

        res.send(htmlContent.toString());
    });

    //处理post传过来的数据
    // config.setPostConfig(server);

    // //处理cookie
    // server.use(cookieParser());

    // //处理session
    // server.use(session({
    //     name:"Login_session",
    //     secret:"chenze",
    //     maxAge: 24*60 * 1000 * 30,
    //     resave:true,
    //     saveUninitialized:true,
    //     signed:true,
    // }));
    server.use(compression())

    //所有路由都走这边，以后便于做拦截处理
    server.use(function(req,res,next){
        next();   
    });

    //开启代理
    configProxy(server);

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
    httpServer.listen("80",function(err){
        if(err){
            console.log(err)
        }
        console.log("server run at:localhost:80");
    });

    //创建io实例
    let io = sio(httpServer);
    
    //处理实时数据交互
    ioFn(io);
}

