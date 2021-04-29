import express from "express";
import { userSchema } from "../schemas/userSchema";
import { db, auth } from "../util/firebase";
import { Helper_newUser_POST } from "../helper/auth";

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

  //  If the Account Exists function returns anything, return json

  // ERROR: Value for argument "documentPath" is not a valid resource path. Path must be a non-empty string.
  const fsRes = await db.collection("users").doc(user.uid).get();
  const accountExists = helper.accountExists(fsRes);

  if (accountExists?.code) {
    return next({
      statusCode: accountExists.statusCode,
      code: accountExists.code,
      message: accountExists.message,
    });
  }

  // await db
  //   .collection("users")
  //   .doc(user.uid)
  //   .set({
  //     name: user.displayName,
  //     provider: "email",
  //     email: user.email || "",
  //     reputation: 0,
  //     removedPosts: 0,
  //   } as userSchema);
};
