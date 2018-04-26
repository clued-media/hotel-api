var w = require('./../utility/write');

module.exports = function(){
	var formatted_data = {};
	var id;
	for(id=0; id<999; id++){
		formatted_data[id] = {
			name: "media x",
			description: ".. descriptive text ..",
			url: "some url",
			width: 1600,
			height: 900
		}

	}
	w("./media.json", JSON.stringify(formatted_data));
}
