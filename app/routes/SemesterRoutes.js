import semester from "../controllers/SemesterController";

import { Router } from "express";

const router = Router();

router.post("/", semester.create);
router.get("/", semester.findAll);

export default router;
