const asyncHandler = require("express-async-handler");
const prisma = require("../config/prismaConfig");

exports.createUser = asyncHandler(async (req, res) => {
  // console.log("creating user");
  let { email } = req.body;

  try {
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userExists) {
      res.status(201).json({
        status: false,
        message: "User Exists",
      });
    }

    const user = await prisma.user.create({ data: req.body });

    return res.status(200).json({
      status: true,
      message: "User successfully created",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Error in user creation",
    });
  }
});

exports.bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;

  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res.status(400).json({
        status: false,
        message: "This residency is already booked by you",
      });
    } else {
      const bookedVisit = await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });

      return res.status(200).json({
        status: true,
        message: "The visit is booked successfully",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Error in book visit",
    });
  }
});

exports.allBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    return res.status(200).json({
      status: true,
      message: "All bookings",
      bookings,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Error in book visit",
    });
  }
});

exports.cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      return res.status(404).json({
        status: false,
        message: "Booking Not Found",
      });
    } else {
      user.bookedVisits.splice(index, 1);
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });

      return res.status(200).json({
        status: true,
        message: "Booking Cancelled Successfully",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Error in cancel booking",
    });
  }
});

exports.toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user.favResidenciesID.includes(rid)) {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),
          },
        },
      });

      return res.status(200).json({
        status: true,
        message: "Removed from favorites",
        updatedUser,
      });
    } else {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: rid,
          },
        },
      });

      return res.status(200).json({
        status: true,
        message: "Added to favorites",
        updatedUser,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Error in to fav controller",
    });
  }
});

exports.getAllFavResidency = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const favResidency = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });

    return res.status(200).json({
      status: true,
      message: "Favorite residencies found",
      favResidency,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Error in to get all favorite residency",
    });
  }
});
