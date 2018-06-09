'use strict';

var fs = require('fs');
var path = require('path');
var config = require('../../config');

module.exports = (dbName) => {
  var dbPath = path.resolve('./data/' + dbName + '.json');
  var db = require(dbPath);

  function _updateDB() {
    try {
      fs.writeFileSync(dbPath, JSON.stringify(db));

      return true;
    } catch (err) {
      console.log(err);
    }

    return false;
  }

  var all = function () {
    return db;
  };

  var find = function (id) {
    return id < 0 || id >= db.length ? {} : db[id];
  };

  var create = function (entity) {
    entity['id'] = config.ns + '/' + dbName + '/' + db.length;
    db.push(entity);

    return _updateDB();
  };

  var update = function (entity) {
    if (entity.id < 0 || entity.id >= db.length) {
      return false;
    }

    db[entity.id] = entity;

    return _updateDB();
  };

  var remove = function (id) {
    if (id < 0 || id >= db.length) {
      return false;
    }

    db[id] = {};

    return _updateDB();
  };

  return {
    all,
    find,
    create,
    update,
    remove
  };
};