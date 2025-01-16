import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handleResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const createBnb = async (req, res, next) => {
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
    const existingName = await prisma.bnb.findUnique({
      where: { name },
    });
    if (existingName) {
      return handleResponse(res, 409, "Bnb with this name already exists");
    }

    const newBnb = await prisma.bnb.create({
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
    handleResponse(res, 201, `${newBnb.name} created successfully`, newBnb);
  } catch (err) {
    next(err);
  }
};

export const getAllBnb = async (req, res, next) => {
  try {
    const bnbs = await prisma.bnb.findMany();
    if (!bnbs || bnbs.length === 0) {
      return handleResponse(res, 404, "No bnb found");
    }
    handleResponse(res, 200, "bnb fetched successfully", bnbs);
  } catch (err) {
    next(err);
  }
};

export const getBnbById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return handleResponse(res, 400, "Id is required");
    }

    const bnb = await prisma.bnb.findUnique({
      where: { id },
      include: {
        // include any related models if needed
      },
    });

    if (!bnb) {
      return handleResponse(res, 404, "Bnb not found");
    }
    return handleResponse(res, 200, "Bnb fetched successfully", bnb);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const updateBnb = async (req, res, next) => {
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
    return handleResponse(res, 400, "Bnb ID is required");
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
    const existingBnb = await prisma.bnb.findUnique({
      where: { id },
    });

    if (!existingBnb) {
      return handleResponse(res, 404, "Bnb not found");
    }

    const updatedBnb = await prisma.bnb.update({
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

    handleResponse(res, 200, "Bnb updated successfully", updatedBnb);
  } catch (err) {
    next(err);
  }
};

export const deleteBnb = async (req, res, next) => {
  const id = req.params.id;
  if (!id) return handleResponse(res, 400, "Bnb ID is required");

  try {
    const deletedBnb = await prisma.bnb.delete({
      where: { id },
    });
    if (!deletedBnb) return handleResponse(res, 404, "Bnb not found");
    handleResponse(res, 200, "Bnb deleted successfully", deletedBnb);
  } catch (err) {
    next(err);
  }
};
