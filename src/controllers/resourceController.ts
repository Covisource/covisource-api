import express from "express";
import resourceModel from "../models/resourceModel";

export const newResourceController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  interface resourceSchema {
    author: string;
    title: string;
    description: string;
    upvotes: number;
  }

  const resource: resourceSchema = req.body.user;

  // check to see if user already exists
  try {
    const res = await resourceModel.findOne({
      $or: [
        { title: `{resource.title}` },
        { description: `{resource.description}` },
      ],
    });
    if (res) {
      return next({
        message: "Resource with same title/description already exists",
        statusCode: 409,
        code: "resource_exists",
      });
    }
  } catch (err) {
    return next({
      message: err.message,
      statusCode: 500,
      cde: "mongo_err",
    });
  }

  const newResource = new resourceModel({
    author: resource.author,
    title: resource.title,
    description: resource.description,
  });

  try {
    const resourceSaveRes = await newResource.save();
    if (resourceSaveRes) {
      return res.status(200).json({
        message: "Sucessfully created a new resource",
        code: "create_success",
        success: true,
        data: resourceSaveRes,
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
