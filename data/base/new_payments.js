var w = require('./../utility/write');

module.exports = function(){
	var formatted_data = {};
	var id;
	for(id=0; id<999; id++){
		formatted_data[id] = {
			date: new Date(),
			payment_method: "paypal",
			amount: -1,
			booking_id: -1,
		}

	}

	w("./payments.json", JSON.stringify(formatted_data));

	console.log(formatted_data);
}
