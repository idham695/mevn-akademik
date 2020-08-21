import mongoose from "mongoose";

export default User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: "String",
    password: "String",
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);
