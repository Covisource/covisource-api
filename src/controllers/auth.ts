import express from "express";

export const newUser_POST = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { user, mode: string } = req.body;
};
