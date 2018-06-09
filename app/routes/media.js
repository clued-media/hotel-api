'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');

function Media() {
  var dbc = require('../components/db_client')('media');
  var media = router(dbc);

  media.get('/:id', (req, res, next) => {
    var entry = dbc.find(req.params.id);

    var json = jsonld.createResource(req.originalUrl, 'Media');
    json['name'] = entry.name;
    json['description'] = entry.description;
    json['url'] = entry.url;
    json['width'] = entry.width;
    json['height'] = entry.height

    res.send(json);
    next();
  });

  return media;
}

module.exports = Media();