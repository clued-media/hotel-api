'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');

function Categories() {
  var dbc = require('../components/db_client')('categories');
  var categories = router(dbc);

  categories.get('/:id', (req, res, next) => {
    var entry = dbc.find(req.params.id);

    var json = jsonld.createResource(req.originalUrl, 'Category');
    json['name'] = entry.name;

    res.send(json);
    next();
  });

  return categories;
}

module.exports = Categories();