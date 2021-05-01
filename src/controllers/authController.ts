import express from "express";
import { Helper_newUser_POST } from "../helper/authHelper";

export const newUser_POST = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { user, mode } = req.body;
  const helper = new Helper_newUser_POST(user, mode);

  // If the Data Validation function returns anything, return json
  const validateData = helper.validateData();

  if (validateData?.code) {
    return next({
      statusCode: validateData.statusCode,
      code: validateData.code,
      message: validateData.message,
    });
  }

  // IF YOU GET AN ERROR HERE JUST DONT FREAK OUT ITS SUPPOSED TO HAPPEN ;-;

  //  If the Account Exists function returns anything, return json

  // const fsRes = await db.collection("users").doc(user.uid).get();
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
