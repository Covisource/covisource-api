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

interface errorSchema {
  statusCode: number;
  code: string;
  message: string;
}

export const errorHandler = (
  err: errorSchema,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  return res.status(err.statusCode).json({
    message: err.message,
    code: err.code,
    success: false
  })
};
