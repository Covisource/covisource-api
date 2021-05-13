import express from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

export default async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next({
      message: "No Token Provided",
      statusCode: 401,
      code: "no_token",
    });
  }

  try {
    const verifiedToken: any = jwt.verify(token, "hi");

    if (!verifiedToken.id) {
      return next({
        message: "The token does not have sufficient parameters.",
        statusCode: 400,
        code: "bad_jwt",
      });
    }

    const res = await userModel.findOne({ id: verifiedToken.id });
    
    if (!res) {
      return next({
        message: "Invalid Token Id",
        statusCode: 400,
        code: "bad_jwt",
      });
    }

    (req as any).userId = verifiedToken.id;
  } catch (err) {
    return next({
      message: err.message,
      statusCode: 500,
      code: "jwt_err",
    });
  }

  return next();
}
