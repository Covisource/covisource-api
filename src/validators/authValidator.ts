import express from "express";

export const newUserValidator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { user, mode } = req.body;

  if (!user || !mode) {
    return next({
      statusCode: 400,
      code: "params_insufficient",
      message: "Make sure you include the required fields",
    });
  }

  if (!user.uid) {
    return next({
      statusCode: 400,
      code: "bad_data",
      message: "Make sure the data is valid.",
    });
  }

  if (mode !== "social" && mode !== "email") {
    return next({
      statusCode: 400,
      code: "bad_data",
      message: "Make sure the data is valid.",
    });
  }

  // All checks pass, go to next middleware

  return next();
};
