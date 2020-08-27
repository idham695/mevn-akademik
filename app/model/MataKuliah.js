import { Schema, model } from "mongoose";

const MataKuliahSchema = new Schema({
  nama: {
    type: String,
  },
  sks: {
    type: Number,
  },
  prodi: {
    type: Schema.Types.ObjectId,
    ref: "prodi",
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: "semester",
  },
  dosen: {
    type: Schema.Types.ObjectId,
    ref: "dosen",
  },
});

const MataKuliah = model("matakuliah", MataKuliahSchema);

export default MataKuliah;
