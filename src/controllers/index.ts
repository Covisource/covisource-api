import express from "express";

export const home = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  return res.status(200).json({
    message: "success!",
  });
};
