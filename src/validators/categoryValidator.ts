import express from "express";
import categoryModel from "../models/categoryModel";

export const newCategoryValidator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { name, extraParameters } = req.body;
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

  if (extraParameters) {
    // make sure the extra parameters for the category are valid
    try {
      let isOkay = true;
      extraParameters.forEach((extraParam: any) => {
        if (!extraParam.name || !extraParam.icon || !extraParam.type) {
          isOkay = false
        }
      })
      if (!isOkay) {
        return next({
          message: "Make sure all the fields are valid.",
          statusCode: 500,
          code: "params_insufficient",
        });
      }
    } catch (err) {
      return next({
        message: err.message,
        statusCode: 500,
        code: "server_err",
      });
    }
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
