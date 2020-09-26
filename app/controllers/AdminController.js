import Admin from "../model/Admin";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Role from "../middleware/Role";
import config from "../config/auth.js";
import krs from "../model/KRS.js";
import mahasiswa from "../model/Mahasiswa";
import semester from "../model/Semester";
import Mahasiswa from "../model/Mahasiswa";
import Semester from "../model/Semester";

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
    var token = jwt.sign({ admin, role: admin.role }, config.secret, {
      expiresIn: 86400,
    });
    res.status(201).json({
      status: "success",
      message: "Login Sukses",
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.insertKRS = async (req, res) => {
  const mahasiswa = await Mahasiswa.findById(req.body.mahasiswa);
  if (!mahasiswa) throw Error("nama mahasiswa tidak terdaftar");

  const semester = await Semester.findById(req.body.semester);
  if (!semester) throw Error("semester tidak terdaftar");

  const newKRS = new krs({
    mahasiswa: req.body.mahasiswa,
    semester: req.body.semester,
  });
  try {
    const krs = newKRS.save();
    if (!krs) throw Error("gagal input khs");
    res.status(200).json(krs);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
