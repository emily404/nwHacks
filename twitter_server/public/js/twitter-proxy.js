'use strict';

var fbRef = new Firebase('https://flickering-fire-8922.firebaseio.com/');
var twitterRef = fbRef.child('tweets');

var twitterData = [];

function setFirebase(data){

  var setData = {};

  for(var i in data){
    twitterData.push(data[i]);
    setData[i] = twitterData[i];
  }

  console.log(twitterData);
  console.log(setData);

  twitterRef.set(setData);

}

function updateFirebase(data){

  twitterData.push(data);

  //console.log(twitterData[twitterData.length-1])

  var setData = {}
  setData[twitterData.length-1] = data;

  twitterRef.update(setData);
}

//templates
var T_tweets = '<div class="tweet">'+
  '<img src="' + '<%= profile_img %>">' +
  '<p>' + '<%= tweet %>' + '</p>' +
  '</div>';

var T_tweets_comp = _.template(T_tweets);

//io
var io = io.connect('http://localhost');

io.emit('ready');

io.on('populate-twt', function(data){
  setFirebase(data);
  $('#tweet-list').html(' ');
  for(var i in data){
    $('#tweet-list').append(T_tweets_comp(data[i]));
  }
})

io.on('stream-twt', function(data){
  updateFirebase(data);
  //console.log(T_tweets_comp(data))
  $('#tweet-list').prepend(T_tweets_comp(data));
})

$( "#name-input" ).submit(function(event) {
  var formData = $('#name-input input').val();
  $('#tweet-list').html('fetching');
  io.emit('ready', formData);
  event.preventDefault();
})

// function renderList(input){
//   var output = '<div class="output-item"><img src="'+input.profile_img+'"><p>'+input.tweet+'</p></div>';
//   $('#tweet-list').append(output);
// }
