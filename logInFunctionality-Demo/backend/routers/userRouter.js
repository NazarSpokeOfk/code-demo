import { Router } from "express";
const router = new Router();

import {
  logInLimiter,
} from "./userRouterLimiter.js";

import {
  LogIn,
} from "../controllers/userController.js";

router.post("/login", logInLimiter, (req, res) => LogIn(req, res));


export default router;
