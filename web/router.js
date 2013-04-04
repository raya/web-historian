var controller = require('./controller')
exports.funkyRouter = function (request, response, content) {
  if(request.url === '/' || 'http://127.0.0.1:8081'){
    switch(request.method){
      case 'POST':
        response.writeHead(200, {contentType: 'text/html'});
        controller.postURL(request, response, content);
        break;
      case 'GET':
        controller.fileServer(request, response);  
        break;
    } 
  }
};
