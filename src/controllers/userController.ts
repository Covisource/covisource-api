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
      console.log("New User Controller: User already exists");
      return next({
        message: "User already exists",
        statusCode: 409,
        code: "user_exists",
      });
    }
  } catch (err) {
    console.log(err.message);
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
  const { user } = req as any;

  return res.json({
    success: true,
    message: "Resource retrieved successfully.",
    statusCode: 200,
    code: "retrieve_success",
    data: user,
  });
};
