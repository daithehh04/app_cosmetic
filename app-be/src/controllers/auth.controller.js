const { SuccessResponse, CREATED } = require("../core/success.response.js");
const bcrypt = require("bcrypt");
const AuthService = require("../services/auth.service.js");
const UserTransformer = require("../transformers/user.transformer.js");
class AuthController {
  static handlerRefreshToken = async (req, res) => {
    new SuccessResponse({
      message: "Get token Success!",
      data: await AuthService.handlerRefreshToken(req.body),
    }).send(res);
  };
  static getUserFromToken = async (req, res) => {
    new SuccessResponse({
      message: "Get user Success!",
      data: await AuthService.getUserFromToken(req.body),
    }).send(res);
  };
  static login = async (req, res) => {
    new SuccessResponse({
      message: "Login Success!",
      data: await AuthService.signIn(req.body),
    }).send(res);
  };
  static signup = async (req, res) => {
    new CREATED({
      message: "Registered OK!",
      data: await AuthService.signUp(req.body),
    }).send(res);
  };
  static logout = async (req, res) => {
    new SuccessResponse({
      message: "Logout Success!",
      data: await AuthService.signOut({
        ...req.user,
        userId: req.userId,
      }),
    }).send(res);
  };

  static handleChangeInfo = async (req, res) => {
    new SuccessResponse({
      message: "Change Info Success!",
      data: await AuthService.handleChangeInfo(req.body),
    }).send(res);
  };
}

module.exports = AuthController;
