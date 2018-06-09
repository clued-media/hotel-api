var w = require('../utility/write');
var data = require('../raw/hotels_usa_2.json');
var config = require('../../config');

module.exports = function () {
  var collection = {
    '@context': config.ns + '/contexts/collection',
    '@type': 'Collection',
    '@id': config.ns + '/locations',
    members: []
  };
  var locations = [];
  var i = 0;

  data.forEach(function (entry) {
    var formattedData = {
      '@context': config.ns + '/contexts/location',
      '@id': config.ns + '/locations/' + i,
      '@type': 'Location',
      longitude: parseFloat(entry.longitude),
      latitude: parseFloat(entry.latitude),
      city: entry.city,
      country: entry.country,
      country_code: 'USA'
    };

    // Add only new locations.
    if (i === 0 || (formattedData.longitude !== locations[i - 1].longitude && formattedData.latitude !== locations[i - 1].latitude)) {
      locations.push(formattedData);
      collection.members.push({
        '@id': config.ns + '/locations/' + i,
        '@type': 'vocab:Location'
      });
      i++;
    }
  });

  w('locations', JSON.stringify(locations));
  w('collections/locations', JSON.stringify(collection));
}