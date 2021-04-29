import express from "express";

export class Helper_newUser_POST {
  user;
  mode;
  constructor(user: any, mode: string) {
    this.user = user;
    this.mode = mode;
  }

  validateData = () => {
    if (!this.user || !this.mode) {
      return {
        statusCode: 400,
        code: "params_insufficient",
        message: "Make sure you include the required fields",
      };
    }

    if (!this.user.uid) {
      return {
        statusCode: 400,
        code: "bad_data",
        message: "Make sure the data is valid.",
      };
    }

    if (this.mode !== "social" && this.mode !== "email") {
      return {
        statusCode: 400,
        code: "bad_data",
        message: "Make sure the data is valid.",
      };
    }
  };

  accountExists = (
    fsRes: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
  ) => {
    console.log(fsRes);
    if (fsRes.exists && this.mode === "social") {
      return {
        statusCode: 400,
        code: "social_acc_exist",
        message:
          "Account from social provider already exists, creation not required.",
      };
    } else if (fsRes.exists && this.mode !== "social") {
      return {
        statusCode: 400,
        code: "acc_exist",
        message: "This account already exists.",
      };
    }
  };
}
