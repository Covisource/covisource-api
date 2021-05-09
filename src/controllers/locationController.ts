import express from "express";

import request from "request";
import Oauth from "oauth-1.0a";
import crypto from "crypto";

export const getHereOauthTokenController = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // oauth init with creds
  const oauth = new Oauth({
    consumer: {
      key: req.body.key,
      secret: req.body.secret,
    },
    signature_method: "HMAC-SHA256",
    hash_function(base_string, key) {
      return crypto
        .createHmac("sha256", key)
        .update(base_string)
        .digest("base64");
    },
  });

  // req data
  const request_data = {
    url: "https://account.api.here.com/oauth2/token",
    method: "POST",
    data: { grant_type: "client_credentials" },
  };

  // retrieve access token
  request(
    {
      url: request_data.url,
      method: request_data.method,
      form: request_data.data,
      headers: oauth.toHeader(oauth.authorize(request_data)),
    },
    function (err: any, hereRes: any, body: any) {
      const result = JSON.parse(hereRes.body);
      return res.status(200).json({
        code: "success",
        success: true,
        message: "Retrieved access token for here api",
        data: { ...result },
      });
    }
  );
};
