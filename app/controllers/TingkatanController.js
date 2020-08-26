import Tingkatan from "../model/Tingkatan";

exports.create = async (req, res) => {
  const newTingkatan = new Tingkatan({
    tingkatan: req.body.tingkatan,
  });
  try {
    const tingkatan = await newTingkatan.save();
    if (!tingkatan) throw Error("gagal insert data tingkatan");
    res.status(200).json(tingkatan);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const tingkatan = await Tingkatan.find();
    if (!tingkatan) throw Error("data tingkatan tidak ada");
    res.status(200).json(tingkatan);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
