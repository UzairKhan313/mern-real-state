import express from "express";
import {
  google,
  logout,
  login,
  register,
} from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/register", register); //register
router.post("/login", login); //login
router.post("/google", google); //Google
router.get("/logout", logout); //log-Out

export default router;
