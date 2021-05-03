import express from "express";

// search for areas
export const searchController = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  return res.json(req.params.query);
};
