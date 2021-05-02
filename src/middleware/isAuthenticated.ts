import express from "express";
import jwt from "jsonwebtoken";

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
    const verifiedToken = jwt.verify(
      token,
      "hi"
    );
    console.log(verifiedToken);
  } catch (err) {
    return next({
      message: err.message,
      statusCode: 500,
      code: "server_err",
    });
  }

  next()
}
