'use strict';

var express = require('express.io');
var app = express().http().io();

var hashList = ['#testhack'];

var Twit = require('twit')

var T = new Twit({
    consumer_key:         'QRmkNo864YtXtzAtgY6GZg'
  , consumer_secret:      '0yActCEdt8hSaq2KCx3Z44OnggzHlilDATDT7ztmc'
  , access_token:         '116678841-9b4i9xJ9w9od80Wg490Wuha92pmp5ZG9FJFJ0PIp'
  , access_token_secret:  '8kxCHzT7DZgTgvBc4sMuZQx8RdKv6KZyEMpKM9XIJYZ18'
})

var userID = '';

var T_hashParse = function(data){
  console.log(data.statuses);

  var dataOut = [];

  for(var i in data.statuses){
    dataOut.push({
      tweet: data.statuses[i].text,
      profile_img: data.statuses[i].user.profile_image_url
    });
  }
  console.log(dataOut);
  return dataOut;
}

var T_parse = function(data){
  var dataOut = [];
  for(var i in data){
    dataOut.push(
    { tweet: data[i].text,
      profile_img: data[i].user.profile_image_url
    });
    userID = data[i].user.id;
  }
  return dataOut;
}

var T_single_parse = function(data){
  return { tweet: data.text, profile_img: data.user.profile_image_url } ;
}

app.use(express.static(__dirname + '/public', { redirect: false }));

app.get('/', function(req, res){
  res.sendfile(__dirname + '/views/index.html');
});


app.io.route('ready', function(req, res){

  // T.get('statuses/user_timeline', { screen_name: req.data , count: 10 }, function(err, data) {

  //   console.log(data);

  //   if(err){
  //     console.log(err);
  //   }else{
  //     req.io.emit('populate-twt', T_parse(data));
  //   }
  // });

  T.get('search/tweets', { q: hashList, count: 100 }, function(err, data, response) {
    if(err){
      console.log(err);
    }else{
      req.io.emit('populate-twt', T_hashParse(data));
    }
  });

  var T_stream = T.stream('statuses/filter', { track: hashList })

  T_stream.on('tweet', function (data) {
    console.log(data.user.profile_image_url);
    req.io.emit('stream-twt', T_single_parse(data));
  })

});

var port = process.env.PORT || 5050;
app.listen(port, function () {
        console.log('Listening on ' + port);
});
