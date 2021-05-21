import express from "express";
import resourceModel from "../models/resourceModel";

export const newResourceController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { user } = req as any;
  const { extractedIp } = req as any;

  const { resource } = req.body;

  interface CreatorSchema {
    Ip?: any;
    userId?: any;
  }

  interface ResourceSchema {
    title: string;
    category: string;
    phone: string;
    creator: CreatorSchema;
    location: any;
    description?: string;
    price?: string;
  }

  const resourceObj: ResourceSchema = {
    title: resource.title,
    category: resource.category,
    phone: resource.phone,
    creator: {},
    location: {
      type: "Point",
      displayName: resource.location.displayName,
      coordinates: [
        resource.location.coordinates.lat,
        resource.location.coordinates.long,
      ],
    },
  };

  if (user._id) resourceObj.creator.userId = user._id;
  if (extractedIp) resourceObj.creator.Ip = extractedIp;
  if (resource.description) resourceObj.description = resource.description;
  if (resource.price) resourceObj.price = resource.price;

  const newResource = new resourceModel(resourceObj);

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
