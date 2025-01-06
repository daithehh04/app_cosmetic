const { BadRequestError, AuthFailureError } = require("../core/error.response");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { User } = require("../models/index");
const client = require("../dbs/init.redis");
const verifyMail = require("../utils/verifyMail");
class VerifyCodeService {
  static sendCode = async ({
    email,
    password,
    isSignIn = true,
    isSignUp = false,
  }) => {
    if (isSignUp) {
      const foundUser = await User.findOne({
        where: { email },
      });
      if (foundUser) throw new BadRequestError("User existed!");
    }

    if (isSignIn) {
      const foundUser = await User.findOne({
        where: { email },
      });
      if (!foundUser) throw new BadRequestError("Not found User!");
      const match = await bcrypt.compare(password, foundUser.password);
      if (!match) throw new AuthFailureError("Authentication Error");
    }
    const key = `otp_request:${email}`;
    const data = await client.hgetall(key);
    if (data.count && data.first_request_time) {
      const count = parseInt(data.count);
      const firstRequestTime = parseInt(data.first_request_time);
      const now = Date.now();

      // Kiểm tra số lần gửi OTP và thời gian
      if (count >= 3) {
        console.log("now - firstRequestTime::::", now - firstRequestTime);

        if (now - firstRequestTime < 24 * 60 * 60 * 1000) {
          // Kiểm tra xem có phải trong 24 giờ không
          return {
            success: false,
            status: 409,
            spam: true,
          };
        } else {
          // Reset số lần yêu cầu sau 24 giờ
          await client.hset(key, "count", 0);
        }
      }
    } else {
      // Tạo mới key cho người dùng
      await client.hset(key, "count", 0);
      await client.hset(key, "first_request_time", Date.now());
    }

    const code = crypto.randomInt(100000, 999999).toString();
    setTimeout(async () => {
      await verifyMail(email, "Shop App Confirm", {
        code,
      });
    }, 200);
    await client.set(`${email}_verify`, code, "EX", 60);
    await client.hincrby(key, "count", 1);
    await client.expire(key, 24 * 60 * 60);
    return {
      success: true,
      status: 200,
      spam: false,
    };
  };
  static verifyCode = async ({ email, code }) => {
    const savedCode = await client.get(`${email}_verify`);
    if (savedCode === code) {
      return true;
    }
    return false;
  };
}

module.exports = VerifyCodeService;
