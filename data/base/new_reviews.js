var w = require('./../utility/write');

module.exports = function(){
	var formatted_data = {};
	var id;
	for(id=0; id<999; id++){
		formatted_data[id] = {
			date: new Date(),
			rating: "paypal",
			comment: "this hotel was ...",
			user_id: -1,
			hotel_id: -1,
		}

	}
	w("./reviews.json", JSON.stringify(formatted_data));
}
