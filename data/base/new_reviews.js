var w = require('./../utility/write');

module.exports = function(){
	all_reviews = [];
	var id;
	for(id=0; id<999; id++){
		var formatted_data = {};
		formatted_data = {
			id: id,
			date: new Date(),
			rating: Math.floor(Math.random() * 5) + 1,
			comment: "this hotel was ...",
			user_id: id,
			hotel_id: id%347,
		}
		all_reviews.push(formatted_data);
	}
	w("./reviews.json", JSON.stringify(all_reviews));
}
