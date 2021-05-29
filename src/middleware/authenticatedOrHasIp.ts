import express from "express";
import jwt from "jsonwebtoken";
import publicIp from "public-ip";

// models
import userModel from "../models/userModel";

export default async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    const ip = await publicIp.v6();
    if (ip) {
      (req as any).extractedIp = ip;
    } else {
      return next({
        message: "No IP found",
        statusCode: 500,
        code: "no_ip",
      });
    }
    return next();
  }

  try {
    const verifiedToken: any = jwt.verify(token, String(process.env.JWT_SECRET));

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

    (req as any).user = res
  } catch (err) {
    return next({
      message: err.message,
      statusCode: 500,
      code: "jwt_err",
    });
  }

  return next();
}
