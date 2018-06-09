var w = require('../utility/write');
var data = require('../raw/hotels_usa_2.json');

module.exports = function () {
  var collection = {
    '@context': '/api/v1/contexts/collection',
    '@type': 'Collection',
    '@id': '/api/v1/locations',
    members: []
  };

  var locations = [];
  var i = 0;

  data.forEach(function (entry) {
    var formattedData = {
      '@context': '/api/v1/contexts/location',
      '@id': '/api/v1/locations/' + i,
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
        '@id': '/api/v1/locations/' + i,
        '@type': 'vocab:Location'
      });
      i++;
    }
  });

  w('locations', JSON.stringify(locations));
  w('collections/locations', JSON.stringify(collection));
}