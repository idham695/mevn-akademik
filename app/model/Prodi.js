import { Schema, model } from "mongoose";

// Create Schema
const ProdiSchema = new Schema({
  nama: {
    type: String,
  },
  tingkatan: {
    type: Schema.Types.ObjectId,
    ref: "tingkatan",
  },
});

const Prodi = model("prodi", ProdiSchema);

export default Prodi;
