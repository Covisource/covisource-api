import express from "express";
import userModel from "../models/userModel";

export const newUserController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  interface userSchema {
    id: any;
    name: string;
    email: string;
    provider: string;
  }

  const user: userSchema = req.body.user;

  // check to see if user already exists
  try {
    const res = await userModel.findOne({
      $or: [{ id: `${user.provider}_${user.id}` }, { email: user.email }],
    });
    if (res) {
      return next({
        message: "User already exists",
        statusCode: 409,
        code: "user_exists",
      });
    }
  } catch (err) {
    return next({
      message: err.message,
      statusCode: 500,
      code: "mongo_err",
    });
  }

  // create a new user
  const newUser = new userModel({
    id: `${user.provider}_${user.id}`,
    name: user.name,
    email: user.email,
    resources: [],
    reputation: 0,
  });

  try {
    const userSaveRes = await newUser.save();
    if (userSaveRes) {
      return res.status(200).json({
        message: "Sucessfully created a new user",
        code: "create_success",
        success: true,
        data: userSaveRes,
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

export const fetchUserController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const userId = (req as any).userId;
  try {
    const mongoRes = await userModel.findOne({ id: userId });
    return res.json({
      success: true,
      message: "Resource retrieved successfully.",
      statusCode: 200,
      code: "retrieve_success",
      data: mongoRes,
    });
  } catch (err) {
    return next({
      message: err.message,
      statusCode: 500,
      code: "mongo_err",
    });
  }
};

export const setUserLocationController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { coordinates } = req.body;
  const userId = (req as any).userId;
  console.log(userId);

  try {
    const mongoRes = await userModel.findOneAndUpdate(
      { id: userId },
      {
        location: {
          type: "Point",
          coordinates: [coordinates.long, coordinates.lat],
        },
      }
    ); // mongoRes only houses the state of the document before the update

    if (mongoRes) {
      return res.json({
        success: true,
        code: "success",
        message: "Location Updated Successfully",
      });
    } else {
      return next({
        message: "Unkown Error",
        statusCode: 500,
        code: "server_err",
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
