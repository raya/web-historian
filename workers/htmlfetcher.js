// eventually, you'll have some code here that uses the tested helpers 
// to actually download the urls you want to download.
var helpers = require('./lib/html-fetcher-helpers');
var cronJob = require('cron').CronJob;
var siteList = [];

helpers.readUrls('../data/sites.txt', function(err, data){
    if(err){
      throw err;
    }
    siteList = data.toString().split(',');
    helpers.downloadUrls(siteList);
});

