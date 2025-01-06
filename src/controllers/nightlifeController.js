import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handleResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const createNightlife = async (req, res, next) => {
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
    const existingName = await prisma.nightlife.findUnique({
      where: { name },
    });
    if (existingName) {
      return handleResponse(
        res,
        409,
        "nightlife with this name already exists"
      );
    }

    // const imageUrls = req.files.map((file) => file.path);

    const newNightlife = await prisma.nightlife.create({
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
    handleResponse(
      res,
      201,
      `${newNightlife.type} created successfully`,
      newNightlife
    );
  } catch (err) {
    next(err);
  }
};

export const getAllNightlife = async (req, res, next) => {
  try {
    const nightlifes = await prisma.nightlife.findMany();
    if (!nightlifes || nightlifes.length === 0) {
      return handleResponse(res, 404, "No nightlifes found");
    }
    handleResponse(res, 200, "nightlife fetched successfully", nightlifes);
  } catch (err) {
    next(err);
  }
};

export const getNightlifeBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return handleResponse(res, 400, "Slug is required");
    }
    // const names = name.toLowerCase();

    const nightlife = await prisma.nightlife.findFirst({
      where: { slug },
      include: {
        // include any related models if needed
      },
    });

    if (!nightlife) {
      return handleResponse(res, 404, "Nightlife not found");
    }
    return handleResponse(
      res,
      200,
      "nightlife fetched successfully",
      nightlife
    );
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const getNightlifeByType = async (req, res, next) => {
  try {
    const { type } = req.params;

    // Validate type
    if (!type) {
      return handleResponse(res, 400, "nightlife type is required");
    }

    // Map type to database value
    const nightlife_type = {
      club: "Club",
      lounge: "Lounge",
      bar_cafe: "Cafe",
    };

    const dbType = nightlife_type[type];
    if (!dbType) {
      return handleResponse(res, 400, "Invalid nightlife type provided");
    }

    // Fetch nightlifes
    const nightlifes = await prisma.nightlife.findMany({
      where: { type: dbType },
    });

    if (!nightlifes || nightlifes.length === 0) {
      return handleResponse(
        res,
        404,
        "No nightlife found for the specified type"
      );
    }

    return handleResponse(
      res,
      200,
      "nightlifes fetched successfully",
      nightlifes
    );
  } catch (err) {
    return next(err);
  }
};

export const updateNightlife = async (req, res, next) => {
  const { id } = req.params;
  const { name, address, state, region, description, type, slug } = req.body;

  if (!id) {
    return handleResponse(res, 400, "nightlife ID is required");
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
    const existingNightlife = await prisma.nightlife.findUnique({
      where: { id },
    });

    if (!existingNightlife) {
      return handleResponse(res, 404, "nightlife not found");
    }

    const updatedNightlife = await prisma.nightlife.update({
      where: { id },
      data: { name, slug, address, state, region, description, type },
    });

    handleResponse(
      res,
      200,
      "nightlife updated successfully",
      updatedNightlife
    );
  } catch (err) {
    next(err);
  }
};

export const deleteNightlife = async (req, res, next) => {
  const id = req.params.id;
  if (!id) return handleResponse(res, 400, "nightlife ID is required");

  try {
    const deletedNightlife = await prisma.nightlife.delete({
      where: { id },
    });
    if (!deletedNightlife)
      return handleResponse(res, 404, "nightlife not found");
    handleResponse(
      res,
      200,
      "nightlife deleted successfully",
      deletedNightlife
    );
  } catch (err) {
    next(err);
  }
};
