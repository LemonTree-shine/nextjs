module.exports = function(io){

    io.on('connection', function (socket) { 
        getSocket(socket);
    });
}

function getSocket(socket){
    socket.on('message', function (data) {
        //广播功能
        //socket.emit('message', {user: socket.id});  
        socket.broadcast.emit('message', data);  
    });
    //发生错误时触发
    socket.on('error', function (err) {
        console.log(err);
    });

    socket.on('disconnect', () => { 
        console.log("我已断开连接")
    });
}
