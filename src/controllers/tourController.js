import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handleResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const createTour = async (req, res, next) => {
  const { name, address, state, region, description, imageUrls, slug } =
    req.body;

  if (!name || !address || !description || !state || !region || !slug) {
    return handleResponse(res, 400, "Kindly fill in missing information");
  }

  try {
    const existingName = await prisma.tourism.findUnique({
      where: { name },
    });
    if (existingName) {
      return handleResponse(res, 409, "Tour with this name already exists");
    }

    // const imageUrls = req.files.map((file) => file.path);

    const newTour = await prisma.tourism.create({
      data: {
        name,
        address,
        state,
        region,
        description,
        imageUrls,
        slug,
      },
    });
    handleResponse(res, 201, `${newTour.name} created successfully`, newTour);
  } catch (err) {
    next(err);
  }
};

export const getAllTours = async (req, res, next) => {
  try {
    const tours = await prisma.tourism.findMany();
    if (!tours || tours.length === 0) {
      return handleResponse(res, 404, "No tourism found");
    }
    handleResponse(res, 200, "Tour fetched successfully", tours);
  } catch (err) {
    next(err);
  }
};

export const getTourBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return handleResponse(res, 400, "Slug is required");
    }
    // const names = name.toLowerCase();

    const tour = await prisma.tourism.findFirst({
      where: { slug },
      include: {
        // include any related models if needed
      },
    });

    if (!tour) {
      return handleResponse(res, 404, "Tour not found");
    }
    return handleResponse(res, 200, "Tour fetched successfully", tour);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const updateTour = async (req, res, next) => {
  const { slug } = req.params;
  const { name, address, state, region, description, imageUrls } = req.body;

  if (!slug) {
    return handleResponse(res, 400, "Tour Slug is required");
  }

  if (!name || !address || !state || !region || !description || !slug) {
    return handleResponse(res, 400, "Kindly fill in missing  information");
  }

  try {
    const existingTour = await prisma.tourism.findFirst({
      where: { slug },
    });

    if (!existingTour) {
      return handleResponse(res, 404, "Tourism not found");
    }

    const updatedTour = await prisma.tourism.update({
      where: { slug },
      data: { name, slug, address, state, region, description, imageUrls },
    });

    handleResponse(res, 200, "Tourism updated successfully", updatedTour);
  } catch (err) {
    next(err);
  }
};

export const deleteTour = async (req, res, next) => {
  const { id } = req.params

  if (!id) return handleResponse(res, 400, "Tourism id is required");

  try {
    const deletedTour = await prisma.tourism.delete({
      where: { id: id},
    });
    if (!deletedTour) return handleResponse(res, 404, "Tourism not found");
    handleResponse(res, 200, "Tourism deleted successfully", deletedTour);
  } catch (err) {
    next(err);
  }
};                                                                                                                                                                                                                