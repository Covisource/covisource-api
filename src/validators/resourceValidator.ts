import express from "express";

export const newResourceValidator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { resource } = req.body;

  if (!resource) {
    return next({
      statusCode: 400,
      code: "params_insufficient",
      message: "Make sure you include the required fields",
    });
  }

  if (
    !resource.title ||
    !resource.category ||
    !resource.phone ||
    !resource.location.displayName ||
    !resource.location.coordinates.lat ||
    !resource.location.coordinates.long
  ) {
    return next({
      statusCode: 400,
      code: "bad_data",
      message: "Make sure the data is valid.",
    });
  }

  // check if the coordinates are in a valid range
  if (
    resource.location.coordinates.lat > 90 ||
    resource.location.coordinates.lat < -90 ||
    resource.location.coordinates.long > 180 ||
    resource.location.coordinates.long < -180
  ) {
    return next({
      statusCode: 400,
      code: "bad_data",
      message: "Invalid Coordinate Range",
    });
  }

  // All checks pass, go to next middleware
  return next();
};
