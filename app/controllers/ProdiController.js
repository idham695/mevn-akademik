import Prodi from "../model/Prodi";
import Tingkatan from "../model/Tingkatan";

exports.create = async (req, res) => {
  const namaTingkatan = Tingkatan.findById(req.body.tingkatanId);
  if (!namaTingkatan) throw Error("tingkatan tidak ada");
  const newProdi = new Prodi({
    nama: req.body.nama,
    tingkatan: req.body.tingkatanId,
  });

  try {
    const prodi = await newProdi.save();
    if (!prodi) throw Error("Insert data prodi gagal");

    res.status(200).json(prodi);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const prodi = await Prodi.find().populate("tingkatan", "tingkatan");
    if (!prodi) throw Error("Prodi tidak ada");
    res.status(200).json(prodi);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const prodi = await Prodi.findById(id).populate("tingkatan");
    if (!prodi) throw Error("Prodi tidak ada");
    res.status(200).json(prodi);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const namaTingkatan = Tingkatan.findById(req.body.tingkatanId);
  if (!namaTingkatan) throw Error("tingkatan tidak ada");

  const updateProdi = {
    nama: req.body.nama,
    tingkatan: req.body.tingkatanId,
  };

  try {
    const prodi = await Prodi.findByIdAndUpdate(id, updateProdi, {
      useFindAndModify: false,
    });
    if (!prodi) throw error("Gagal update data prodi");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const prodi = await Prodi.findById(req.params.id);
    if (!prodi) throw Error("Prodi tidak ada");

    const removed = await prodi.remove();
    if (!removed) throw Error("Error pada saat menghapus data prodi");

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, success: false });
  }
};
