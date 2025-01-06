const { BadRequestError, AuthFailureError } = require("../core/error.response");
const UserTransformer = require("../transformers/user.transformer");
const bcrypt = require("bcrypt");
const { User, blacklistToken, keyToken } = require("../models/index");
const { createTokenPair, verifyJWT } = require("../auth/authUtils");
const KeyTokenService = require("./keyToken.service");

class AuthService {
  static handlerRefreshToken = async ({ refreshToken, userId }) => {
    const keyStore = await KeyTokenService.findByUserId(userId);
    if (keyStore.refresh_token !== refreshToken)
      throw new AuthFailureError("Account not register!");
    const foundUser = await User.findByPk(userId);
    if (!foundUser) throw new AuthFailureError("Account not register!");
    const tokens = await createTokenPair({ userId, email: foundUser.email });
    await keyToken.update(
      {
        refresh_token: tokens.refreshToken,
      },
      {
        where: {
          user_id: userId,
        },
      }
    );
    return {
      tokens,
      userId,
    };
  };

  /**
   * Get user from token
   * @param {*} userId
   * @param {*} accessToken
   * @returns
   */
  static getUserFromToken = async ({ userId, accessToken }) => {
    const keyStore = await KeyTokenService.findByUserId(userId);
    if (!keyStore) throw new NotFoundError("Not found keystore");
    const decodeUser = await verifyJWT(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (parseInt(userId) !== parseInt(decodeUser.userId))
      throw new AuthFailureError("Invalid userId");
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });
    return new UserTransformer(user);
  };
  /**
   *
   * @param {*} param
   * @returns
   */
  static signIn = async ({ email, password }) => {
    // 1
    const foundUser = await User.findOne({
      where: { email },
    });
    if (!foundUser) throw new BadRequestError("Not found User!");
    // 2
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) throw new AuthFailureError("Authentication Error");

    // 4. gen tokens
    const tokens = await createTokenPair({
      userId: foundUser.id,
      email,
    });

    await KeyTokenService.createOrUpdateKeyToken({
      userId: foundUser.id,
      refreshToken: tokens.refreshToken,
    });
    const userTransformer = new UserTransformer(foundUser);
    return {
      user: userTransformer,
      tokens,
    };
  };

  static signUp = async ({ name, email, password }) => {
    const foundUser = await User.findOne({
      where: { email },
    });
    if (foundUser) throw new BadRequestError("User existed!");

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
      status: "active",
    });
    if (!newUser) {
      return null;
    }

    const tokens = await createTokenPair({
      userId: newUser.id,
      email,
    });
    await KeyTokenService.createOrUpdateKeyToken({
      userId: newUser.id,
      refreshToken: tokens.refreshToken,
    });
    const userTransformer = new UserTransformer(newUser);
    return {
      user: userTransformer,
      tokens,
    };
  };

  static signOut = async ({ accessToken, userId }) => {
    const keyStore = await KeyTokenService.findByUserId(userId);
    if (!keyStore) throw new NotFoundError("Not found keystore");
    const decodeUser = await verifyJWT(accessToken, keyStore.public_key);
    if (parseInt(userId) !== parseInt(decodeUser.userId))
      throw new AuthFailureError("Invalid userId");
    const { exp } = decodeUser;
    const delKey = await KeyTokenService.removeKeyById(keyStore.user_id);
    await blacklistToken.findOrCreate({
      where: { token: accessToken },
      defaults: {
        token: accessToken,
        expired: new Date(exp * 1000),
      },
    });
    return delKey;
  };

  static findUser = async (email) => {
    return await User.findOne({
      where: { email },
    });
  };

  static handleChangeInfo = async (data) => {
    const foundUser = await User.findByPk(data.idUser);
    if (!foundUser) throw new BadRequestError("Not found User!");
    const objectUpdate = {};
    if (data?.name) {
      objectUpdate.name = data.name;
    }
    if (data?.password && data?.oldPassword) {
      const match = await bcrypt.compare(data.oldPassword, foundUser.password);
      if (!match) throw new AuthFailureError("Authentication Error");
      const hashPassword = bcrypt.hashSync(data.password, 10);
      objectUpdate.password = hashPassword;
    }
    await foundUser.update(objectUpdate);
  };

  static createUser = async (payload) => {
    const newUser = await User.create(payload);
    const userTransformer = new UserTransformer(newUser);
    return userTransformer;
  };
}

module.exports = AuthService;
