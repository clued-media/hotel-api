var fs = require('fs');
var mod_path = './base/';

fs.readdirSync(mod_path).forEach(file => {
	var module = require(mod_path + file);
	module();
})
