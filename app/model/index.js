import dbConfig from "../config/db.js";
import mongoose from "mongoose";
import User from "./User.js";
import Role from "./Role.js";

mongoose.Promise = global.Promise;
export default db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = User;
db.role = Role;

db.ROLES = ["mahasiswa", "dosen", "admin"];
