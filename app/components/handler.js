var dbcHotels = require('./db_client')('hotels');
var dbcRooms = require('./db_client')('rooms');
var config = require('../../config');

function HotelHandler() {
  var createRoom = function (room, hotelId, cb) {
    room.hotel = config.ns + '/hotels/' + hotelId;

    dbcRooms.create(room, (roomEntity) => {
      if (roomEntity) {
        // Get hotel, to which the new room was added, and update its rooms list.
        var hotel = dbcHotels.find(hotelId);
        hotel.rooms.push(roomEntity.id);

        dbcHotels.update(hotel, (hotelEntity) => {
          if (hotelEntity) cb(roomEntity);
          else cb()
        })
      } else cb();
    });
  };

  var deleteRoom = function (roomId, cb) {
    var room = dbcRooms.find(roomId);

    if (room) {
      var hotelId = parseInt(room.hotel.substring((config.ns + '/hotels/').length));

      if (dbcRooms.remove(roomId)) {
        // Get hotel, to which the new room was added, and update its rooms list.
        var hotel = dbcHotels.find(hotelId);
        var roomIndex = hotel.rooms.indexOf(config.ns + '/rooms/' + roomId);
        hotel.rooms.splice(roomIndex, 1);

        dbcHotels.update(hotel, (hotelEntity) => {
          if (hotelEntity) cb();
          else cb();
        })
      } else {
        cb();
      }
    } else {
      cb();
    }
  }

  return {
    createRoom,
    deleteRoom
  };
}

module.exports = HotelHandler();