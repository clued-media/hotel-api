var data1 = require('../raw/hotels_usa.json');
// var data2 = require('../raw/hotels_usa_2.json');
var w = require('../utility/write');
var utils = require('../utility/utils');
var config = require('../../config');

var locations = require('../locations.json');
var users = require('../users.json');
var rooms = require('../rooms.json');
var bookings = require('../bookings.json');
var reviews = require('../reviews.json');
var facilities = require('../facilities.json');
var media = require('../media.json');

module.exports = function () {
  var hotels = [];
  var i = 0;

  function createHotel(name) {
    hotels.push({
      id: config.ns + '/hotels/' + i,
      name: name,
      location: config.ns + '/locations/' + Math.floor(Math.random() * locations.length),
      users: utils.fillArray(0, 50, users.length, 'users'),
      rooms: utils.fillArray(10, 50, rooms.length, 'rooms'),
      bookings: utils.fillArray(0, 100, bookings.length, 'bookings'),
      reviews: utils.fillArray(0, 100, reviews.length, 'reviews'),
      facilities: utils.fillArray(10, 30, facilities.length, 'facilities'),
      media: utils.fillArray(0, 5, media.length, 'media')
    });
    i++;
  }

  data1['data'].forEach(entry => {
    var name = entry[8];
    var addr = entry[9];

    if (name !== addr) {
      createHotel(name);
    }
  });

  // data2.forEach(function(entry) {
  //   createHotel(entry.name);
  // });

  w('hotels', JSON.stringify(hotels));
}