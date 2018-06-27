var dbcHotels = require('./db_client')('hotels');
var dbcBookings = require('./db_client')('bookings');
var dbcRooms = require('./db_client')('rooms');
var dbcReviews = require('./db_client')('reviews');
var dbcUsers = require('./db_client')('users');

var config = require('../../config');

function HotelHandler() {
  var updateUser = function (user, cb) {
    var oldUser = dbcUsers.find(user.id);

    user['bookings'] = oldUser.bookings;
    user['reviews'] = oldUser.reviews;

    dbcUsers.update(user, cb);
  };

  var updateHotel = function (hotel, cb) {
    var oldHotel = dbcHotels.find(hotel.id);

    // Update single ID to URI.
    hotel.location = config.ns + '/locations/' + hotel.location;
    hotel['users'] = oldHotel.users;
    hotel['rooms'] = oldHotel.rooms;
    hotel['bookings'] = oldHotel.bookings;
    hotel['reviews'] = oldHotel.reviews;
    hotel['facilities'] = oldHotel.facilities;
    hotel['media'] = oldHotel.media;

    dbcHotels.update(hotel, cb);
  };

  var updateBooking = function (booking, cb) {
    var oldBooking = dbcBookings.find(booking.id);

    // Update single ID to URI.
    booking.user = config.ns + '/users/' + booking.user;
    booking['rooms'] = oldBooking.rooms;

    dbcBookings.update(booking, cb);
  };

  var addRoom = function (bookingId, roomId, cb) {
    // Get booking to add the room to.
    var booking = dbcBookings.find(bookingId);
    var room = dbcRooms.find(roomId);

    if (booking && room) {
      // Update single ID to URI.
      booking.rooms.push(room.id);

      dbcBookings.update(booking, (bookingEntity) => {
        if (bookingEntity) cb(bookingEntity);
        else cb();
      });
    } else cb();
  };

  var removeRoom = function (bookingId, roomId, cb) {
    // Get booking to add the room to.
    var booking = dbcBookings.find(bookingId);
    var room = dbcRooms.find(roomId);

    if (booking && room) {
      // Update single ID to URI.
      var roomIndex = booking.rooms.indexOf(room.id);

      if (roomIndex >= 0) {
        booking.rooms.splice(roomIndex, 1);
        dbcBookings.update(booking, (bookingEntity) => {
          if (bookingEntity) cb(bookingEntity);
          else cb();
        });
      } else cb();
    } else cb();
  };

  var createRoom = function (room, cb) {
    // Get hotel, to which the new room was added.
    var hotel = dbcHotels.find(room.hotel);

    if (hotel) {
      // Update single ID to URI.
      room.hotel = config.ns + '/hotels/' + room.hotel;

      dbcRooms.create(room, (roomEntity) => {
        if (roomEntity) {
          // Update hotel's rooms.
          hotel.rooms.push(roomEntity.id);

          dbcHotels.update(hotel, (hotelEntity) => {
            if (hotelEntity) cb(roomEntity);
            else cb();
          })
        } else cb();
      });
    } else cb();
  };

  var deleteRoom = function (roomId, cb) {
    var room = dbcRooms.find(roomId);
    var hotelId = parseInt(room.hotel.substring((config.ns + '/hotels/').length));
    // Get hotel, whose room is deleted.
    var hotel = dbcHotels.find(hotelId);

    if (room && hotel && dbcRooms.remove(roomId)) {
      // Update hotel's rooms.
      var roomIndex = hotel.rooms.indexOf(config.ns + '/rooms/' + roomId);

      if (roomIndex >= 0) {
        hotel.rooms.splice(roomIndex, 1);

        dbcHotels.update(hotel, (hotelEntity) => {
          if (hotelEntity) cb(roomId);
          else cb();
        });
      } else cb();
    } else cb();
  };

  var createReview = function (review, cb) {
    // Get user, to which the new review is added.
    var user = dbcUsers.find(review.user);
    // Get hotel, to which the new review is added.
    var hotel = dbcHotels.find(review.hotel);

    if (user && hotel) {
      // Update single IDs to URIs.
      review.user = config.ns + '/users/' + review.user;
      review.hotel = config.ns + '/hotels/' + review.hotel;

      dbcReviews.create(review, (reviewEntity) => {
        if (reviewEntity) {
          // Update user's reviews.
          user.reviews.push(reviewEntity.id);

          dbcUsers.update(user, (userEntity) => {
            if (userEntity) {
              // Update hotel's reviews.
              hotel.reviews.push(reviewEntity.id);

              dbcHotels.update(hotel, (hotelEntity) => {
                if (hotelEntity) cb(reviewEntity);
                else cb();
              });
            } else cb();
          });
        } else cb();
      });
    } else cb();
  };

  var deleteReview = function (reviewId, cb) {
    var review = dbcReviews.find(reviewId);
    // Get user, whose review is deleted.
    var userId = parseInt(review.user.substring((config.ns + '/users/').length));
    var user = dbcUsers.find(userId);
    // Get hotel, whose review is deleted.
    var hotelId = parseInt(review.hotel.substring((config.ns + '/hotels/').length));
    var hotel = dbcHotels.find(hotelId);

    if (review && user && hotel && dbcReviews.remove(reviewId)) {
      // Update user's reviews.
      var userIndex = user.reviews.indexOf(config.ns + '/reviews/' + reviewId);

      if (userIndex >= 0) {
        user.reviews.splice(userIndex, 1);

        dbcUsers.update(user, (userEntity) => {
          if (userEntity) {
            // Get hotel, whose review was deleted, and update its review list.
            var reviewIndex = hotel.reviews.indexOf(config.ns + '/reviews/' + reviewId);

            if (reviewIndex >= 0) {
              hotel.reviews.splice(reviewIndex, 1);

              dbcHotels.update(hotel, (hotelEntity) => {
                if (hotelEntity) cb(reviewId);
                else cb();
              });
            } else cb();
          } else cb();
        });
      } else cb();
    } else cb();
  };

  return {
    updateUser,
    updateHotel,
    updateBooking,
    addRoom,
    removeRoom,
    createRoom,
    deleteRoom,
    createReview,
    deleteReview
  };
}

module.exports = HotelHandler();