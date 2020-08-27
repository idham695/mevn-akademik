import matakuliah from "../controllers/MataKuliahController";

import { Router } from "express";

const router = Router();

router.post("/", matakuliah.create);
router.get("/", matakuliah.findAll);
router.get("/:id", matakuliah.findOne);
router.put("/:id", matakuliah.update);
router.delete("/:id", matakuliah.delete);

export default router;
