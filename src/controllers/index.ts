import express from "express";

exports.home = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {

  return res.status(200).json({
    message: "success!",
  });
};
