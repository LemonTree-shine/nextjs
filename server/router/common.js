var express = require("express");
var config = require("../serverConfig");

var common = express.Router();

//处理post传过来的数据
config.setPostConfig(common);

common.post("/common/:id",function(req,res){
    //获取restful接口数据
    console.log(req.params);
    //获取post参数
    console.log(req.body);
    res.send(JSON.stringify({message:"hello world"}));
});

module.exports = common;