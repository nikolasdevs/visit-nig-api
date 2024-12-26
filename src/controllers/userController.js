// import {
//   createUserService,
//   deleteUserService,
//   getAllUsersService,
//   getUserByIdService,
//   updateUserService,
// } from "../models/userModel.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return handleResponse(res, 400, "Name and email are required");
  }

  try {
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return handleResponse(res, 409, "User with this email already exists");
    }

    const newUser = await prisma.users.create({ data: { name, email } });
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.users.findMany({ select: { id: true, name: true, email: true } });
    handleResponse(res, 200, "Users fetched successfully", users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate that the ID is provided
    if (!id) return handleResponse(res, 400, "User ID is required");

    // Convert `id` to an integer if necessary
    const userId = parseInt(id, 10);
    if (isNaN(userId))
      return handleResponse(res, 400, "Invalid User ID format");

    // Fetch user from database
    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    // Check if the user exists
    if (!user) return handleResponse(res, 404, "User not found");

    // Return the fetched user
    handleResponse(res, 200, "User fetched successfully", user);
  } catch (err) {
    // Pass errors to the error-handling middleware
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;

  // Validate ID
  if (!id) return handleResponse(res, 400, "User ID is required");

  // Convert ID to integer if necessary
  const userId = parseInt(id, 10);
  if (isNaN(userId)) return handleResponse(res, 400, "Invalid User ID format");

  // Validate request body fields
  if (!name && !email)
    return handleResponse(
      res,
      400,
      "At least one field (name or email) is required"
    );

  try {
    // Update user in the database
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: { name, email },
    });

    handleResponse(res, 200, "User updated successfully", updatedUser);
  } catch (err) {
    if (err.code === "P2025") {
      // Handle "Record to update not found" error
      return handleResponse(res, 404, "User not found");
    }
    // Pass other errors to the error-handling middleware
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate that the ID is provided
    if (!id) return handleResponse(res, 400, "User ID is required");

    // Convert `id` to an integer if necessary
    const userId = parseInt(id, 10);
    if (isNaN(userId))
      return handleResponse(res, 400, "Invalid User ID format");

    // Attempt to delete the user from the database
    const deletedUser = await prisma.users.delete({
      where: { id: userId },
    });

    // Return success response
    handleResponse(res, 200, "User deleted successfully", deletedUser);
  } catch (err) {
    // Handle specific Prisma error for "record not found"
    if (err.code === "P2025") {
      return handleResponse(res, 404, "User not found");
    }

    // Pass any other errors to the error-handling middleware
    next(err);
  }
};
