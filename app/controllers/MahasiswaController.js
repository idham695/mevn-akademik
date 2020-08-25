import Mahasiswa from "../model/Mahasiswa.js";
import Prodi from "../model/Prodi.js";

exports.create = async (req, res) => {
  const namaProdi = await Prodi.findById(req.body.prodiId);
  if (!namaProdi) throw Error("prodi tidak ada");
  const newMahasiswa = new Mahasiswa({
    NIM: req.body.NIM,
    nama: req.body.nama,
    prodi: req.body.prodiId,
    tempat_lahir: req.body.tempat_lahir,
    tanggal_lahir: req.body.tanggal_lahir,
    alamat: req.body.alamat,
    photo: req.file.path,
    tahun: req.body.tahun,
  });

  try {
    const mahasiswa = await newMahasiswa.save();
    if (!mahasiswa) throw Error("gagal input data mahasiswa");
    res.status(200).json(mahasiswa);
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
