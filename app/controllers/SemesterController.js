import Semester from "../model/Semester";

exports.create = async (req, res) => {
  const newSemester = new Semester({
    semester: req.body.semester,
  });
  try {
    const semester = await newSemester.save();
    if (!semester) throw Error("gagal memasukan data semester");
    res.status(200).json(semester);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const semester = await Semester.find();
    if (!semester) throw Error("data semester tidak ada");
    res.status(200).json(semester);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
