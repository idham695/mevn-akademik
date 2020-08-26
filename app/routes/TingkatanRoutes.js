import tingkatan from "../controllers/TingkatanController";

import { Router } from "express";

const router = Router();

router.post("/", tingkatan.create);
router.get("/", tingkatan.findAll);

export default router;
