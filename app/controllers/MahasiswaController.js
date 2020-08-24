import Prodi from "../model/Prodi.js";

exports.create = (req, res) => {
  const namaProdi = req.body.nama;
  Prodi.find({ nama: namaProdi }).then((prodi) => {
    if (!prodi) {
      return res.status(404).json({ message: "Prodi tidak ada" });
    }

    const mahasiswa = new Mahasiswa({
      NIM: req.body.NIM,
      nama: req.body.nama,
      prodi: namaProdi,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir,
      alamat: req.body.alamat,
      photo: req.file.path,
      tahun: req.body.tahun,
    })
      .then((result) => {
        res.status.json(201)({
          message: "Data Mahasiswa berhasil dimasukan",
          createdMahasiswa: {
            NIM: result.NIM,
            nama: result.nama,
          },
        });
      })
      .catch((err) => {
        res.status.json(500)({
          error: err,
        });
      });
  });
};
