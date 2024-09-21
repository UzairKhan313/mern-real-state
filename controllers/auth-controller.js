import { StatusCodes } from "http-status-codes";

import User from "../models/user-model.js";
import { comparePassword, hashPassword } from "../utils/PasswordUtility.js";
import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/custom-error.js";
import { createJWT } from "../utils/tokenUtils.js";

//Register
export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    throw new BadRequestError(
      "Email Already reigster. Please pick another one."
    );
  }
  const hashedPassword = await hashPassword(password);
  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();
  res.status(StatusCodes.OK).json({ msg: "User Created Successfully!" });
};

//Sign-In
export const login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");
  // one day 24 hr.
  const oneDay = 1000 * 60 * 60 * 24;

  // Generating token
  const token = createJWT({ id: user._id });
  const { password: pass, ...rest } = user._doc;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.CREATED).json(rest);
};

//Google Sign-In
export const google = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const token = createJWT({ id: user._id });
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("token", token, { httpOnly: true })
      .status(StatusCodes.OK)
      .json(rest);
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = await hashPassword(generatedPassword);
    const newUser = new User({
      username:
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4),
      email: req.body.email,
      password: hashedPassword,
      avatar: req.body.photo,
    });
    await newUser.save();
    const token = createJWT({ id: newUser._id });
    const { password: pass, ...rest } = newUser._doc;
    res
      .cookie("token", token, { httpOnly: true })
      .status(StatusCodes.OK)
      .json(rest);
  }
};
//log-Out
export const logout = async (req, res, next) => {
  res.clearCookie("token");
  res.status(StatusCodes.OK).json("User has been logged out!");
};
