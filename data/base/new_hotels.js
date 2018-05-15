var data1 = require('./../raw/hotels_usa.json');
// var data2 = require('./../raw/hotels_usa_2.json');
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

  data1["data"].forEach(function(entry) {
    var formatted_data = {};
    var name = entry[8];
    var addr = entry[9];

    if (name != addr) {
      formatted_data = {
        name: name,
        id: id,
        location: Math.floor(Math.random() * locations.length),
        users: [],
        facilities: [],
        rooms: [],
        bookings: [],
        payments: [],
        reviews: [],
        media: []
      }

      formatted_data["users"] = fillArray(0, 50, users.length);
      formatted_data["rooms"] = fillArray(10, 50, rooms.length);
      formatted_data["bookings"] = fillArray(0, 100, bookings.length);
      formatted_data["payments"] = fillArray(0, 50, reviews.length);
      formatted_data["reviews"] = fillArray(0, 100, reviews.length);
      formatted_data["facilities"] = fillArray(10, 30, facilities.length);
      formatted_data["media"] = fillArray(0, 5, media.length);

      all_hotels.push(formatted_data);
      id++;
    }
  })

  // data2.forEach(function(entry) {
  //   var formatted_data = {};
  //
  //   formatted_data = {
  //     name: entry.name,
  //     id: id,
  //     location: (id - 346),
  //     users: [],
  //     facilities: [],
  //     rooms: [],
  //     bookings: [],
  //     payments: [],
  //     reviews: [],
  //     media: []
  //   }
  //   formatted_data["users"][0] = id;
  //   formatted_data["users"][1] = id + 600;
  //   formatted_data["users"][2] = id + 300;
  //   formatted_data["payments"][0] = id;
  //   formatted_data["payments"][1] = id + 600;
  //   formatted_data["payments"][2] = id + 300;
  //   formatted_data["facilities"][0] = id;
  //   formatted_data["facilities"][1] = id - 1;
  //   formatted_data["reviews"][0] = id;
  //   formatted_data["rooms"][0] = id;
  //   formatted_data["rooms"][1] = id + 1;
  //   formatted_data["media"][0] = id % 5;
  //   formatted_data["bookings"][0] = id;
  //
  //   all_hotels.push(formatted_data);
  //   id++;
  // })


  w("./hotels.json", JSON.stringify(all_hotels));
}