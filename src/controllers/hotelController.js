import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handleResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const createHotel = async (req, res, next) => {
  const {
    name,
    address,
    state_id,
    region_id,
    description,
    price,
    imageUrls,
    accommodation_id,
    slug,
  } = req.body;

  if (
    !name ||
    !address ||
    !description ||
    !state_id ||
    !region_id ||
    !accommodation_id ||
    !price ||
    !slug
  ) {
    return handleResponse(res, 400, "Kindly fill in missing information");
  }

  try {
    const existingName = await prisma.hotels.findUnique({
      where: { name },
    });
    if (existingName) {
      return handleResponse(res, 409, "Hotel with this name already exists");
    }

    const newHotel = await prisma.hotels.create({
      data: {
        name,
        address,
        state_id,
        region_id,
        accommodation_id,
        description,
        price,
        imageUrls,
        slug,
      },
    });
    handleResponse(res, 201, `${newHotel.name} created successfully`, newHotel);
  } catch (err) {
    next(err);
  }
};

export const getAllHotel = async (req, res, next) => {
  try {
    const hotels = await prisma.hotels.findMany();
    if (!hotels || hotels.length === 0) {
      return handleResponse(res, 404, "No hotels found");
    }
    handleResponse(res, 200, "Hotels fetched successfully", hotels);
  } catch (err) {
    next(err);
  }
};

export const getHotelById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return handleResponse(res, 400, "Id is required");
    }

    const hotel = await prisma.hotels.findUnique({
      where: { id },
      include: {
        // include any related models if needed
      },
    });

    if (!hotel) {
      return handleResponse(res, 404, "Hotel not found");
    }
    return handleResponse(res, 200, "Hotel fetched successfully", hotel);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    address,
    state_id,
    region_id,
    accommodation_id,
    description,
    price,
    imageUrls,
    slug,
  } = req.body;

  if (!id) {
    return handleResponse(res, 400, "Hotel ID is required");
  }

  if (
    !name ||
    !address ||
    !description ||
    !state_id ||
    !region_id ||
    !accommodation_id ||
    !price ||
    !imageUrls ||
    !slug
  ) {
    return handleResponse(res, 400, "Kindly fill in missing information");
  }

  try {
    const existingHotel = await prisma.hotels.findUnique({
      where: { id },
    });

    if (!existingHotel) {
      return handleResponse(res, 404, "Hotel not found");
    }

    const updatedHotel = await prisma.hotels.update({
      where: { id },
      data: {
        name,
        address,
        state_id,
        region_id,
        accommodation_id,
        description,
        price,
        imageUrls,
        slug,
      },
    });

    handleResponse(res, 200, "Hotel updated successfully", updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  const id = req.params.id;
  if (!id) return handleResponse(res, 400, "Hotel ID is required");

  try {
    const deletedHotel = await prisma.hotels.delete({
      where: { id },
    });
    if (!deletedHotel) return handleResponse(res, 404, "Hotel not found");
    handleResponse(res, 200, "Hotel deleted successfully", deletedHotel);
  } catch (err) {
    next(err);
  }
};
