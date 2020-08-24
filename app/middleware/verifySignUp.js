import db from "../model/index.js";

const User = db.User;

checkDuplicateUsername = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (user) {
      return res
        .status(400)
        .send({ message: "Failed! Username is already in use" });
    }

    next();
  });
};

export default verifySignUp = {
  checkDuplicateUsername,
};
