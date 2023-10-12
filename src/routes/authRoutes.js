import express from "express";
const authRouter = express.Router();

import {
  registerUser,
  loginUser,
  currentUser,
  requestRefreshToken,
  userLogout,
  resetPassword,
  changeEmail,
} from "../controllers/authController.js";

import {
  verifyAccessToken,
  localVariables,
  verifyUser,
} from "../middlewares/authMidleware.js";

import {
  generateOTP,
  generateOTPMail,
  verifyOTPMail,
  verifyOTP,
} from "../controllers/otpController.js";

import { VerifyEmail, registerMail } from "../controllers/mailerController.js";

authRouter.post("/register", registerUser); //register mail
authRouter.post("/registerMail", registerMail); // send the email when register
authRouter.post("/login", loginUser); //login
authRouter.post("/refreshtoken", requestRefreshToken); //refresh token
authRouter.post("/logout/:id", userLogout); //log out
authRouter.get("/current", verifyAccessToken, currentUser); // get current user
authRouter.get("/verify-email", VerifyEmail); // //get verify-mail;
authRouter.get("/generateOTP", verifyUser, localVariables, generateOTP); // generate random OTP
authRouter.get("/verifyOTP", verifyUser, verifyOTP); // verify generated OTP
authRouter.put("/changeEmail", localVariables, generateOTPMail); // generate random OTP
authRouter.put("/resetPassword", verifyUser, resetPassword); // use to reset password
authRouter.put("/resetEmail", verifyOTPMail, changeEmail); // use to reset password

export default authRouter;
