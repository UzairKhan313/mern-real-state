import jwt from "jsonwebtoken";
import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/custom-error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) throw new UnauthorizedError("Unauthorized");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) throw new UnauthenticatedError("Forbidden");
    req.user = user;
    next();
  });
};
