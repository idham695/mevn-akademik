import admin from "../controllers/AdminController";
import jwtverify from "../middleware/authJwt";

import { Router } from "express";

const router = Router();

router.post("/", admin.create);
router.post("/login", admin.login);
router.post("/krs", jwtverify.verifyToken, jwtverify.isAdmin, admin.insertKRS);

export default router;
