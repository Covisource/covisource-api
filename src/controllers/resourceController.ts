import express from "express";
import resourceModel from "../models/resourceModel";

const newResourceController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { userId } = req as any;
  const { extractedIp } = req as any;

  const { resource } = req.body;

  const resourceObj = {
    creator: {
      createdByIp: !userId,
    },
    title: resource.title,
    category: resource.category,
    location: resource.location,
    phone: resource.phone,
  };

  if (userId) (resourceObj as any).creator.userId = userId;
  if (extractedIp) (resourceObj as any).creator.Ip = extractedIp;
  if (resource.description) (resourceObj as any).description = resource.description;
  if (resource.price) (resourceObj as any).price = resource.price;

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

export default newResourceController;
