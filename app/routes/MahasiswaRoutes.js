import mahasiswa from "../controllers/MahasiswaController";
import { Router } from "express";
import multer from "multer";
import authJwt from "../middleware/authJwt";
import jwt from "jsonwebtoken";
import config from "../config/auth";

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
    cb(null, "./uploads/images/mahasiswa");
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

router.post("/", upload.single("photo"), mahasiswa.create);
router.post("/login", mahasiswa.login);
router.get("/", authJwt.verifyToken, authJwt.isMahasiswa, mahasiswa.findAll);
router.put(
  "/editPassword/:id",
  [authJwt.verifyToken, authJwt.isMahasiswa],
  mahasiswa.editPassword
);
router.get("/:id", mahasiswa.findOne);
router.put("/:id", upload.single("photo"), mahasiswa.update);
router.delete("/:id", mahasiswa.delete);
router.get("/");
export default router;
