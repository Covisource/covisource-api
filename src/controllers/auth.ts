import express from "express";
import { db } from "../util/firebase";

export const newUser_POST = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { user, mode: string } = req.body;
  const fsRes = await db.collection("users").get();
  res.json(fsRes.docs);
};
