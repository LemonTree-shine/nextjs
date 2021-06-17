var fs = require("fs");
var proxy = require("http-proxy");
var CryptoJS = require("crypto-js");

var packageInfo = fs.readFileSync("./package.json",{
    encoding:"utf-8"
});

function configProxy(app){
    var Proxy = proxy.createProxyServer({
        changeOrigin: true
    });


    app.use("/manage/*",function(req,res){
        Proxy.web(req,res,{
            target:"http://127.0.0.1:8080"+req.originalUrl
        })
    });

    Proxy.on('proxyReq', function (proxyReq, req, res, options) {
        
        //同步cookie
        proxyReq.setHeader("cookie", req.headers.cookie || '');

        //console.log(options);
        if(req.session){
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(req.session), 'chenze').toString();
            proxyReq.setHeader("session_token",ciphertext);
        }
        
    });
    Proxy.on('error',(e)=>{
        console.log(e);
    })
}

module.exports = {
    configProxy:configProxy
}