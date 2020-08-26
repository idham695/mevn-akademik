import { Schema, model } from "mongoose";

const SemesterSchema = new Schema({
  semester: {
    type: Number,
  },
});

const Semester = model("semester", SemesterSchema);

export default Semester;
