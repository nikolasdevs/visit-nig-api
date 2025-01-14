import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const handleResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const createAdmin = async (req, res, next) => {
  const { username, email, password, isSuperUser } = req.body;

  if (!username || !email || !password) {
    return handleResponse(res, 400, "Kindly fill in missing information");
  }

  try {
    const existingUsername = await prisma.admin.findUnique({
      where: { username },
    });
    if (existingUsername) {
      return handleResponse(res, 409, "Username with this name already exists");
    }

    // const imageUrls = req.files.map((file) => file.path);
    const passwordHash = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.admin.create({
      data: {
        username,
        email,
        password: passwordHash,
        is_superuser: isSuperUser || false,
      },
    });
    handleResponse(
      res,
      201,
      `${newAdmin.username} created successfully`,
      newAdmin
    );
  } catch (err) {
    next(err);
  }
};

export const getAllAdmin = async (req, res, next) => {
  try {
    const admins = await prisma.admin.findMany();
    if (!admins || admins.length === 0) {
      return handleResponse(res, 404, "No admins found");
    }
    handleResponse(res, 200, "admins fetched successfully", admins);
  } catch (err) {
    next(err);
  }
};

export const getAdminById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return handleResponse(res, 400, "Id is required");
    }
    // const names = name.toLowerCase();

    const admin = await prisma.admin.findUnique({
      where: { id },
      include: {
        // include any related models if needed
      },
    });

    if (!admin) {
      return handleResponse(res, 404, "Admin not found");
    }
    return handleResponse(res, 200, "Admin fetched successfully", admin);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const updateAdmin = async (req, res, next) => {
  const { id } = req.params;
  const { username, email, password, isSuperUser } = req.body;

  if (!id) {
    return handleResponse(res, 400, "Admin id is required");
  }

  if (!username || !email || !password) {
    return handleResponse(res, 400, "Kindly fill in missing information");
  }

  try {
    const existingAdmin = await prisma.admin.findUnique({
      where: { id },
    });

    if (!existingAdmin) {
      return handleResponse(res, 404, "Admin not found");
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data: {
        username,
        email,
        password: passwordHash,
        is_superuser: isSuperUser || false,
      },
    });

    handleResponse(res, 200, "Admin updated successfully", updatedAdmin);
  } catch (err) {
    next(err);
  }
};

export const deleteAdmin = async (req, res, next) => {
  const id = req.params.id;
  if (!id) return handleResponse(res, 400, "Admin id is required");

  try {
    const deletedAdmin = await prisma.admin.delete({
      where: { id },
    });
    if (!deletedAdmin) return handleResponse(res, 404, "Admin not found");
    handleResponse(res, 200, "Admin deleted successfully", deletedAdmin);
  } catch (err) {
    next(err);
  }
};
