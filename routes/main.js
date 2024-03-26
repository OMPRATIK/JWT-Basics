import { Router } from "express";

const router = Router();

import { login, dashboard } from "../controllers/main.js";
import authMiddleWare from "../middleware/auth.js";

router.route("/dashboard").get(authMiddleWare, dashboard);
router.route("/login").post(login);

export default router;
