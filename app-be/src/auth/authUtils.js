"use strict";

const JWT = require("jsonwebtoken");
const asyncHandler = require("../helpers/asyncHandler");
const { AuthFailureError } = require("../core/error.response");
const { findTokenInBlacklist } = require("../services/blacklistToken.service");

const HEADER = {
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

const createTokenPair = async (payload) => {
  try {
    const accessToken = JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1 days",
    });

    // refresh token
    const refreshToken = await JWT.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7 days",
      }
    );
    JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
      if (err) {
        console.error(`error verify::`, err);
      } else {
        console.log(`decode verify::`, decode);
      }
    });
    return { accessToken, refreshToken };
  } catch (error) {}
};

const authentication = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError("Invalid request");

  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailureError("Invalid request");

  const existToken = await findTokenInBlacklist(accessToken);
  if (existToken) throw new AuthFailureError("Invalid request");
  try {
    JWT.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decodeUser) => {
        if (err) {
          throw new AuthFailureError("Invalid userId");
        } else {
          if (parseInt(userId) !== parseInt(decodeUser.userId))
            throw new AuthFailureError("Invalid userId");
          req.user = { ...decodeUser, accessToken };
          req.userId = userId;
          return next();
        }
      }
    );
  } catch (error) {
    throw error;
  }
});

const verifyJWT = async (token, key) => {
  return await JWT.verify(token, key);
};

module.exports = {
  createTokenPair,
  authentication,
  verifyJWT,
};
