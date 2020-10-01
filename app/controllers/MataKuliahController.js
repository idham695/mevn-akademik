import MataKuliah from "../model/MataKuliah";

import Semester from "../model/Semester";
import Prodi from "../model/Prodi";

exports.create = async (req, res) => {
  const namaProdi = await Prodi.findById(req.body.prodiId);
  if (!namaProdi) throw Error("prodi tidak ada");

  const namaSemester = await Semester.findById(req.body.semesterId);
  if (!namaSemester) throw Error("semester tidak ada");

  const newMataKuliah = new MataKuliah({
    nama: req.body.nama,
    sks: req.body.sks,
    semester: req.body.semesterId,
    prodi: req.body.prodiId,
  });

  try {
    const mataKuliah = await newMataKuliah.save();
    if (!mataKuliah) throw Error("gagal input data maya kuliah");
    res.status(200).json(mataKuliah);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const mataKuliah = await MataKuliah.find()
      .populate("semester", "semester")
      .populate("prodi", "nama");

    if (!mataKuliah) throw Error("data mata kuliah tidak ada");
    res.status(200).json(mataKuliah);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const mataKuliah = await MataKuliah.findById(id)
      .populate("semester")
      .populate("prodi");

    if (!mataKuliah) throw Error("data mata kuliah tidak ada");

    res.status(200).json(mataKuliah);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.update = async (req, res) => {
  const namaProdi = await Prodi.findById(req.body.prodiId);
  if (!namaProdi) throw Error("prodi tidak ada");

  const namaSemester = await Semester.findById(req.body.semesterId);
  if (!namaSemester) throw Error("semester tidak ada");

  const updateMataKuliah = {
    nama: req.body.nama,
    sks: req.body.sks,
    semester: req.body.semesterId,
    prodi: req.body.prodiId,
  };

  const id = req.params.id;

  try {
    const mataKuliah = await MataKuliah.findByIdAndUpdate(
      id,
      updateMataKuliah,
      {
        useFindAndModify: false,
      }
    );

    if (!mataKuliah) throw Error("gagal update data mata kuliah");

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const mataKuliah = await MataKuliah.findById(req.params.id);
    if (!mataKuliah) throw Error("data mata kuliah tidak ada");

    const removed = await mataKuliah.remove();
    if (!removed) throw Error("gagal menghapus data mata kuliah");

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
