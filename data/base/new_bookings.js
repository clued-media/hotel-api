var w = require('../utility/write');
var utils = require('../utility/utils');
var config = require('../../config');

var users = require('../users.json');
var rooms = require('../rooms.json');

module.exports = function () {
  var pmts = ['paypal', 'credit', 'debit', 'cash']
  var bookings = [];

  for (var i = 0; i < 1000; i++) {
    var bookingDate = utils.getDate();
    var arrivalDate = utils.getDate(bookingDate);

    bookings.push({
      id: config.ns + '/bookings/' + i,
      date: bookingDate,
      arrival_date: arrivalDate,
      departure_date: utils.getDate(arrivalDate),
      payment_method: pmts[Math.floor(Math.random() * pmts.length)],
      amount: parseFloat((Math.random() * 500 + 20).toFixed(2)),
      user: config.ns + '/users/' + Math.floor(Math.random() * users.length),
      rooms: utils.fillArray(1, 5, rooms.length, 'rooms')
    });
  }

  w('bookings', JSON.stringify(bookings));
}