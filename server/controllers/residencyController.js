const asyncHandler = require("express-async-handler");
const prisma = require("../config/prismaConfig");

exports.createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    return res.status(200).json({
      status: true,
      message: "A residency successfully created.",
      residency,
    });
  } catch (error) {
    console.log(error);

    if (error.code === "P2002") {
      return res.status(403).json({
        status: false,
        message: "A residency with address already exists.",
      });
    }

    return res.status(400).json({
      status: false,
      message: "Error in residency creation",
    });
  }
});

exports.getAllResidencies = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      status: true,
      message: "Residencines is found",
      residencies,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Error in get residencies.",
    });
  }
});

exports.getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });

    return res.status(200).json({
      status: true,
      message: "Residency is found",
      residency,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Error in get residency.",
    });
  }
});
