import express from "express";

export const get404 = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  return res.status(404).json({
    message: "Page Not Found!",
  });
};
