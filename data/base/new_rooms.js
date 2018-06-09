var w = require('./../utility/write');
var config = require('../../config');

var hotels = require('../hotels.json');

module.exports = function () {
  var categories = ['Single Room', 'Double Room', 'Triple Room', 'Quadruple Room', 'Quintuple Room'];
  var collection = {
    '@context': config.ns + '/contexts/collection',
    '@type': 'Collection',
    '@id': config.ns + '/rooms',
    members: []
  };
  var rooms = [];

  for (var i = 0; i < 1000; i++) {
    var catIndex = Math.floor(Math.random() * categories.length);

    rooms.push({
      '@context': config.ns + '/contexts/room',
      '@id': config.ns + '/rooms/' + i,
      '@type': 'Room',
      room_no: i + 1,
      description: 'Awesome room',
      category: categories[catIndex],
      size: parseInt(Math.floor(Math.random() * 55) + 15),
      capacity: catIndex + 1,
      price: parseFloat((Math.random() * 200 + 20).toFixed(2)),
      hotel: config.ns + '/hotels/' + Math.floor(Math.random() * hotels.length)
    });
    collection.members.push({
      '@id': config.ns + '/rooms/' + i,
      '@type': 'vocab:Room'
    });
  }

  w('rooms', JSON.stringify(rooms));
  w('collections/rooms', JSON.stringify(collection));
}