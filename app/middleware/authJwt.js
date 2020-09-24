import jwt from "jsonwebtoken";
import config from "../config/auth.js";

function verifyToken(req, res, next) {
  let Header = req.headers["authorization"];

  if (typeof Header !== "undefined") {
    const bearer = Header.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    return res.status(403).send({ message: "Unauthorized" });
  }
}

function isMahasiswa(req, res, next) {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if (err) return res.status(401).send({ message: "Unauthorized" });
    else {
      if (authData.role !== "Mahasiswa") {
        return res
          .status(403)
          .send({ message: "Tidak di ijinkan selain aku mahasiswa" });
      } else {
        next();
      }
    }
  });
}

const authJwt = {
  verifyToken,
  isMahasiswa,
};

export default authJwt;
