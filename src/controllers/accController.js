import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handleResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const createAcc = async (req, res, next) => {
  // upload.array("images", 5)(req, res, async (err) => {
  //   if (err) {
  //     return handleResponse(res, 400, err.message);
  //   }

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
    const existingName = await prisma.accommodation.findUnique({
      where: { name },
    });
    if (existingName) {
      return handleResponse(
        res,
        409,
        "Accommodation with this name already exists"
      );
    }

    // const imageUrls = req.files.map((file) => file.path);

    const newAcc = await prisma.accommodation.create({
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
    handleResponse(res, 201, `${newAcc.type} created successfully`, newAcc);
  } catch (err) {
    next(err);
  }
};

export const getAllAcc = async (req, res, next) => {
  try {
    const accommodations = await prisma.accommodation.findMany();
    if (!accommodations || accommodations.length === 0) {
      return handleResponse(res, 404, "No accommodations found");
    }
    handleResponse(
      res,
      200,
      "Accommodations fetched successfully",
      accommodations
    );
  } catch (err) {
    next(err);
  }
};

export const getAccBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return handleResponse(res, 400, "Slug is required");
    }
    // const names = name.toLowerCase();

    const accommodation = await prisma.accommodation.findFirst({
      where: { slug },
      include: {
        // include any related models if needed
      },
    });

    if (!accommodation) {
      return handleResponse(res, 404, "Accommodation not found");
    }
    return handleResponse(
      res,
      200,
      "Accommodation fetched successfully",
      accommodation
    );
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const getAccByType = async (req, res, next) => {
  try {
    const { type } = req.params;

    // Validate type
    if (!type) {
      return handleResponse(res, 400, "Accommodation type is required");
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
