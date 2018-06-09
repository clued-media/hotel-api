module.exports = (function () {
  var config = {
    api: 'https://sws-group-7-hotel-api.herokuapp.com/api/v1'
  }

  /**
   * Returns an array with min...max unique random numbers in the range of 0...length.
   **/
  var fillArray = function (min, max, length, resource) {
    var set = new Set();
    var maxCount = Math.floor(Math.random() * (max - min + 1)) + min;

    for (var i = 0; i < maxCount; i++) {
      var id = Math.floor(Math.random() * length);
      set.add(config.api + '/' + resource + '/' + id);
    }

    return Array.from(set);
  }

  /**
   * Returns a random date from now to 1000 days in the future.
   **/
  var getDate = function (seed = new Date()) {
    return new Date(seed.getTime() + (Math.floor(Math.random() * 10) * 24 * 3600 * 1000));
  }

  return {
    config,
    fillArray,
    getDate
  };
}());