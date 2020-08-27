import dosen from "../controllers/DosenController";

import { Router } from "express";

import multer from "multer";

const router = Router();

const imageFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb("Please upload only images", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/images/dosen");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: 1024 * 1024 * 10 },
});

router.post("/", upload.single("photo"), dosen.create);
router.get("/", dosen.findAll);
router.get("/:id", dosen.findOne);
router.put("/:id", upload.single("photo"), dosen.update);
router.delete("/:id", dosen.delete);

export default router;
