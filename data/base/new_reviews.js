var w = require('../utility/write');
var data = require('../raw/hotels_usa_2.json');
var config = require('../utility/utils').config;

module.exports = function() {
  reviews = [];

  for (var i = 0; i < 10000; i++) {
    reviews.push({
      id: i,
      date: data[i]["reviews"]["date"],
      rating: parseInt(data[i]["reviews"]["rating"]),
      comment: data[i]["reviews"]["text"],
      user: config.api + '/users/' + Math.floor(Math.random() * 1000),
      hotel: config.api + '/hotels/' + Math.floor(Math.random() * 1000),
    });
  }

  w("./reviews.json", JSON.stringify(reviews));
}