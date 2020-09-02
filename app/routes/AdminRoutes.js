import admin from "../controllers/AdminController";

import { Router } from "express";

const router = Router();

router.post("/", admin.create);
router.post("/login", admin.login);

export default router;
