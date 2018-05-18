var w = require('../utility/write');
var utils = require('../utility/utils');

var firstnames = require('../raw/firstnames.json');
var lastnames = require('../raw/lastnames.json');
var passwords = require('../raw/passwords.json');
var bookings = require('../bookings.json');
var reviews = require('../reviews.json');

module.exports = function() {
  var users = [];

  for (var i = 0; i < 1000; i++) {
    var firstname = firstnames[Math.floor(Math.random() * firstnames.length)]['firstname'];
    var lastname = lastnames[Math.floor(Math.random() * lastnames.length)]['lastname'];
    var username = firstname.toLowerCase() + lastname.toLowerCase();

    users.push({
      id: i,
      first_name: firstname,
      last_name: lastname,
      username: username,
      email: username + "@email.net",
      password: passwords[Math.floor(Math.random() * passwords.length)]["password"],
      bookings: utils.fillArray(0, 10, bookings.length, 'bookings'),
      reviews: utils.fillArray(0, 10, reviews.length, 'reviews')
    });
  }
  w("./users.json", JSON.stringify(users));
}