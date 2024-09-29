import { hashPassword } from "../utils/PasswordUtility.js";
import User from "../models/user-model.js";
import { NotFoundError, UnauthorizedError } from "../errors/custom-error.js";
import { StatusCodes } from "http-status-codes";
import Listing from "../models/listing-model.js";

//Update User
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    throw new UnauthorizedError("You can only update your own account!");

  if (req.body.password) {
    req.body.password = await hashPassword(req.body.password);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      },
    },
    { new: true }
  );

  const { password, ...rest } = updatedUser._doc;

  res.status(StatusCodes.OK).json(rest);
};
//Delete User
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    throw new UnauthorizedError("You can only delete your own account!");

  await User.findByIdAndDelete(req.params.id);
  res.clearCookie("token");
  res.status(StatusCodes.OK).json({ msg: "User has been deleted!" });
};

// Get User Listing
export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    const listings = await Listing.find({ userRef: req.params.id });
    res.status(StatusCodes.OK).json(listings);
  } else {
    throw new UnauthorizedError(401, "You can only view your own listings!");
  }
};

// Get User
export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) throw new NotFoundError(404, "User not found!");

  const { password: pass, ...rest } = user._doc;

  res.status(StatusCodes.OK).json(rest);
};
