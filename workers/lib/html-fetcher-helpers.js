
var fs = require('fs');
var httpGetter = require('http-get');
var mongodb = require("mongodb");
// 27017 is the default port for connecting to MongoDB
var server = new mongodb.Server("127.0.0.1", 27017, {});
var client = new mongodb.Db('newDB', server);

exports.readUrls = function(urlSource, cb){
  fs.readFile(urlSource, cb);
};

exports.downloadUrls = function(list){
  console.log(list);
  client.open(function(err, p_client) {
    console.log("Connected to MongoDB");

    client.createCollection("sites", function(err, collection) {
      console.log("Collection is", collection);
      for (var i = 0; i < list.length; i++) {
        var options = {
          url: list[i],
        };
        var siteContents = "";
        httpGetter.get(options, function(error, result) {
          if (error) {
            console.log("Error", error);
          }
          else {
            var newDoc = {
              name: list[i],
              content: result.buffer
            };

            collection.insert(newDoc, function(err, data){
              if (err) {
                console.log("ERROR");
              }
              console.log('inserted into table');
            });
          }
        });
      }
      
    });
  });
  // client.close();
};


