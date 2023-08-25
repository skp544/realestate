const express = require("express");
const {
  createUser,
  bookVisit,
  allBookings,
  cancelBooking,
  toFav,
  getAllFavResidency,
} = require("../controllers/userController");

const jwtCheck = require("../config/auth0Config");

const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id", jwtCheck, bookVisit);
router.get("/allBookings", allBookings);
router.post("/remove-booking/:id", jwtCheck, cancelBooking);
router.post("/to-fav/:rid", jwtCheck, toFav);
router.post("/all-fav", jwtCheck, getAllFavResidency);

module.exports = router;
