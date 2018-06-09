var w = require('../utility/write');
var data = require('../raw/hotels_usa_2.json');
var config = require('../../config');

var users = require('../users.json');
var hotels = require('../hotels.json');

module.exports = function () {
  var reviews = [];

  for (var i = 0; i < 10000; i++) {
    reviews.push({
      id: config.ns + '/reviews/' + i,
      date: data[i]['reviews']['date'],
      rating: parseInt(data[i]['reviews']['rating']),
      comment: data[i]['reviews']['text'],
      user: config.ns + '/users/' + Math.floor(Math.random() * users.length),
      hotel: config.ns + '/hotels/' + Math.floor(Math.random() * hotels.length)
    });
  }

  w('reviews', JSON.stringify(reviews));
}