var config = require('../../config');

function JsonLdFactory() {
  var createResource = function (url, type) {
    return {
      '@context': config.ns + '/contexts/' + type.toLowerCase(),
      '@id': url,
      '@type': type
    }
  };

  var createCollection = function (url, entries) {
    return {
      '@context': config.ns + '/contexts/collection',
      '@type': 'Collection',
      '@id': url,
      'members': entries
    }
  };

  return {
    createResource,
    createCollection
  };
}

module.exports = JsonLdFactory();