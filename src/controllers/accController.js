import {
  createAccService,
  deleteAccService,
  getAccByIdService,
  getAccByTypeService,
  getAllAccService,
  updateAccService,
} from "../models/accModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const createAcc = async (req, res, next) => {
  const { name, address, description, type } = req.body;
  try {
    const newAcc = await createAccService(name, address, description, type);
    handleResponse(res, 201, "Accommodation created successfully", newAcc);
  } catch (err) {
    next(err);
  }
};

export const getAllAcc = async (req, res, next) => {
  try {
    const accommodations = await getAllAccService();
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

export const getAccById = async (req, res, next) => {
  try {
    const accommodation = await getAccByIdService(req.params.id);
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
    return next(err);
  }
};

export const getAccByType = async (req, res, next) => {
  try {
    const accommodations = await getAccByTypeService(type);
    if (!accommodations || accommodations.length === 0) {
      return handleResponse(res, 404, "Accommodations not found");
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
  const { name, address, description, type } = req.body;
  try {
    const updatedAcc = await updateAccService(
      req.params.id,
      name,
      address,
      description,
      type
    );
    if (!updatedAcc) return handleResponse(res, 404, "Accommodation not found");
    handleResponse(res, 200, "Accommodation updated successfully", updatedAcc);
  } catch (err) {
    next(err);
  }
};

export const deleteAcc = async (req, res, next) => {
  try {
    const deletedAcc = await deleteAccService(req.params.id);
    if (!deletedAcc) return handleResponse(res, 404, "Accommodation not found");
    handleResponse(res, 200, "Accommodation deleted successfully", deletedAcc);
  } catch (err) {
    next(err);
  }
};
