import express from "express";
import categoryModel from "../models/categoryModel";
import userModel from "../models/userModel";

export const newCategoryValidator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { name } = req.body;

  if (!name) {
    return next({
      statusCode: 400,
      code: "bad_data",
      message: "Make sure the data is valid.",
    });
  }

  try {
    const queryRes = await userModel.findOne({ id: (req as any).userId });
    if (!(queryRes as any).admin) {
      return next({
        statusCode: 401,
        code: "unauthorized",
        message: "You aren't authorized to perform this action",
      });
    }
  } catch (err) {
    return next({
      statusCode: 500,
      code: "mongo_err",
      message: err.message,
    });
  }
  // validation succeeds, continue to next middleware
  next();
};
