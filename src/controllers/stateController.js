import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handleResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const createState = async (req, res, next) => {
  const { state_name, region_id } = req.body;

  if (!state_name || !region_id) {
    return handleResponse(res, 400, "Kindly fill in missing information");
  }

  try {
    const existingName = await prisma.nig_states.findFirst({
      where: { state_name },
    });
    if (existingName) {
      return handleResponse(res, 409, "State with this name already exists");
    }

    const newState = await prisma.nig_states.create({
      data: {
        state_name,
        region_id,
      },
    });
    handleResponse(
      res,
      201,
      `${newState.state_name} created successfully`,
      newState
    );
  } catch (err) {
    next(err);
  }
};

export const getAllStates = async (req, res, next) => {
  try {
    const states = await prisma.nig_states.findMany({
      include: {
        region: true,
      },
    });
    if (!states || states.length === 0) {
      return handleResponse(res, 404, "No state found");
    }
    const formattedStates = states.map((state) => ({
      id: state.id,
      state_name: state.state_name,
      region_id: state.region_id,
      region_name: state.region.name, // Fetching the actual region name
    }));
    handleResponse(res, 200, "State fetched successfully", formattedStates);
  } catch (err) {
    next(err);
  }
};

export const getStateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return handleResponse(res, 400, "A valid ID is required");
    }

    const stateId = parseInt(id, 10);

    const state = await prisma.nig_states.findUnique({
      where: { id: stateId },
      include: {
        // include any related models if needed
      },
    });

    if (!state) {
      return handleResponse(res, 404, "State not found");
    }
    return handleResponse(res, 200, "State fetched successfully", state);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const updateState = async (req, res, next) => {
  const { state_name, region_id } = req.body;

  const { id } = req.params;
  if (!id) return handleResponse(res, 400, "State ID is required");

  if ((!state_name, region_id)) {
    return handleResponse(res, 400, "Kindly fill in missing information");
  }

  const stateId = parseInt(id, 10);

  if (!id || isNaN(id)) {
    return handleResponse(res, 400, "A valid ID is required");
  }
  try {
    const existingState = await prisma.nig_states.findUnique({
      where: { id: stateId },
    });

    if (!existingState) {
      return handleResponse(res, 404, "State not found");
    }

    const updatedState = await prisma.nig_states.update({
      where: { id: stateId },
      data: {
        state_name,
        region_id,
      },
    });

    handleResponse(res, 200, "State updated successfully", updatedState);
  } catch (err) {
    next(err);
  }
};

export const deleteState = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return handleResponse(res, 400, "State ID is required");

  const stateId = parseInt(id, 10);

  if (!id || isNaN(id)) {
    return handleResponse(res, 400, "A valid ID is required");
  }

  try {
    const deletedState = await prisma.nig_states.delete({
      where: { id: stateId },
    });
    if (!deletedState) return handleResponse(res, 404, "State not found");
    handleResponse(res, 200, "State deleted successfully", deletedState);
  } catch (err) {
    next(err);
  }
};
