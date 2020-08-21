import mongoose from "mongoose";

export default Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: "String",
  })
);
