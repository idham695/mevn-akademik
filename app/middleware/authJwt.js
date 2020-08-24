import jwt from "jsonwebtoken";
import config from "../config/auth.js";

verifyToken = (req, res, next) => {
  let token = req.headers["bearer"];

  if (!token) {
    return res.status(403).send({ message: "No token, authorized denied" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.userId = decoded.id;
    next();
  });
};

export default authJwt = {
  verifyToken,
};
