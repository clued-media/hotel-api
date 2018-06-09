'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');

function Reviews() {
  var dbc = require('../components/db_client')('reviews');
  var reviews = router(dbc);

  reviews.get('/:id', (req, res, next) => {
    var entry = dbc.find(req.params.id);

    var json = jsonld.createResource(req.originalUrl, 'Review');
    json['date'] = entry.date;
    json['rating'] = entry.rating;
    json['comment'] = entry.comment;
    json['user'] = entry.user;
    json['hotel'] = entry.hotel;

    res.send(json);
    next();
  });

  return reviews;
}

module.exports = Reviews();