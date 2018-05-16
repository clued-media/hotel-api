var data1 = require('../raw/hotels_usa.json');
var data2 = require('../raw/hotels_usa_2.json');
var w = require('../utility/write');

var locations = require('../locations.json');
var users = require('../users.json');
var rooms = require('../rooms.json');
var bookings = require('../bookings.json');
var payments = require('../payments.json');
var reviews = require('../reviews.json');
var facilities = require('../facilities.json');
var media = require('../media.json');

module.exports = function() {
  var all_hotels = [];
  var id = 0;

  /**
   * Returns an array with min...max unique random numbers in the range of 0...length.
   **/
  function fillArray(min, max, length) {
    var set = new Set();
    var maxCount = Math.floor(Math.random() * (max - min + 1)) + min;
    for (var i = 0; i < maxCount; i++) {
      set.add(Math.floor(Math.random() * length))
    }

    return Array.from(set);
  }

  function createHotel(name) {
    var formatted_data = {
      id: id,
      name: name,
      location: Math.floor(Math.random() * locations.length),
      users: fillArray(0, 50, users.length),
      rooms: fillArray(10, 50, rooms.length),
      bookings: fillArray(0, 100, bookings.length),
      payments: fillArray(0, 50, payments.length),
      reviews: fillArray(0, 100, reviews.length),
      facilities: fillArray(10, 30, facilities.length),
      media: fillArray(0, 5, media.length)
    }

    all_hotels.push(formatted_data);
    id++;
  }

  data1["data"].forEach(function(entry) {
    var name = entry[8];
    var addr = entry[9];

    if (name != addr)
      createHotel(name);
  });

  // data2.forEach(function(entry) {
  //   createHotel(entry.name);
  // });

  w("./hotels.json", JSON.stringify(all_hotels));
}