var w = require('../utility/write');
var data = require('../raw/hotels_usa_2.json');
var config = require('../../config');

module.exports = function () {
  var locations = [];
  var i = 0;

  data.forEach(function (entry) {
    var formattedData = {
      id: config.ns + '/locations/' + i,
      longitude: parseFloat(entry.longitude),
      latitude: parseFloat(entry.latitude),
      city: entry.city,
      country: entry.country,
      country_code: 'USA'
    };

    // Add only new locations.
    if (i === 0 || (formattedData.longitude !== locations[i - 1].longitude && formattedData.latitude !== locations[i - 1].latitude)) {
      locations.push(formattedData);
      i++;
    }
  });

  w('locations', JSON.stringify(locations));
}