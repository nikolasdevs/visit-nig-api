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

  const { name, address, state, region, description, type, imageUrls, slug } =
    req.body;

  if (
    !name ||
    !address ||
    !description ||
    !state ||
    !region ||
    !type ||
    !slug
  ) {
    return handleResponse(res, 400, "Kindly fill in missing information");
  }

  try {
    const existingName = await prisma.tourism.findUnique({
      where: { name },
    });
    if (existingName) {
      return handleResponse(
        res,
        409,
        "Tour with this name already exists"
      );
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
        type,
        slug,
      },
    });
    handleResponse(res, 201, `${newTour.type} created successfully`, newTour);
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
    handleResponse(
      res,
      200,
      "Tour fetched successfully",
      tours
    );
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
    return handleResponse(
      res,
      200,
      "Tour fetched successfully",
      tour
    );
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const getTourByState = async (req, res, next) => {
  try {
    const { state } = req.params;

    // Validate type
    if (!state) {
      return handleResponse(res, 400, "State is required");
    }

    // Map type to database value
    const accommodation_type = {
      hotel: "Hotel",
      apartment: "Apartment",
      airbnb: "Airbnb",
      resort: "Resort",
    };

    const dbType = accommodation_type[type];
    if (!dbType) {
      return handleResponse(res, 400, "Invalid accommodation type provided");
    }

    // Fetch accommodations
    const accommodations = await prisma.accommodation.findMany({
      where: { type: dbType },
    });

    if (!accommodations || accommodations.length === 0) {
      return handleResponse(
        res,
        404,
        "No accommodations found for the specified type"
      );
    }

    return handleResponse(
      res,
      200,
      "Accommodations fetched successfully",
      accommodations
    );
  } catch (err) {
    return next(err);
  }
};

export const updateAcc = async (req, res, next) => {
  const { id } = req.params;
  const { name, address, state, region, description, type, slug } = req.body;

  if (!id) {
    return handleResponse(res, 400, "Accommodation ID is required");
  }

  if (
    !name ||
    !address ||
    !state ||
    !region ||
    !description ||
    !type ||
    !slug
  ) {
    return handleResponse(res, 400, "Kindly fill in missing information");
  }

  try {
    const existingAcc = await prisma.accommodation.findUnique({
      where: { id },
    });

    if (!existingAcc) {
      return handleResponse(res, 404, "Accommodation not found");
    }

    const updatedAcc = await prisma.accommodation.update({
      where: { id },
      data: { name, slug, address, state, region, description, type },
    });

    handleResponse(res, 200, "Accommodation updated successfully", updatedAcc);
  } catch (err) {
    next(err);
  }
};

export const deleteAcc = async (req, res, next) => {
  const id = req.params.id;
  if (!id) return handleResponse(res, 400, "Accommodation ID is required");

  try {
    const deletedAcc = await prisma.accommodation.delete({
      where: { id },
    });
    if (!deletedAcc) return handleResponse(res, 404, "Accommodation not found");
    handleResponse(res, 200, "Accommodation deleted successfully", deletedAcc);
  } catch (err) {
    next(err);
  }
};
