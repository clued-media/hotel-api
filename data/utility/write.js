var fs = require('fs');

module.exports = function(name, json){
	fs.writeFile(name, json, 'utf8', function (err) {
		if (err) {
			console.log("An error occured while writing " + name + " to File.");
			return console.log(err);
		}
		console.log(name + " has been saved.");
	});
};
