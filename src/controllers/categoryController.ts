import express from "express";
import categoryModel from "../models/categoryModel";

export const newCategoryController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { name, extraParameters } = req.body;

  const toInsert = new categoryModel({ name, extraParameters });

  try {
    const queryRes = await toInsert.save();
    return res.status(201).json({
      success: true,
      code: "create_success",
      message: "Created category successfully.",
      data: queryRes,
    });
  } catch (err) {
    return next({
      message: err.message,
      statusCode: 500,
      code: "mongo_err",
    });
  }
};

export const findCategoryController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { q } = req.query;
  try {
    if (q) {
      const queryRes = await categoryModel.find({
        $text: { $search: q.toString() },
      });
      return res.status(200).json({
        success: true,
        code: "retrieve_success",
        message: "Found results successfully.",
        data: queryRes,
      });
    } else {
      const queryRes = await categoryModel.find();
      return res.status(200).json({
        success: true,
        code: "retrieve_success",
        message: "Found all results successfully.",
        data: queryRes,
      });
    }
  } catch (err) {
    return next({
      message: err.message,
      statusCode: 500,
      code: "mongo_err",
    });
  }
};

// test commit