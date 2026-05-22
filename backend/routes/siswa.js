  const express = require("express");
  const router = express.Router();
  const db = require("../config/db");
  
  const {
  classifyStudent
} = require("../utils/c45");

  

  

  console.log("SISWA ROUTE KELOAD");


  // ===============================
  // 🔥 TRAINING DATA (PAKE TABLE training_data)
  // ===============================

  function getTrainingData() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM training_data WHERE jurusan IS NOT NULL", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  // ===============================
  // 🔥 PROCESS (INPUT NILAI)
  // ===============================
  router.post("/process", async (req, res) => {

  try {

    const { user_id, ...nilai } = req.body;

    if (!user_id) {
      return res.status(400).json({
        message: "User ID wajib"
      });
    }

    // 🔥 AMBIL DATA SISWA DARI student_scores
    const studentQuery = `
      SELECT nama, kelas
      FROM student_scores
      WHERE user_id = ?
      LIMIT 1
    `;

    db.query(studentQuery, [user_id], (errStudent, studentRows) => {

      if (errStudent) {
        console.error(errStudent);
        return res.status(500).json({
          message: "Gagal mengambil data siswa"
        });
      }

      if (studentRows.length === 0) {
        return res.status(404).json({
          message: "Data student_scores tidak ditemukan"
        });
      }

      const student = studentRows[0];

      // =====================================
      // CEK SUDAH PERNAH PROSES?
      // =====================================

      db.query(
        "SELECT id FROM siswa WHERE user_id=? LIMIT 1",
        [user_id],
        async (err, rows) => {

          if (err) {
            console.error(err);
            return res.status(500).json({
              message: "DB Error"
            });
          }

          if (rows.length > 0) {
            return res.status(400).json({
              message: "Anda sudah melakukan rekomendasi"
            });
          }

          // =====================================
          // TRAINING DATA
          // =====================================

          const trainingQuery =
            "SELECT * FROM training_data WHERE jurusan IS NOT NULL";

          db.query(trainingQuery, async (err2, trainingData) => {

            if (err2) {
              console.error(err2);
              return res.status(500).json({
                message: "Gagal mengambil training data"
              });
            }

            // =====================================
            // CLASSIFICATION
            // =====================================

            const result = classifyStudent(
              nilai,
              trainingData
            );

            // =====================================
            // INSERT HASIL
            // =====================================

            db.query(
              `
              INSERT INTO siswa
              (
                user_id,
                nama,
                kelas,
                jurusan,
                confidence,
                status,
                alasan,
                tree,
                entropy,
                information_gain
              )
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              `,
              [
                user_id,
                student.nama,
                student.kelas,
                result.jurusan,
                result.confidence,
                "Sudah Diproses",
                JSON.stringify(result.alasan),
                null,
                result.entropy,
                result.information_gain
              ],
              (err3) => {

                if (err3) {
                  console.error(err3);

                  return res.status(500).json({
                    message: "Gagal menyimpan hasil"
                  });
                }

                res.json({
                  jurusan: result.jurusan,
                  confidence: result.confidence,
                  alasan: result.alasan,
                  detail_perhitungan: {
                    entropy: result.entropy,
                    information_gain: result.information_gain
                  }
                });

              }
            );

          });

        }
      );

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Terjadi kesalahan sistem"
    });

  }

});


  // ===============================
  // 🔥 LATEST (FIXED)
  // ===============================
  router.get("/latest/:user_id", (req, res) => {
    const { user_id } = req.params;

    const query = `
  SELECT 
    s.jurusan,
    s.confidence,
    s.alasan,
    s.tree,
    s.entropy,
    s.information_gain,
    sc.*,
    (
      COALESCE(sc.pai,0)+COALESCE(sc.ppkn,0)+COALESCE(sc.bahasa_indonesia,0)+
      COALESCE(sc.bahasa_inggris,0)+COALESCE(sc.matematika_umum,0)+
      COALESCE(sc.ipa,0)+COALESCE(sc.ips,0)+COALESCE(sc.bahasa_daerah,0)+
      COALESCE(sc.pjok,0)+COALESCE(sc.seni,0)+COALESCE(sc.informatika,0)
    ) / 11 AS rataRata
  FROM siswa s
  LEFT JOIN student_scores sc ON sc.user_id = s.user_id
  WHERE s.user_id = ?
  ORDER BY s.id DESC
  LIMIT 1
  `;

    db.query(query, [user_id], (err, rows) => {
    if (err) return res.status(500).json(err);

    if (!rows.length) {
      console.log("LATEST DATA: KOSONG");
      return res.json(null);
    }

    console.log("LATEST DATA:", rows[0]);
    res.json(rows[0]);
  });
  });


  // ===============================
  // 🔥 KUOTA (FIXED)
  // ===============================
  router.get("/kuota", (req, res) => {

  const totalQuery = `
SELECT COUNT(*) as total
FROM student_scores
`;

  const processedQuery = `
  SELECT COUNT(*) as processed
  FROM siswa
  WHERE status = 'Sudah Diproses'
`;

    const dataQuery = `
SELECT
  u.nama,
  u.kelas,

  s.status,
  s.jurusan,
  s.confidence,

  (
    COALESCE(sc.pai,0)+
    COALESCE(sc.ppkn,0)+
    COALESCE(sc.bahasa_indonesia,0)+
    COALESCE(sc.bahasa_inggris,0)+
    COALESCE(sc.matematika_umum,0)+
    COALESCE(sc.ipa,0)+
    COALESCE(sc.ips,0)+
    COALESCE(sc.bahasa_daerah,0)+
    COALESCE(sc.pjok,0)+
    COALESCE(sc.seni,0)+
    COALESCE(sc.informatika,0)
  ) / 11 AS rataRata

FROM siswa s

LEFT JOIN users u
ON u.id = s.user_id

LEFT JOIN student_scores sc
ON sc.user_id = s.user_id

ORDER BY rataRata DESC, s.confidence DESC
`;

    db.query(totalQuery, (err1, totalRes) => {
      if (err1) return res.status(500).json(err1);

      db.query(processedQuery, (err2, processedRes) => {
        if (err2) return res.status(500).json(err2);

        db.query(dataQuery, (err3, rows) => {
          if (err3) return res.status(500).json(err3);

          const total = totalRes[0].total;
          const processed = processedRes[0].processed;
          const pending = total - processed;

          const paket = {};
          ["A","B","C","D","E","F","G"].forEach(p => {
  paket[p] = { kuota: 36, data: [] };
});

          rows.forEach(s => {
            if (!s.jurusan) return;

            const p = s.jurusan.replace("Paket", "").trim();

            paket[p].data.push({
              nama: s.nama || "Tanpa Nama",
              kelas: s.kelas || "-",
              confidence: s.confidence,
              rataRata: Number(s.rataRata),
            });
          });

          Object.keys(paket).forEach(p => {
            paket[p].data = paket[p].data.map((s, i) => ({
              ...s,
              rank: i + 1
            }));
          });

          res.json({
            total,
            processed,
            pending,
            paket
          });
        });
      });
    });
  });


  // ===============================
  // 🔥 RANKING (FIXED)
  // ===============================
  router.get("/ranking", (req, res) => {
    const query = `
  SELECT 
    u.nama,
    u.kelas,
    s.jurusan,
    s.confidence,
    (
      COALESCE(sc.pai,0)+COALESCE(sc.ppkn,0)+COALESCE(sc.bahasa_indonesia,0)+
      COALESCE(sc.bahasa_inggris,0)+COALESCE(sc.matematika_umum,0)+
      COALESCE(sc.ipa,0)+COALESCE(sc.ips,0)+COALESCE(sc.bahasa_daerah,0)+
      COALESCE(sc.pjok,0)+COALESCE(sc.seni,0)+COALESCE(sc.informatika,0)
    ) / 11 AS rataRata
  FROM siswa s
  JOIN users u ON u.id = s.user_id
  LEFT JOIN student_scores sc ON sc.user_id = s.user_id
  WHERE LOWER(u.role) = 'siswa'
  ORDER BY rataRata DESC, s.confidence DESC
  `;

    db.query(query, (err, rows) => {
      if (err) return res.status(500).json(err);

      res.json(rows);
    });
  });


  module.exports = router;