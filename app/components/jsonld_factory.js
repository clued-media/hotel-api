var config = require('../../config');

function JsonLdFactory() {
  var createResource = function (url, type) {
    return {
      '@context': config.ns + '/contexts/' + type.toLowerCase(),
      '@id': url,
      '@type': type
    }
  };

  var createCollection = function (url, type, entries) {
    var json = {
      '@context': config.ns + '/contexts/collection',
      '@type': 'Collection',
      '@id': url,
      'members': []
    };

    entries.forEach(entry => {
      json.members.push({
        '@id': entry.id ? entry.id : entry,
        '@type': 'vocab:' + type
      });
    });

    return json;
  };

  return {
    createResource,
    createCollection
  };
}

module.exports = JsonLdFactory();