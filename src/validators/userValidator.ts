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
