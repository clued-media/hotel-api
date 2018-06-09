var w = require('./../utility/write');
var config = require('../../config');

var hotels = require('../hotels.json');

module.exports = function () {
  var categories = ['Single Room', 'Double Room', 'Triple Room', 'Quadruple Room', 'Quintuple Room'];
  var rooms = [];

  for (var i = 0; i < 1000; i++) {
    var catIndex = Math.floor(Math.random() * categories.length);

    rooms.push({
      id: config.ns + '/rooms/' + i,
      room_no: i + 1,
      description: 'Awesome room',
      category: categories[catIndex],
      size: parseInt(Math.floor(Math.random() * 55) + 15),
      capacity: catIndex + 1,
      price: parseFloat((Math.random() * 200 + 20).toFixed(2)),
      hotel: config.ns + '/hotels/' + Math.floor(Math.random() * hotels.length)
    });
  }

  w('rooms', JSON.stringify(rooms));
}