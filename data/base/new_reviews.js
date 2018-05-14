var w = require('./../utility/write');
var data = require('./../raw/hotels_usa_2.json');

module.exports = function(){
	all_reviews = [];
	var id;
	for(id=0; id<35000; id++){
		var formatted_data = {};
		formatted_data = {
			id: id,
			date: data[id]["reviews"]["date"],
			rating: data[id]["reviews"]["rating"],
			comment: data[id]["reviews"]["text"],
			user_id: id%999,
			hotel_id: id%35000,
		}
		all_reviews.push(formatted_data);
	}
	w("./reviews.json", JSON.stringify(all_reviews));
}
