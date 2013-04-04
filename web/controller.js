var fs = require('fs');
var url = require('url');
var urlLog = [];

exports.fileServer = function(request, response){
  console.log(request.url);
  var filePath = 'web/public/index.html';
    if(request.url === 'http://127.0.0.1:8081/' || request.url === '/'){
      var filePath = 'public/index.html';
    } else {
      var urlString = url.parse(request.url);
      var filePath = '../data/sites' + urlString.path + '.html';
    }
    if(request.url === '/styles.css'){
      var filePath = 'public/styles.css';
    }

    fs.exists(filePath, function(exists) {
        fs.readFile(filePath, function(error, content){
          if (error || exists === false) {
            console.log(error);
            response.writeHead(404, {});
            response.end();
          } else {
            response.writeHead(200, {contentType: 'text'});
            response.end(content);
          }
        });
    });
}

exports.postURL = function(request, response, pathToSitesOverride){

  response.writeHead(302, {contentType: 'text/plain'});
  request.on('data', function(data){
    sanitizedData = data.slice(4);
    urlLog.push(sanitizedData);
    var path = pathToSitesOverride || '../data/sites.txt';
    fs.writeFile(path, urlLog,'utf8', function(error){
      if(error) {
        throw error;
      }
      console.log('it is done, let it be known.');
    });
  })
  response.end();
}