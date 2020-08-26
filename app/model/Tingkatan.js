import { Schema, model } from "mongoose";

const TingkatanSchema = new Schema({
  tingkatan: {
    type: String,
  },
});

const Tingkatan = model("tingkatan", TingkatanSchema);

export default Tingkatan;
