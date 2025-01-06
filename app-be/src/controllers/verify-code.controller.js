const { SuccessResponse, CREATED } = require("../core/success.response.js");
const VerifyCodeService = require("../services/verify-code.service.js");
class VerifyCodeController {
  static verifyCode = async (req, res) => {
    new SuccessResponse({
      message: "Verify code Success!",
      data: await VerifyCodeService.verifyCode(req.body),
    }).send(res);
  };

  static sendCode = async (req, res) => {
    new SuccessResponse({
      message: "Send code Success!",
      data: await VerifyCodeService.sendCode(req.body),
    }).send(res);
  };
}
module.exports = VerifyCodeController;
