import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handleResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const createShopping = async (req, res, next) => {
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
    const existingName = await prisma.shopping.findUnique({
      where: { name },
    });
    if (existingName) {
      return handleResponse(res, 409, "shopping with this name already exists");
    }

    // const imageUrls = req.files.map((file) => file.path);

    const newShopping = await prisma.shopping.create({
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
      `${newShopping.type} created successfully`,
      newShopping
    );
  } catch (err) {
    next(err);
  }
};

export const getAllShopping = async (req, res, next) => {
  try {
    const shoppings = await prisma.shopping.findMany();
    if (!shoppings || shoppings.length === 0) {
      return handleResponse(res, 404, "No shoppings found");
    }
    handleResponse(res, 200, "shopping fetched successfully", shoppings);
  } catch (err) {
    next(err);
  }
};

export const getShoppingBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return handleResponse(res, 400, "Slug is required");
    }
    // const names = name.toLowerCase();

    const shopping = await prisma.shopping.findFirst({
      where: { slug },
      include: {
        // include any related models if needed
      },
    });

    if (!shopping) {
      return handleResponse(res, 404, "shopping not found");
    }
    return handleResponse(res, 200, "shopping fetched successfully", shopping);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const getShoppingByType = async (req, res, next) => {
  try {
    const { type } = req.params;

    // Validate type
    if (!type) {
      return handleResponse(res, 400, "shopping type is required");
    }

    // Map type to database value
    const shopping_type = {
      mall: "Mall",
      market: "market",
    };

    const dbType = shopping_type[type];
    if (!dbType) {
      return handleResponse(res, 400, "Invalid shopping type provided");
    }

    // Fetch shoppings
    const shoppings = await prisma.shopping.findMany({
      where: { type: dbType },
    });

    if (!shoppings || shoppings.length === 0) {
      return handleResponse(
        res,
        404,
        "No shopping found for the specified type"
      );
    }

    return handleResponse(
      res,
      200,
      "shoppings fetched successfully",
      shoppings
    );
  } catch (err) {
    return next(err);
  }
};

export const updateShopping = async (req, res, next) => {
  const { id } = req.params;
  const { name, address, state, region, description, type, slug } = req.body;

  if (!id) {
    return handleResponse(res, 400, "shopping ID is required");
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
    const existingShopping = await prisma.shopping.findUnique({
      where: { id },
    });

    if (!existingShopping) {
      return handleResponse(res, 404, "shopping not found");
    }

    const updatedShopping = await prisma.shopping.update({
      where: { id },
      data: { name, slug, address, state, region, description, type },
    });

    handleResponse(res, 200, "shopping updated successfully", updatedShopping);
  } catch (err) {
    next(err);
  }
};

export const deleteShopping = async (req, res, next) => {
  const id = req.params.id;
  if (!id) return handleResponse(res, 400, "shopping ID is required");

  try {
    const deletedShopping = await prisma.shopping.delete({
      where: { id },
    });
    if (!deletedShopping) return handleResponse(res, 404, "shopping not found");
    handleResponse(res, 200, "shopping deleted successfully", deletedShopping);
  } catch (err) {
    next(err);
  }
};
