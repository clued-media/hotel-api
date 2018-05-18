var w = require('../utility/write');
var data = require('../raw/hotels_usa_2.json');

module.exports = function() {
  var locations = [];
  var i = 0;

  data.forEach(function(entry) {
    var formatted_data = {
      id: i,
      longitude: entry.longitude,
      latitude: entry.latitude,
      city: entry.city,
      country: entry.country,
      country_code: "USA"
    };

    // Add only new locations.
    if (i == 0 || (formatted_data.longitude !== locations[i - 1].longitude && formatted_data.latitude !== locations[i - 1].latitude)) {
      locations.push(formatted_data);
      i++;
    }
  });

  w("./locations.json", JSON.stringify(locations));
}