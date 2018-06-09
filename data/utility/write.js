var fs = require('fs');
var path = require('path');

module.exports = (name, json) => {
  var destDir = path.join(__dirname, '..');

  fs.writeFile(path.join(destDir, name + '.json'), json, 'utf8', err => {
    if (err) {
      console.log('An error occured while writing ' + name + ' to File.');
      return console.log(err);
    }

    console.log('\'' + name + '\' has been saved.');
  });
};