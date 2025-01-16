import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handleResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const createMotel = async (req, res, next) => {
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
    const existingName = await prisma.motels.findUnique({
      where: { name },
    });
    if (existingName) {
      return handleResponse(res, 409, "Motel with this name already exists");
    }

    const newMotel = await prisma.motels.create({
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
    handleResponse(res, 201, `${newMotel.name} created successfully`, newMotel);
  } catch (err) {
    next(err);
  }
};

export const getAllMotel = async (req, res, next) => {
  try {
    const motels = await prisma.motels.findMany();
    if (!motels || motels.length === 0) {
      return handleResponse(res, 404, "No motels found");
    }
    handleResponse(res, 200, "motels fetched successfully", motels);
  } catch (err) {
    next(err);
  }
};

export const getMotelById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return handleResponse(res, 400, "Id is required");
    }

    const motel = await prisma.motels.findUnique({
      where: { id },
      include: {
        // include any related models if needed
      },
    });

    if (!motel) {
      return handleResponse(res, 404, "Motel not found");
    }
    return handleResponse(res, 200, "Motel fetched successfully", motel);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const updateMotel = async (req, res, next) => {
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
    return handleResponse(res, 400, "motel ID is required");
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
    const existingMotel = await prisma.motels.findUnique({
      where: { id },
    });

    if (!existingMotel) {
      return handleResponse(res, 404, "Motel not found");
    }

    const updatedMotel = await prisma.motels.update({
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

    handleResponse(res, 200, "Motel updated successfully", updatedMotel);
  } catch (err) {
    next(err);
  }
};

export const deleteMotel = async (req, res, next) => {
  const id = req.params.id;
  if (!id) return handleResponse(res, 400, "Motel ID is required");

  try {
    const deletedMotel = await prisma.motels.delete({
      where: { id },
    });
    if (!deletedMotel) return handleResponse(res, 404, "motel not found");
    handleResponse(res, 200, "motel deleted successfully", deletedMotel);
  } catch (err) {
    next(err);
  }
};
