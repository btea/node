const http = require('http');
const fs = require('fs');
const server = require('ws').Server;



http.createServer(function(request, response){
    fs.readFile('./index.html', 'utf-8', function(err, data){
        if(err){return;}
        response.end(data);
    })
}).listen(3333);

let wsServer = new server({ port: 2333 })
wsServer.on('connection', function(socket) {
  //每一个socket都有一个唯一的ID属性
//   console.log(socket)
  console.log('客户端连接成功')
  //监听对方发过来的消息
  socket.on('message', function(message) {
    console.log('接收到客户端的消息', message)
    socket.send('服务器回应:' + message)
  })
})