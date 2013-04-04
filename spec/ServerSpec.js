var handler = require("../web/router");
var stubs = require("../specHelpers/stubs");
var controller = require('../web/controller');
var fs = require('fs');
var res;

// allows us to run tests async
function async(cb){
  waits(200);
  runs(cb);
}

var helpMeRead = function(path){
  console.log(process.cwd());
  console.log(path);
  fs.readFile(path, function(err, data){
    if(err){
      throw err;
    }
    console.log('DATA EQUALS:' + data);
    return 0;
  });
}

beforeEach(function(){
  res = new stubs.Response();
});

describe("Node Server Request Listener Function", function() {

  it("Should answer GET requests for /", function() {
    var req = new stubs.Request("http://127.0.0.1:8080/", "GET");
    handler.funkyRouter(req, res);
    async(function(){
      expect(res.responseCode).toEqual(200);
      expect(res.data).toMatch(/<input/); // the resulting html should have an input tag
      expect(res.ended).toEqual(true);
    });
  });

  it("Should answer GET requests for archived websites", function() {
    var fixtureName = "www.google.com";
    var req = new stubs.Request("http://127.0.0.1:8080/" + fixtureName, "GET");
    handler.funkyRouter(req, res);
    async(function(){
      expect(res.responseCode).toEqual(200);
      expect(res.data).toMatch(/google/); // the resulting html should have the text "google"
      expect(res.ended).toEqual(true);
    })
  });

  it("Should accept posts to /", function() {
    var url = "www.example.com";
    var req = new stubs.Request("http://127.0.0.1:8080/", "POST", {url: url});
    console.log('HELPER EQUALS:'+helpMeRead('/web/urlLog.txt'));
    expect(helpMeRead('web/urlLog.txt').toEqual(''));
    controller.postURL(req, res, 'urlLog.txt');
    console.log(helpMeRead('web/urlLog.txt'));
    expect(res.responseCode).toEqual(302);
    // expect(.data).toEqual(url + "\n");
    expect(res.ended).toEqual(true);
  });

  it("Should 404 when asked for a nonexistent file", function() {
    var req = new stubs.Request("http://127.0.0.1:8080/arglebargle", "GET");
    handler.funkyRouter(req, res);
    async(function() {
      expect(res.responseCode).toEqual(404);
      expect(res.ended).toEqual(true);
    });
  });

});
