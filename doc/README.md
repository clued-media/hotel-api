# REST API

This REST API represents a *Hotel Booking API* consisting of 10 different resources, each one accessible by its corresponding name (in plural form).
All supported HTTP calls with their meanings and JSON resource objects are listed below.

## Table of Contents
- [Users](#users)
- [Hotels](#hotels)
- [Rooms](#rooms)
- [Bookings](#bookings)
- [Payments](#payments)
- [Reviews](#reviews)
- [Facilities](#facilities)
- [Facility Categories](#facility-categories)
- [Locations](#locations)
- [Media (Photos)](#media-photos)

## Users
| URI                 | HTTP   | Body  | Description                |
| :------------------ | :----: | :---: | :------------------------- |
| /users              | GET    | -     | Get a list of all users    |
| /users/:id          | GET    | -     | Get details of a user      |
| /users              | POST   | JSON  | Add a new user             |
| /users              | PUT    | JSON  | Update a user              |
| /users/:id          | DELETE | -     | Delete a user              |
| /users/:id/bookings | GET    | -     | Get all bookings of a user |
| /users/:id/payments | GET    | -     | Get all payments of a user |
| /users/:id/reviews  | GET    | -     | Get all reviews of a user  |

```javascript
{
    "id": integer,
    "username": string,
    "email": string,
    "password": string,
    "name": string,
    "bookings": [Booking, Booking,...],
    "payments": [Payment, Payment,...],
    "reviews": [Review, Review,...]
}
```

## Hotels
| URI                    | HTTP   | Body  | Description                                      |
| :--------------------- | :----: | :---: | :----------------------------------------------- |
| /hotels                | GET    | -     | Get a list of all hotels                         |
| /hotels/:id            | GET    | -     | Get details of a hotel                           |
| /hotels                | POST   | JSON  | Add a new hotel                                  |
| /hotels                | PUT    | JSON  | Update a hotel                                   |
| /hotels/:id            | DELETE | -     | Delete a hotel                                   |
| /hotels/:id/users      | GET    | -     | Get a list of all users staying in a hotel       |
| /hotels/:id/rooms      | GET    | -     | Get a list of all rooms of a hotel               |
| /hotels/:id/bookings   | GET    | -     | Get a list of all current bookings of a hotel    |
| /hotels/:id/payments   | GET    | -     | Get a list of all completed payments of a hotel  |
| /hotels/:id/reviews    | GET    | -     | Get a list of all user reviews of a hotel        |
| /hotels/:id/facilities | GET    | -     | Get a list of all facilities provided by a hotel |
| /hotels/:id/media      | GET    | -     | Get a list of all media (photos) of a hotel      |

```javascript
{
    "id": integer,
    "name": string,
    "description": string,
    "location": Location,
    "star_rating": float,
    "user_rating": float,
    "guests": [User, User,...],
    "rooms": [Room, Room,...],
    "bookings": [Booking, Booking,...],
    "payments": [Payment, Payment,...],
    "reviews": [Review, Review,...],
    "facilities": [Facility, Facility,...],
    "media": [Media, Media,...]
}
```

## Rooms
| URI        | HTTP   | Body  | Description                   |
| :--------- | :----: | :---: | :---------------------------- |
| /rooms     | GET    | -     | Get a list of all hotel rooms |
| /rooms/:id | GET    | -     | Get details of a hotel room   |
| /rooms     | POST   | JSON  | Add a new hotel room          |
| /rooms     | PUT    | JSON  | Update a hotel room           |
| /rooms/:id | DELETE | -     | Delete a hotel room           |

```javascript
{
    "id": integer,
    "room_no": string,
    "description": string,
    "category": string,
    "facilities": [Facility, Facility,...],
    "size": integer,
    "capacity": integer,
    "price": float
}
```

## Bookings
| URI                 | HTTP   | Body  | Description                          |
| :------------------ | :----: | :---: | :----------------------------------- |
| /bookings           | GET    | -     | Get a list of all bookings           |
| /bookings/:id       | GET    | -     | Get details of a booking             |
| /bookings           | POST   | JSON  | Add a new booking                    |
| /bookings           | PUT    | JSON  | Update a booking                     |
| /bookings/:id       | DELETE | -     | Delete a booking                     |
| /bookings/:id/rooms | GET    | -     | Get a list of all rooms of a booking |

```javascript
{
    "id": integer,
    "date": date,
    "arrival_date": date,
    "departure_date": date,
    "user_id": integer,
    "rooms": [Room, Room,...]
}
```

## Payments
| URI           | HTTP   | Body  | Description                |
| :------------ | :----: | :---: | :------------------------- |
| /payments     | GET    | -     | Get a list of all payments |
| /payments/:id | GET    | -     | Get details of a payment   |
| /payments     | POST   | JSON  | Add a new payment          |
| /payments     | PUT    | JSON  | Update a payment           |
| /payments/:id | DELETE | -     | Delete a payment           |

```javascript
{
    "id": integer,
    "date": date,
    "payment_method": string,
    "amount": float,
    "booking_id": integer
}
```

## Reviews
| URI          | HTTP   | Body  | Description                     |
| :----------- | :----: | :---: | :------------------------------ |
| /reviews     | GET    | -     | Get a list of all hotel reviews |
| /reviews/:id | GET    | -     | Get details of a hotel review   |
| /reviews     | POST   | JSON  | Add a new hotel review          |
| /reviews     | PUT    | JSON  | Update a hotel review           |
| /reviews/:id | DELETE | -     | Delete a hotel review           |

```javascript
{
    "id": integer,
    "date": date,
    "rating": integer,
    "comment": string,
    "user_id": integer,
    "hotel_id": integer
}
```

## Facilities
| URI             | HTTP   | Body  | Description                        |
| :-------------- | :----: | :---: | :--------------------------------- |
| /facilities     | GET    | -     | Get a list of all hotel facilities |
| /facilities/:id | GET    | -     | Get details of a hotel facility    |
| /facilities     | POST   | JSON  | Add a new hotel facility           |
| /facilities     | PUT    | JSON  | Update a hotel facility            |
| /facilities/:id | DELETE | -     | Delete a hotel facility            |

```javascript
{
    "id": integer,
    "name": string,
    "category_id": integer
}
```

## Facility Categories
| URI             | HTTP   | Body  | Description                           |
| :-------------- | :----: | :---: | :------------------------------------ |
| /categories     | GET    | -     | Get a list of all facility categories |
| /categories/:id | GET    | -     | Get details of a facility category    |
| /categories     | POST   | JSON  | Add a new facility category           |
| /categories     | PUT    | JSON  | Update a facility category            |
| /categories/:id | DELETE | -     | Delete a facility category            |

```javascript
{
    "id": integer,
    "name": string
}
```

## Locations
| URI            | HTTP   | Body  | Description                       |
| :------------- | :----: | :---: | :-------------------------------- |
| /locations     | GET    | -     | Get a list of all hotel locations |
| /locations/:id | GET    | -     | Get details of a hotel location   |
| /locations     | POST   | JSON  | Add a new hotel location          |
| /locations     | PUT    | JSON  | Update a hotel location           |
| /locations/:id | DELETE | -     | Delete a hotel location           |

```javascript
{
    "id": integer,
    "name": string,
    "longitude": float,
    "latitude": float,
    "city": string,
    "country": string,
    "country_code": string
}
```

## Media (Photos)
| URI        | HTTP   | Body  | Description                   |
| :--------- | :----: | :---: | :---------------------------- |
| /media     | GET    | -     | Get a list of all hotel media |
| /media/:id | GET    | -     | Get details of a hotel media  |
| /media     | POST   | JSON  | Add a new hotel media         |
| /media     | PUT    | JSON  | Update a hotel media          |
| /media/:id | DELETE | -     | Delete a hotel media          |

```javascript
{
    "id": integer,
    "name": string,
    "description": string,
    "url": string,
    "width": integer,
    "height": integer
}
```
