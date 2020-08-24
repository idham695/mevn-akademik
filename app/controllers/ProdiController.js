import Prodi from "../model/Prodi";

exports.create = async (req, res) => {
  const newProdi = new Prodi({
    nama: req.body.nama,
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
    const prodi = await Prodi.find();
    if (!prodi) throw Error("Prodi tidak ada");
    res.status(200).json(prodi);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const prodi = await Prodi.findById(id);
    if (!prodi) throw Error("Prodi tidak ada");
    res.status(200).json(prodi);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    res.status(400).json({ message: "Nama prodi harus di isi" });
  }

  try {
    const prodi = await Prodi.findByIdAndUpdate(id, req.body, {
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
    if (!removed)
      throw Error("Something went wrong while trying to delete the prodi");

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, success: false });
  }
};
