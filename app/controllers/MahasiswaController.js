import Mahasiswa from "../model/Mahasiswa.js";
import config from "../config/auth.js";
import Prodi from "../model/Prodi.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Role from "../middleware/Role";

exports.create = async (req, res) => {
  const namaProdi = await Prodi.findById(req.body.prodiId);
  if (!namaProdi) throw Error("prodi tidak ada");

  const newMahasiswa = new Mahasiswa({
    NIM: req.body.NIM,
    password: bcrypt.hashSync(req.body.password, 8),
    nama: req.body.nama,
    role: Role.Mahasiswa,
    prodi: req.body.prodiId,
    tempat_lahir: req.body.tempat_lahir,
    tanggal_lahir: req.body.tanggal_lahir,
    alamat: req.body.alamat,
    photo: req.file.path,
    tahun: req.body.tahun,
  });

  try {
    const searchMahasiswa = await Mahasiswa.findOne({
      NIM: req.body.NIM,
    });
    if (searchMahasiswa) throw Error("mahasiswa telah terdaftar");
    const mahasiswa = await newMahasiswa.save();
    if (!mahasiswa) throw Error("gagal input data mahasiswa");
    res.status(200).json(mahasiswa);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findOne({
      NIM: req.body.NIM,
    });
    if (!mahasiswa) throw Error("mahasiswa tidak terdaftar");
    const passwordIsValid = await bcrypt.compareSync(
      req.body.password,
      mahasiswa.password
    );
    if (!passwordIsValid) throw Error("password salah");
    var token = await jwt.sign(
      { id: mahasiswa.id, role: mahasiswa.role },
      config.secret,
      {
        expiresIn: 86400,
      }
    );
    res.status(200).json({
      id: mahasiswa._id,
      username: mahasiswa.NIM,
      role: mahasiswa.role,
      accessToken: token,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.find().populate("prodi", "nama");
    if (!mahasiswa) throw Error("mahasiswa tidak ada");
    res.status(200).json(mahasiswa);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const mahasiswa = await Mahasiswa.findById(id).populate("prodi");
    if (!mahasiswa) throw Error("mahasiswa tidak ada");
    res.status(200).json(mahasiswa);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.update = async (req, res) => {
  const namaProdi = await Prodi.findById(req.body.prodiId);
  if (!namaProdi) throw Error("prodi tidak ada");

  const updateMahasiswa = {
    NIM: req.body.NIM,
    nama: req.body.nama,
    prodi: req.body.prodiId,
    tempat_lahir: req.body.tempat_lahir,
    tanggal_lahir: req.body.tanggal_lahir,
    alamat: req.body.alamat,
    photo: req.file.path,
    tahun: req.body.tahun,
  };
  const id = req.params.id;

  try {
    const mahasiswa = await Mahasiswa.findByIdAndUpdate(id, updateMahasiswa, {
      useFindAndModify: false,
    });
    if (!mahasiswa) throw Error("gagal update data mahasiswa");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findById(req.params.id);
    if (!mahasiswa) throw Error("Data mahasiswa tidak ada");

    const removed = await mahasiswa.remove();
    if (!removed) throw Error("Hapus data mahasiswa gagal");

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
