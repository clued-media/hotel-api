var w = require('./../utility/write');

module.exports = function(){
	var all_payments = [];
	var id;
	for(id=0; id<999; id++){
		var formatted_data = {};
		formatted_data = {
			id: id,
			date: new Date(),
			payment_method: "paypal",
			amount: -1,
			booking_id: -1,
		}
		all_payments.push(formatted_data);
	}
	w("./payments.json", JSON.stringify(all_payments));
}
