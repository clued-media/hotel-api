'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');

function Media() {
  var dbc = require('../components/db_client')('media');
  var media = router(dbc);

  media.get('/:id', (req, res, next) => {
    var entry = dbc.find(req.params.id);

    if (entry) {
      var json = jsonld.createResource(req.originalUrl, 'Media');
      json['name'] = entry.name;
      json['description'] = entry.description;
      json['url'] = entry.url;
      json['width'] = entry.width;
      json['height'] = entry.height

      res.send(json);
    } else {
      res.sendStatus(404)
    }

    next();
  });

  media.post('/', (req, res, next) => {
    dbc.create(req.body, (entity) => {
      if (entity) res.sendStatus(201);
      else res.sendStatus(500);
    });

    next();
  });

  media.put('/:id', (req, res, next) => {
    req.body['id'] = req.params.id;

    dbc.update(req.body, (entity) => {
      if (entity) res.sendStatus(200);
      else res.sendStatus(500);
    });

    next();
  });

  return media;
}

module.exports = Media();