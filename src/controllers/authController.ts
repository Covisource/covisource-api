import express from "express";
import userModel from "../models/userModel";

export const newUserController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { user, mode } = req.body;
  const UserModel = new userModel();

  res.json("you made it!")

  // IF YOU GET AN ERROR HERE JUST DONT FREAK OUT ITS SUPPOSED TO HAPPEN ;-;

  //  If the Account Exists function returns anything, return json

  // const accountExists = helper.accountExists(fsRes);

  // if (accountExists?.code) {
  //   return next({
  //     statusCode: accountExists.statusCode,
  //     code: accountExists.code,
  //     message: accountExists.message,
  //   });
  // }

  // stuff that happens after all checks pass

  // create a new user
  // send back a jwt
};
