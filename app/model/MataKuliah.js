import { Schema, model } from "mongoose";

const MataKuliahSchema = new Schema({
  nama: {
    type: string,
  },
  sks: {
    type: string,
  },
  prodi: {
    type: Schema.Types.ObjectId,
    ref: "prodi",
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: "semester",
  },
});

const MataKuliah = model("matakuliah", MataKuliahSchema);

export default MataKuliah;
