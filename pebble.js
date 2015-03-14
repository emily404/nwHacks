var UI = require('ui');
var ajax = require('ajax');

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'#MFM',
  subtitle:'Meat Free Monday \^o^/ '
});

// Display the Card
card.show();

// Construct URL
var URL = 'https://flickering-fire-8922.firebaseio.com/.json';

// Make the request
ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    // Success!
    console.log("Successfully fetched food data!");

    // Extract data
    var food = data.food[1].name;

    // Show to user
    card.subtitle(food);
    card.body("Jenny likes food");
  },
  function(error) {
    // Failure!
    console.log('Failed fetching firebase data: ' + error);
  }
);
