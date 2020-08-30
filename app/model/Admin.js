import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
});

const Admin = model("admin", AdminSchema);

export default Admin;
