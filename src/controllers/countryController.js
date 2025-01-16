import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handleResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const createCountry = async (req, res, next) => {
  const { name, iso_code } = req.body;

  if (!name || !iso_code) {
    return handleResponse(res, 400, "Kindly fill in missing information");
  }

  try {
    const existingName = await prisma.countries.findFirst({
      where: { name },
    });
    if (existingName) {
      return handleResponse(res, 409, "Country with this name already exists");
    }

    const newCountry = await prisma.countries.create({
      data: {
        name,
        iso_code,
      },
    });
    handleResponse(
      res,
      201,
      `${newCountry.name} created successfully`,
      newCountry
    );
  } catch (err) {
    next(err);
  }
};

export const getAllCountry = async (req, res, next) => {
  try {
    const countries = await prisma.countries.findMany();
    if (!countries || countries.length === 0) {
      return handleResponse(res, 404, "No country found");
    }
    handleResponse(res, 200, "Country fetched successfully", countries);
  } catch (err) {
    next(err);
  }
};

export const getCountryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return handleResponse(res, 400, "A valid ID is required");
    }

    const countryId = parseInt(id, 10);

    const country = await prisma.countries.findUnique({
      where: { id: countryId },
      include: {
        // include any related models if needed
      },
    });

    if (!country) {
      return handleResponse(res, 404, "Country not found");
    }
    return handleResponse(res, 200, "Country fetched successfully", country);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const updateCountry = async (req, res, next) => {
  const { name, iso_code } = req.body;

  const { id } = req.params;
  if (!id) return handleResponse(res, 400, "Country ID is required");

  if (!name || !iso_code) {
    return handleResponse(res, 400, "Kindly fill in missing information");
  }

  const countryId = parseInt(id, 10);

  if (!id || isNaN(id)) {
    return handleResponse(res, 400, "A valid ID is required");
  }
  try {
    const existingCountry = await prisma.countries.findUnique({
      where: { id: countryId },
    });

    if (!existingCountry) {
      return handleResponse(res, 404, "Country not found");
    }

    const updatedCountry = await prisma.countries.update({
      where: { id: countryId },
      data: {
        name,
        iso_code,
      },
    });

    handleResponse(res, 200, "Country updated successfully", updatedCountry);
  } catch (err) {
    next(err);
  }
};

export const deleteCountry = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return handleResponse(res, 400, "Country ID is required");

  const countryId = parseInt(id, 10);

  if (!id || isNaN(id)) {
    return handleResponse(res, 400, "A valid ID is required");
  }

  try {
    const deletedCountry = await prisma.countries.delete({
      where: { id: countryId },
    });
    if (!deletedCountry) return handleResponse(res, 404, "Country not found");
    handleResponse(res, 200, "Country deleted successfully", deletedCountry);
  } catch (err) {
    next(err);
  }
};
