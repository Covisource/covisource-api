import express from "express";

export const index = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  return res.status(200).json({
    message: "Welcome to the CoviSource API!",
  });
};
