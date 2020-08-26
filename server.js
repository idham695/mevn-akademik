import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import database from "./app/config/db.js";
import prodiRoutes from "./app/routes/ProdiRoutes";
import mahasiswaRoutes from "./app/routes/MahasiswaRoutes";
import semesterRoutes from "./app/routes/SemesterRoutes";
import tingkatanRoutes from "./app/routes/TingkatanRoutes";

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

const db = database.url;
// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/prodi", prodiRoutes);
app.use("/api/mahasiswa", mahasiswaRoutes);
app.use("/api/semester", semesterRoutes);
app.use("/api/tingkatan", tingkatanRoutes);

app.use("/uploads", express.static("uploads"));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Sistem akademik" });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
