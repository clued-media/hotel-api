var w = require('./../utility/write');

module.exports = function() {
  var categories = ["Single Room", "Double Room", "Triple Room", "Quadruple Room", "Quintuple Room"];
  var all_rooms = [];
  var id;
  for (id = 0; id < 999; id++) {
    var formatted_data = {};
    var catIndex = Math.floor(Math.random() * categories.length);

    formatted_data = {
      id: id,
      room_no: id + 1,
      description: "awesome room",
      category: categories[catIndex],
      size: parseInt(Math.floor(Math.random() * 55) + 15),
      capacity: catIndex + 1,
      price: parseFloat((Math.random() * 200 + 20).toFixed(2)),
    }
    all_rooms.push(formatted_data);
  }
  w("./rooms.json", JSON.stringify(all_rooms));
}