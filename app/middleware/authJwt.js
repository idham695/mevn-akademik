import jwt from "jsonwebtoken";
import config from "../config/auth.js";

const verifyToken = (req, res, next) => {
  let token = req.headers["x-auth-token"];

  if (!token) {
    return res.status(403).send({ message: "No token, authorized denied" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};

const isMahasiswa = (role) => (req, res, next) => {
  if (req.role !== role) {
    return res.status(403).send({
      message:
        "tidak diizinkan login menggunakan akun lain selain akun mahasiswa",
    });
  }
  next();
};

const isDosen = (role) => (req, res, next) => {
  if (req.role !== role) {
    return res.status(403).send({
      message: "tidak diizinkan login menggunakan akun lain selain akun dosen",
    });
  }
  next();
};

const isAdmin = (role) => (req, res, next) => {
  if (req.rol !== role) {
    return res.status(403).send({
      message: "tidak diizinkan login menggunakan akun lain selain akun admin",
    });
  }
  next();
};

const authJwt = {
  verifyToken,
  isMahasiswa,
  isAdmin,
  isDosen,
};

export default authJwt;
