import express from "express";
import categoryModel from "../models/categoryModel";

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
    !resource.location.coordinates.lat ||
    !resource.location.coordinates.long
  ) {
    return next({
      statusCode: 400,
      code: "bad_data",
      message: "Make sure the data is valid.",
    });
  }

  if (resource.method === "phone" && !resource.phone) {
    return next({
      statusCode: 400,
      code: "bad_data",
      message: "Make sure the data is valid.",
    });
  }

  if (resource.method === "email" && !resource.email) {
    return next({
      statusCode: 400,
      code: "bad_data",
      message: "Make sure the data is valid.",
    });
  }

  // fetching the resource using the id and seeing if the user pased valid extra parameters
  try {
    const mongoRes = await categoryModel.findById(resource.category);
    if (!mongoRes) {
      return next({
        message: "Invalid category",
        statusCode: 400,
        code: "bad_data",
      });
    }

    if ((mongoRes as any).extraParameters && !resource.extraParameters) {
      return next({
        message: "Make sure the data is valid.", 
        statusCode: 400, 
        code: "bad_data",
      });
    }

    interface ParamSchema {
      name: string;
      isRequired?: boolean;
    }

    (mongoRes as any).extraParameters.forEach((categoryParam: ParamSchema) => {
      if (categoryParam.isRequired) {
        const searchRes = (resource.extraParameters as any[])?.find(
          (resourceParam) => resourceParam.name === categoryParam.name
        );
        if (!searchRes?.value) {
          return next({
            statusCode: 400,
            code: "params_insufficient",
            message: "Make sure you include the required fields",
          });
        }
      }
    });
  } catch (err) {
    console.error(err);
    return next({
      message: err.message,
      statusCode: 500,
      code: "mongo_err",
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