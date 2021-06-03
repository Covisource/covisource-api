import express from "express";
import categoryModel from "../models/categoryModel";
import resourceModel from "../models/resourceModel";

export const newResourceValidator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { resource } = req.body;

  const phoneRegex = new RegExp(
    "^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$"
  );

  const emailRegex = new RegExp(
    "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"
  );

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

  if (
    resource.method === "phone" &&
    (!resource.phone || !phoneRegex.test(resource.phone))
  ) {
    return next({
      statusCode: 400,
      code: "bad_data",
      message: "Make sure the data is valid.",
    });
  }

  if (
    resource.method === "email" &&
    (!resource.email || !emailRegex.test(resource.email))
  ) {
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
