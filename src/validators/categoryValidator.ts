import express from "express";
import categoryModel from "../models/categoryModel";
import userModel from "../models/userModel";

export const newCategoryValidator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { name } = req.body;
  const { user } = req as any;

  if (!name) {
    return next({
      statusCode: 400,
      code: "bad_data",
      message: "Make sure the data is valid.",
    });
  }

  if (!user.admin) {
    return next({
      statusCode: 401,
      code: "unauthorized",
      message: "You aren't authorized to perform this action",
    });
  }

  try {
    const queryRes = await categoryModel.findOne({ name });
    if (queryRes) {
      return next({
        statusCode: 400,
        code: "resource_exists",
        message: "This resource already exists",
      });
    }
  } catch (err) {
    return next({
      message: err.message,
      statusCode: 500,
      code: "mongo_err",
    });
  }

  // validation succeeds, continue to next middleware
  next();
};
