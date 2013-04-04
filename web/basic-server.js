var http = require("http");
var myStuff = require("./router");

var port = 8081;
var ip = "127.0.0.1";
var server = http.createServer(myStuff.funkyRouter);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

