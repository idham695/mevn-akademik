import { Schema, model } from "mongoose";

// Create Schema
const MahasiswaSchema = new Schema({
  nama: {
    type: String,
  },
  NIM: {
    type: String,
  },
  prodi: {
    type: Schema.Types.ObjectId,
    ref: "prodi",
  },
  tempat_lahir: {
    type: String,
  },
  tanggal_lahir: {
    type: Date,
  },
  tahun: {
    type: Number,
  },
  photo: {
    type: String,
  },
  alamat: {
    type: String,
  },
});

const Mahasiswa = model("mahasiswa", MahasiswaSchema);

export default Mahasiswa;
