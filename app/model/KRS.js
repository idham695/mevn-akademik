import { Schema, model } from "mongoose";

const KrsSchema = new Schema({
  mahasiswa: {
    type: Schema.Types.ObjectId,
    ref: "mahasiswa",
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: "semester",
  },
  matakuliah: {
    type: Schema.Types.ObjectId,
    ref: "matakuliah",
  },
});

const KRS = model("KRS", KrsSchema);

export default KRS;
