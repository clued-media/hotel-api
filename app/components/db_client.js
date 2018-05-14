'use strict';

module.exports = db => {
  var all = function() {
    return db;
  };

  var find = function(id) {
    return db[id];
  };

  var create = function(entity) {

  };

  var update = function(id, entity) {
    db[id] = entity;
  };

  var remove = function(id) {
    delete db[id];
  };

  return {
    all,
    find,
    create,
    update,
    remove
  };
};