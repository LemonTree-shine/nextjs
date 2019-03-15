var bodyParser = require('body-parser');

//配置服务器post请求数据
exports.setPostConfig = function(app){
    /**
     * 处理application/x-www-form-urlencoded
    */
   app.use(bodyParser.urlencoded({ extended: false }))

    /**
     * 处理application/json
    */
   app.use(bodyParser.json())

    /**
     * 处理text/plain
    */
   app.use(bodyParser.text());
}