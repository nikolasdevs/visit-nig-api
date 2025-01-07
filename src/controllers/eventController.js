import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handleResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const createEvent = async (req, res, next) => {
  const { name, address, date, state, region, description, imageUrls, slug } =
    req.body;

  if (
    !name ||
    !address ||
    !date ||
    !description ||
    !state ||
    !region ||
    !slug
  ) {
    return handleResponse(res, 400, "Kindly fill in missing information");
  }

  try {
    const existingName = await prisma.event.findUnique({
      where: { name },
    });
    if (existingName) {
      return handleResponse(res, 409, "Event with this name already exists");
    }

    // const imageUrls = req.files.map((file) => file.path);

    const newEvent = await prisma.event.create({
      data: {
        name,
        address,
        date,
        state,
        region,
        description,
        imageUrls,
        slug,
      },
    });
    handleResponse(res, 201, `${newEvent.name} created successfully`, newEvent);
  } catch (err) {
    next(err);
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await prisma.event.findMany();
    if (!events || events.length === 0) {
      return handleResponse(res, 404, "No Event found");
    }
    handleResponse(res, 200, "Event fetched successfully", events);
  } catch (err) {
    next(err);
  }
};

export const getEventBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return handleResponse(res, 400, "Slug is required");
    }
    // const names = name.toLowerCase();

    const event = await prisma.event.findFirst({
      where: { slug },
      include: {
        // include any related models if needed
      },
    });

    if (!event) {
      return handleResponse(res, 404, "Event not found");
    }
    return handleResponse(res, 200, "Event fetched successfully", event);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const updateEvent = async (req, res, next) => {
  const { slug } = req.params;
  const { name, address, date, state, region, description, imageUrls } =
    req.body;

  if (!slug) {
    return handleResponse(res, 400, "Event Slug is required");
  }

  if (
    !name ||
    !address ||
    !date ||
    !state ||
    !region ||
    !description ||
    !slug
  ) {
    return handleResponse(res, 400, "Kindly fill in missing  information");
  }

  try {
    const existingEvent = await prisma.event.findFirst({
      where: { slug },
    });

    if (!existingEvent) {
      return handleResponse(res, 404, "Event updated not found");
    }

    const updatedEvent = await prisma.event.update({
      where: { slug },
      data: {
        name,
        slug,
        address,
        date,
        state,
        region,
        description,
        imageUrls,
      },
    });

    handleResponse(res, 200, "Event updated successfully", updatedEvent);
  } catch (err) {
    next(err);
  }
};

export const deleteEvent = async (req, res, next) => {
  const { id } = req.params;

  if (!id) return handleResponse(res, 400, "Event id is required");

  try {
    const deletedEvent = await prisma.event.delete({
      where: { id: id },
    });
    if (!deletedEvent)
      return handleResponse(res, 404, "Event updated not found");
    handleResponse(
      res,
      200,
      "Event updated deleted successfully",
      deletedEvent
    );
  } catch (err) {
    next(err);
  }
};
