import { Schema, model } from "mongoose";

// Create Schema
const ProdiSchema = new Schema({
  nama: {
    type: String,
  },
});

const Prodi = model("prodi", ProdiSchema);

export default Prodi;
