import config from "../config/auth";
import db from "../model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const User = db.user;
const Role = db.role;

exports.findAll = (req, res) => {
  User.find().populate("roles", "-__v");
};
