import prodi from "../controllers/ProdiController.js";
import { Router } from "express";

const router = Router();

router.get("/", prodi.findAll);
router.get("/:id", prodi.findOne);
router.post("/", prodi.create);
router.put("/:id", prodi.update);
router.delete("/:id", prodi.delete);

export default router;
