const express = require("express");
const app = express();
let parks = [
  {
    id: 1,
    name: "Yellowstone National Park",
    facilities: ["campgrounds", "visitor-center", "trails"],
  },
  {
    id: 2,
    name: "Zion National Park",
    facilities: ["trails", "visitor-center"],
  },
];
let visitors = [
  { id: 1, name: "John Doe", pastReservations: [1], upcomingReservations: [2] },
  { id: 2, name: "Jane Smith", pastReservations: [], upcomingReservations: [] },
];
let reservations = [
  { id: 1, parkId: 1, visitorId: 1, date: "2023-09-01" },
  { id: 2, parkId: 2, visitorId: 1, date: "2023-10-01" },
];
// Your routing, authentication, and controller code goes here
app.get("/parks", (request, response) => {
  response.status(200).json(parks);
});
app.get("/parks/:id", (request, response) => {
  const parkId = parseInt(request.params.id);
  const park = parks.find((p) => p.id === parkId);
  if (park) {
    response.status(200).json(park);
  } else {
    response.status(404).json("Park not found");
  }
});
app.get("/visitors", (request, response) => {
    response.status(200).json(visitors);
  });
  app.get("/visitors/:id", (request, response) => {
    const visitorId = parseInt(request.params.id);
    const visitor = visitors.find((v) => v.id === visitorId);
    if (visitor) {
      const pastReservationsWithDates = visitor.pastReservations.map(id => {
        return reservations.find(reservation => reservation.id === id);
      });
      const upcomingReservationsWithDates = visitor.upcomingReservations.map(id => {
        return reservations.find(reservation => reservation.id === id);
      });
      const visitorWithReservations = {
        id: visitor.id,
        name: visitor.name,
        pastReservations: pastReservationsWithDates,
        upcomingReservations: upcomingReservationsWithDates
      };
      response.status(200).json(visitorWithReservations);
    } else {
      response.status(404).json("Visitor not found");
    }
  });
app.get("/reservations", (request, response) => {
  response.status(200).json(reservations);
});
app.get("/reservations/:id", (request, response) => {
  const reservationId = parseInt(request.params.id);
  const reservation = reservations.find((r) => r.id === reservationId);
  if (reservation) {
    response.status(200).json(reservation);
  } else {
    response.status(404).json("Reservation not found");
  }
});
app.listen(5000, () => {
  console.log("National Park Visitor System is running on port 5000");
});