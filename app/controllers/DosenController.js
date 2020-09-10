import Dosen from "../model/Dosen.js";
import Prodi from "../model/Prodi.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/auth.js";
import Role from "../middleware/Role";

exports.create = async (req, res) => {
  const namaProdi = await Prodi.findById(req.body.prodiId);
  if (!namaProdi) throw Error("prodi tidak ada");
  const newDosen = new Dosen({
    nama: req.body.nama,
    NIDN: req.body.NIDN,
    password: bcrypt.hashSync(req.body.password, 8),
    prodi: req.body.prodiId,
    role: Role.Dosen,
    jabatan_fungsional: req.body.jabatan_fungsional,
    tempat_lahir: req.body.tempat_lahir,
    tanggal_lahir: req.body.tanggal_lahir,
    photo: req.file.path,
    alamat: req.body.alamat,
    pendidikan: req.body.pendidikan,
    status: req.body.status,
  });

  try {
    const searchDosen = await Dosen.findOne({
      NIDN: req.body.NIDN,
    });
    if (searchDosen) throw Error("dosen telah terdaftar");
    const dosen = await newDosen.save();
    if (!dosen) throw Error("gagal insert data dosen");
    res.status(200).json(dosen);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const dosen = await Dosen.findOne({
      NIDN: req.body.NIDN,
    });
    if (!dosen) throw Error("dosen tidak terdaftar");
    const passwordIsValid = await bcrypt.compareSync(
      req.body.password,
      dosen.password
    );
    if (!passwordIsValid) throw Error("password salah");
    var token = await jwt.sign(
      { id: dosen.id, role: dosen.role },
      config.secret,
      {
        expiresIn: 86400,
      }
    );
    res.status(200).json({
      status: "success",
      message: "Login Sukses",
      data: {
        dosen,
        accessToken: token,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const dosen = await Dosen.find().populate("prodi", "nama");
    if (!dosen) throw Error("data dosen tidak ada");
    res.status(200).json(dosen);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const dosen = await Dosen.findById(id).populate("prodi");
    if (!dosen) throw Error("data dosen tidak ada");
    res.status(200).json(dosen);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const namaProdi = Prodi.findById(req.body.prodiId);
  if (!namaProdi) throw Error("prodi tidak ada");
  const updateDosen = {
    nama: req.body.nama,
    NIDN: req.body.NIDN,
    prodi: req.body.prodiId,
    jabatan_fungsional: req.body.jabatan_fungsional,
    tempat_lahir: req.body.tempat_lahir,
    tanggal_lahir: req.body.tanggal_lahir,
    photo: req.file.path,
    alamat: req.body.alamat,
    pendidikan: req.body.pendidikan,
    status: req.body.status,
  };

  try {
    const dosen = await Dosen.findByIdAndUpdate(id, updateDosen, {
      useFindAndModify: false,
    });
    if (!dosen) throw Error("gagal update data dosen");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).jsob({ msg: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const dosen = await Dosen.findById(req.params.id);
    if (!dosen) throw Error("data dosen tidak ada");

    const removed = await dosen.remove();
    if (!removed) throw Error("gagal menghapus data dosen");

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
