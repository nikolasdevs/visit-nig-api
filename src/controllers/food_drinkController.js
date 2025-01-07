import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handleResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const createFood_Drink = async (req, res, next) => {
  const { name, address, state, region, description, imageUrls, slug } =
    req.body;

  if (!name || !address || !description || !state || !region || !slug) {
    return handleResponse(res, 400, "Kindly fill in missing information");
  }

  try {
    const existingName = await prisma.food_Drink.findUnique({
      where: { name },
    });
    if (existingName) {
      return handleResponse(
        res,
        409,
        "Food and Drink with this name already exists"
      );
    }

    // const imageUrls = req.files.map((file) => file.path);

    const newFood_Drink = await prisma.food_Drink.create({
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
    handleResponse(
      res,
      201,
      `${newFood_Drink.name} created successfully`,
      newFood_Drink
    );
  } catch (err) {
    next(err);
  }
};

export const getAllFood_Drinks = async (req, res, next) => {
  try {
    const food_drinks = await prisma.food_Drink.findMany();
    if (!food_drinks || food_drinks.length === 0) {
      return handleResponse(res, 404, "No Food & Drink found");
    }
    handleResponse(res, 200, "Food & Drink fetched successfully", food_drinks);
  } catch (err) {
    next(err);
  }
};

export const getFood_DrinkBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return handleResponse(res, 400, "Slug is required");
    }
    // const names = name.toLowerCase();

    const food_drink = await prisma.food_Drink.findFirst({
      where: { slug },
      include: {
        // include any related models if needed
      },
    });

    if (!food_drink) {
      return handleResponse(res, 404, "Food_Drink not found");
    }
    return handleResponse(
      res,
      200,
      "Food & Drink fetched successfully",
      food_drink
    );
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const updateFood_Drink = async (req, res, next) => {
  const { slug } = req.params;
  const { name, address, state, region, description, imageUrls } = req.body;

  if (!slug) {
    return handleResponse(res, 400, "Food_Drink Slug is required");
  }

  if (!name || !address || !state || !region || !description || !slug) {
    return handleResponse(res, 400, "Kindly fill in missing  information");
  }

  try {
    const existingFood_Drink = await prisma.food_Drink.findFirst({
      where: { slug },
    });

    if (!existingFood_Drink) {
      return handleResponse(res, 404, "Food & Drink updated not found");
    }

    const updatedFood_Drink = await prisma.food_Drink.update({
      where: { slug },
      data: { name, slug, address, state, region, description, imageUrls },
    });

    handleResponse(
      res,
      200,
      "Food & Drink updated successfully",
      updatedFood_Drink
    );
  } catch (err) {
    next(err);
  }
};

export const deleteFood_Drink = async (req, res, next) => {
  const { id } = req.params;

  if (!id) return handleResponse(res, 400, "Food & Drink id is required");

  try {
    const deletedFood_Drink = await prisma.food_Drink.delete({
      where: { id: id },
    });
    if (!deletedFood_Drink)
      return handleResponse(res, 404, "Food & Drink updated not found");
    handleResponse(
      res,
      200,
      "Food & Drink updated deleted successfully",
      deletedFood_Drink
    );
  } catch (err) {
    next(err);
  }
};
