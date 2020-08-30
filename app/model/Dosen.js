import { Schema, model } from "mongoose";

const DosenSchema = new Schema({
  nama: {
    type: String,
  },
  NIDN: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  prodi: {
    type: Schema.Types.ObjectId,
    ref: "prodi",
  },
  jabatan_fungsional: {
    type: String,
  },
  tempat_lahir: {
    type: String,
  },
  tanggal_lahir: {
    type: Date,
  },
  photo: {
    type: String,
  },
  alamat: {
    type: String,
  },
  pendidikan: {
    type: String,
  },
  status: {
    type: String,
  },
});

const Dosen = model("dosen", DosenSchema);

export default Dosen;
