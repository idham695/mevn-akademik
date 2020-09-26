import Mahasiswa from "../model/Mahasiswa.js";
import config from "../config/auth.js";
import Prodi from "../model/Prodi.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import KRS from "../model/KRS";
import MataKuliah from "../model/MataKuliah";

exports.getKRS = async (req, res) => {
  try {
    const krs = await KRS.find()
      .populate("mahasiswa")
      .populate("semester")
      .populate("matakuliah");
    if (!krs) throw Error("data krs tidak ada");
    res.status(200).json(krs);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.insertKRS = async (req, res) => {
  try {
    const matakuliah = await MataKuliah.find();
    if (!matakuliah) throw Error("mata kuliah tidak terdaftar");
    const insertMataKuliah = new KRS({
      matakuliah: req.body.matakuliah,
    });
    const krs = insertMataKuliah.save();
    if (!krs) throw Error("gagal input mata kuliah");
    res.status(200).json(krs);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.create = async (req, res) => {
  const namaProdi = await Prodi.findById(req.body.prodiId);
  if (!namaProdi) throw Error("prodi tidak ada");

  const newMahasiswa = new Mahasiswa({
    NIM: req.body.NIM,
    password: bcrypt.hashSync(req.body.password, 8),
    nama: req.body.nama,
    role: "Mahasiswa",
    prodi: req.body.prodiId,
    tempat_lahir: req.body.tempat_lahir,
    tanggal_lahir: req.body.tanggal_lahir,
    alamat: req.body.alamat,
    photo:
      "http://localhost:3000/uploads/images/mahasiswa/" + req.file.filename,
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
    }).populate("prodi");
    if (!mahasiswa) throw Error("NIM yang anda masukan salah");
    const passwordIsValid = await bcrypt.compareSync(
      req.body.password,
      mahasiswa.password
    );
    if (!passwordIsValid) throw Error("password salah");
    await jwt.sign(
      { mahasiswa, role: mahasiswa.role },
      config.secret,
      {
        expiresIn: 86400,
      },
      (error, token) => {
        res.status(200).json({
          status: "success",
          message: "Login Sukses",
          mahasiswa,
          token,
        });
      }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
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

exports.editPassword = async (req, res) => {
  const id = req.params.id;

  const mahasiswa = await Mahasiswa.findById(id);
  if (!mahasiswa) throw Error("nama mahasiswa tidak ada");
  const password = bcrypt.hashSync(req.body.password, 8);
  try {
    const update = await Mahasiswa.findOneAndUpdate(
      id,
      { $set: { password } },
      {
        useFindAndModify: false,
      }
    );
    console.log(update);
    if (!update) throw Error("gagal update password mahasiswa");
    res.status(200).json({
      status: "success",
      message: "Edit password berhasil",
    });
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
