var w = require('./../utility/write');

module.exports = function(){
	var all_media = [];
	var id;
	for(id=0; id<999; id++){
		var formatted_data = {};
		formatted_data = {
			id: id,
			name: "media x",
			description: ".. descriptive text ..",
			url: "some url",
			width: 1600,
			height: 900
		}
		all_media.push(formatted_data);
	}
	w("./media.json", JSON.stringify(all_media));
}
