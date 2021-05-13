import express from "express";
import resourceModel from "../models/resourceModel";
import ipware from "ipware";

const newResourceController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  interface resourceInterface {
    userId: any;
    title: string;
    description: string;
    category: number;
    location: number;
    price: string;
    phone: string;
  }

  const resource: resourceInterface = req.body.user;

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

  const ip = ipware.get_ip(req);

  const newResource = new resourceModel({
    title: resource.title,
    description: resource.description,
    creator: {
      Ip: ip,
      userId: resource.userId,
    },
    category: resource.category,
    location: resource.location,
    price: resource.price,
    phone: resource.phone,
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

export default newResourceController;
