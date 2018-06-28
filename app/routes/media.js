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
      res.status(404).json('Not Found');
    }

    next();
  });

  media.post('/', (req, res, next) => {
    dbc.create(req.body, (entity) => {
      if (entity) res.status(201).send(entity);
      else res.status(500).json('Media not created successfully');
      next();
    });
  });

  media.put('/:id', (req, res, next) => {
    req.body['id'] = req.params.id;

    dbc.update(req.body, (entity) => {
      if (entity) res.status(200).send(entity);
      else res.status(500).json('Media not updated successfully');
      next();
    });
  });

  media.delete('/:id', (req, res, next) => {
    if (dbc.remove(req.params.id)) {
      res.status(200).json('OK');
    } else {
      res.status(500).json('Media not deleted successfully');
    }

    next();
  });

  return media;
}

module.exports = Media();