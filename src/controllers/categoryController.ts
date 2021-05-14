import express from "express";
import categoryModel from "../models/categoryModel";

export const newCategoryController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { name } = req.body;

  const toInsert = new categoryModel({ name });

  try {
    const queryRes = await toInsert.save();
    return res.status(201).json({
      success: true,
      code: "create_success",
      message: "Created category successfully.",
    });
  } catch (err) {
    return next({
      message: err.message,
      statusCode: 500,
      code: "mongo_err",
    });
  }
};
