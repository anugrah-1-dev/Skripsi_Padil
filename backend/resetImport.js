const XLSX = require("xlsx");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

// =====================================
// DB
// =====================================

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jurusan_db",
});

// =====================================
// BACA EXCEL
// =====================================

const workbook = XLSX.readFile("./DATASHEET.xlsx");
console.log(workbook.SheetNames);
const sheet = workbook.Sheets["Data Peminatan"];

// header row dimulai dari baris ke-5
const raw = XLSX.utils.sheet_to_json(sheet, {
  range: 4,
});

console.log(raw.slice(0, 5));

// =====================================
// MAPPING KOLOM
// =====================================

const data = raw
  .filter((r) => r["__EMPTY_1"])
  .map((r) => ({

    nama: String(r["__EMPTY_1"] || "").trim(),

    kelas: String(r["__EMPTY_2"] || "").trim(),

    nis: String(r["__EMPTY_3"] || "").trim(),

    pai: Number(r["Isi dengan nilai rapor terbaru (0 – 100)"] || 0),

    ppkn: Number(r["__EMPTY_4"] || 0),

    bahasa_indonesia: Number(r["__EMPTY_5"] || 0),

    bahasa_inggris: Number(r["__EMPTY_6"] || 0),

    matematika_umum: Number(r["__EMPTY_7"] || 0),

    ipa: Number(r["__EMPTY_8"] || 0),

    ips: Number(r["__EMPTY_9"] || 0),

    bahasa_daerah: Number(r["__EMPTY_10"] || 0),

    pjok: Number(r["__EMPTY_11"] || 0),

    seni: Number(r["__EMPTY_12"] || 0),

    informatika: Number(r["__EMPTY_13"] || 0),

    jurusan: String(r["__EMPTY_14"] || "").trim(),

  }));

console.log("TOTAL DATA:", data.length);

// =====================================
// GROUP PER KELAS
// =====================================

const grouped = {};

for (const siswa of data) {
  if (!grouped[siswa.kelas]) {
    grouped[siswa.kelas] = [];
  }

  grouped[siswa.kelas].push(siswa);
}

// =====================================
// ACAK PER KELAS
// =====================================

Object.keys(grouped).forEach((kelas) => {
  grouped[kelas].sort(() => Math.random() - 0.5);
});

const trainingData = [];
const studentScores = [];

// tampung semua siswa dulu
const allStudents = [];

Object.keys(grouped).forEach((kelas) => {

  const siswaKelas = grouped[kelas];

  // acak per kelas
  siswaKelas.sort(() => Math.random() - 0.5);

  allStudents.push(...siswaKelas);

});

// acak global
allStudents.sort(() => Math.random() - 0.5);

// EXACT SPLIT
const trainingTarget = 152;

allStudents.forEach((siswa, index) => {

  if (index < trainingTarget) {
    trainingData.push(siswa);
  } else {
    studentScores.push(siswa);
  }

});

console.log("TRAINING:", trainingData.length);
console.log("STUDENT:", studentScores.length);

// =====================================
// INSERT TRAINING DATA
// =====================================
db.query("SET FOREIGN_KEY_CHECKS = 0");

db.query("TRUNCATE TABLE student_scores");
db.query("TRUNCATE TABLE training_data");


db.query("SET FOREIGN_KEY_CHECKS = 1");
trainingData.forEach((row) => {

  const sql = `
    INSERT INTO training_data
    (
      nama,
      kelas,
      pai,
      ppkn,
      bahasa_indonesia,
      bahasa_inggris,
      matematika_umum,
      ipa,
      ips,
      bahasa_daerah,
      pjok,
      seni,
      informatika,
      jurusan
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    row.nama,
    row.kelas,
    row.pai,
    row.ppkn,
    row.bahasa_indonesia,
    row.bahasa_inggris,
    row.matematika_umum,
    row.ipa,
    row.ips,
    row.bahasa_daerah,
    row.pjok,
    row.seni,
    row.informatika,
    row.jurusan,
  ]);
});

console.log("TRAINING DATA BERHASIL");

// =====================================
// GENERATE USER SISWA
// =====================================

const password = bcrypt.hashSync("123456", 10);

studentScores.forEach((row, index) => {

  const email = `siswa${index + 1}@gmail.com`;

  const insertUser = `
    INSERT INTO users
    (
      nama,
      email,
      password,
      role,
      kelas
    )
    VALUES (?, ?, ?, 'siswa', ?)
  `;

  db.query(
    insertUser,
    [
      row.nama,
      email,
      password,
      row.kelas,
    ],
    (err, result) => {

      if (err) {
        console.log(err);
        return;
      }

      const user_id = result.insertId;

      // =====================================
      // INSERT student_scores
      // =====================================

      const insertScore = `
        INSERT INTO student_scores
        (
          user_id,
          nama,
          kelas,
          pai,
          ppkn,
          bahasa_indonesia,
          bahasa_inggris,
          matematika_umum,
          ipa,
          ips,
          bahasa_daerah,
          pjok,
          seni,
          informatika
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(insertScore, [
        user_id,
        row.nama,
        row.kelas,
        row.pai,
        row.ppkn,
        row.bahasa_indonesia,
        row.bahasa_inggris,
        row.matematika_umum,
        row.ipa,
        row.ips,
        row.bahasa_daerah,
        row.pjok,
        row.seni,
        row.informatika,
      ]);
    }
  );
});

console.log("SELESAI SEMUA");