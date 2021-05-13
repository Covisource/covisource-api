import express from "express";

export const newUserValidator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { user } = req.body;

  if (!user) {
    return next({
      statusCode: 400,
      code: "params_insufficient",
      message: "Make sure you include the required fields",
    });
  }

  if (!user.id || !user.name || !user.email || !user.provider) {
    return next({
      statusCode: 400,
      code: "bad_data",
      message: "Make sure the data is valid.",
    });
  }

  // All checks pass, go to next middleware

  return next();
};

export const setUserLocationValidator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { coordinates, displayName } = req.body;

  if (!coordinates || !displayName) {
    return next({
      statusCode: 400,
      code: "params_insufficient",
      message: "Make sure you include the required fields",
    });
  }

  if (!coordinates.long || !coordinates.lat) {
    return next({
      statusCode: 400,
      code: "bad_data",
      message: "Make sure the data is valid.",
    });
  }

  if (
    coordinates.lat > 90 ||
    coordinates.lat < -90 ||
    coordinates.long > 180 ||
    coordinates.long < -180
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
