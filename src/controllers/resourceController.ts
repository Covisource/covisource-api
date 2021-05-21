import express from "express";
import categoryModel from "../models/categoryModel";
import resourceModel from "../models/resourceModel";

export const newResourceController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { user } = req as any; // the logged in user (possibly undefined)
  const { extractedIp } = req as any; // the users ipv6 address
  const { resource } = req.body; // the resource the user wishes to insert

  // schemas for a resource
  interface ExtraParameterSchema {
    name: string;
    value: any;
  }

  interface CreatorSchema {
    Ip?: any;
    userId?: any;
  }

  interface ResourceSchema {
    title: string;
    category: any;
    phone: string;
    creator: CreatorSchema;
    location: any;
    description?: string;
    price?: string;
    extraParameters?: ExtraParameterSchema[];
  }

  // forming the resource to be inserted
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

  // conditonally checking for optional data and inserting it
  if (user?._id) resourceObj.creator.userId = user._id;
  if (extractedIp) resourceObj.creator.Ip = extractedIp;
  if (resource.description) resourceObj.description = resource.description;
  if (resource.price) resourceObj.price = resource.price;
  if (resource.extraParameters)
    resourceObj.extraParameters = resource.extraParameters;

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
