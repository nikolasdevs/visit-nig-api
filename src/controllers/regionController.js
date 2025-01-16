import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handleResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const createRegion = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return handleResponse(res, 400, "Kindly fill in missing information");
  }

  try {
    const existingName = await prisma.region.findFirst({
      where: { name },
    });
    if (existingName) {
      return handleResponse(res, 409, "Region with this name already exists");
    }

    const newRegion = await prisma.region.create({
      data: {
        name,
      },
    });
    handleResponse(
      res,
      201,
      `${newRegion.name} created successfully`,
      newRegion
    );
  } catch (err) {
    next(err);
  }
};

export const getAllRegion = async (req, res, next) => {
  try {
    const regions = await prisma.region.findMany();
    if (!regions || regions.length === 0) {
      return handleResponse(res, 404, "No region found");
    }
    handleResponse(res, 200, "Region fetched successfully", regions);
  } catch (err) {
    next(err);
  }
};

export const getRegionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return handleResponse(res, 400, "A valid ID is required");
    }

    const regionId = parseInt(id, 10);

    const region = await prisma.region.findUnique({
      where: { id: regionId },
      include: {
        // include any related models if needed
      },
    });

    if (!region) {
      return handleResponse(res, 404, "Region not found");
    }
    return handleResponse(res, 200, "Region fetched successfully", region);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const updateRegion = async (req, res, next) => {
  const { name } = req.body;

  const { id } = req.params;
  if (!id) return handleResponse(res, 400, "Region ID is required");

  if (!name) {
    return handleResponse(res, 400, "Kindly fill in missing information");
  }

  const regionId = parseInt(id, 10);

  if (!id || isNaN(id)) {
    return handleResponse(res, 400, "A valid ID is required");
  }
  try {
    const existingRegion = await prisma.region.findUnique({
      where: { id: regionId },
    });

    if (!existingRegion) {
      return handleResponse(res, 404, "Region not found");
    }

    const updatedRegion = await prisma.region.update({
      where: { id: regionId },
      data: {
        name,
      },
    });

    handleResponse(res, 200, "Region updated successfully", updatedRegion);
  } catch (err) {
    next(err);
  }
};

export const deleteRegion = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return handleResponse(res, 400, "Region ID is required");

  const regionId = parseInt(id, 10);

  if (!id || isNaN(id)) {
    return handleResponse(res, 400, "A valid ID is required");
  }

  try {
    const deletedRegion = await prisma.region.delete({
      where: { id: regionId },
    });
    if (!deleteRegion) return handleResponse(res, 404, "Region not found");
    handleResponse(res, 200, "Region deleted successfully", deletedRegion);
  } catch (err) {
    next(err);
  }
};
