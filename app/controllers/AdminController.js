import Admin from "../model/Admin";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Role from "../middleware/Role";
import config from "../config/auth.js";

exports.create = async (req, res) => {
  const newAdmin = new Admin({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    role: Role.Admin,
  });
  try {
    const admin = await newAdmin.save();
    if (!admin) throw Error("gagal memasukan data admin");
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      username: req.body.username,
    });
    if (!admin) throw Error("akun tidak terdaftar");
    const passwordIsValid = await bcrypt.compareSync(
      req.body.password,
      admin.password
    );
    if (!passwordIsValid) throw Error("password salah");
    var token = jwt.sign({ id: admin.id, role: admin.role }, config.secret, {
      expiresIn: 86400,
    });
    res.status(201).json({
      id: admin._id,
      username: admin.username,
      role: admin.role,
      accessToken: token,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
