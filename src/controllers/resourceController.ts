import { RSA_NO_PADDING } from "constants";
import express from "express";
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
    phone?: string;
    email?: string;
    creator: CreatorSchema;
    location: any;
    description?: string;
    price?: string;
    quantity?: number;
    extraParameters?: ExtraParameterSchema[];
  }

  // forming the resource to be inserted
  const resourceObj: ResourceSchema = {
    title: resource.title,
    category: resource.category,
    creator: {},
    location: {
      type: "Point",
      displayName: resource.location.displayName,
      coordinates: [
        resource.location.coordinates.long,
        resource.location.coordinates.lat,
      ],
    },
  };

  // conditonally checking for optional data and inserting it
  if (user?._id) resourceObj.creator.userId = user._id;
  if (extractedIp) resourceObj.creator.Ip = extractedIp;
  if (resource.description) resourceObj.description = resource.description;
  if (resource.price) resourceObj.price = resource.price;
  if (resource.email) resourceObj.email = resource.email;
  if (resource.phone) resourceObj.phone = resource.phone;
  if (resource.quantity) resourceObj.quantity = resource.quantity;
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

export const findResourceController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { lat, long } = req.query;

  try {
    const queryRes = await resourceModel.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [long, lat] },
        },
      },
    });
    return res.status(200).json({
      message: "Sucessfully retrieved resources.",
      code: "retrieve_success",
      success: true,
      data: queryRes,
    });
  } catch (err) {
    console.error(err);
    return next({
      message: err.message,
      statusCode: 500,
      code: "mongo_err",
    });
  }
};
