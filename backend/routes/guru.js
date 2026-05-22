const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { classifyStudent } = require("../utils/c45");





// GET /api/guru/dashboard
// GET /api/guru/dashboard
router.get("/dashboard", (req, res) => {

  const query = `
    SELECT

      (SELECT COUNT(*) FROM student_scores) AS totalSiswa,

      (
        SELECT COUNT(*)
        FROM siswa
        WHERE status = 'Sudah Diproses'
      ) AS totalRekomendasi,

      (
        (SELECT COUNT(*) FROM student_scores)
        -
        (
          SELECT COUNT(*)
          FROM siswa
          WHERE status = 'Sudah Diproses'
        )
      ) AS pending
  `;

  db.query(query, (err, rows) => {

    if (err) {
      console.error("ERROR DASHBOARD:", err);
      return res.status(500).json(err);
    }

    res.json(rows[0]);

  });

});

router.get("/siswa", (req, res) => {

  const {
    search = "",
    paket = "",
    kelas = ""
  } = req.query;

  let query = `
    SELECT
      ss.id,

      ss.nama,
      ss.kelas,

      ss.pai,
      ss.ppkn,
      ss.bahasa_indonesia,
      ss.bahasa_inggris,
      ss.matematika_umum,
      ss.ipa,
      ss.ips,
      ss.bahasa_daerah,
      ss.pjok,
      ss.seni,
      ss.informatika,

      COALESCE(s.status, 'Belum Diproses') AS status,
      s.jurusan,
      s.confidence,

      (
        (
          COALESCE(ss.pai,0) +
          COALESCE(ss.ppkn,0) +
          COALESCE(ss.bahasa_indonesia,0) +
          COALESCE(ss.bahasa_inggris,0) +
          COALESCE(ss.matematika_umum,0) +
          COALESCE(ss.ipa,0) +
          COALESCE(ss.ips,0) +
          COALESCE(ss.bahasa_daerah,0) +
          COALESCE(ss.pjok,0) +
          COALESCE(ss.seni,0) +
          COALESCE(ss.informatika,0)
        ) / 11
      ) AS rata

    FROM student_scores ss

    LEFT JOIN siswa s
    ON s.user_id = ss.user_id

    WHERE 1=1
  `;

  const params = [];

  // SEARCH
  if (search) {
    query += ` AND LOWER(ss.nama) LIKE ?`;
    params.push(`%${search.toLowerCase()}%`);
  }

  // FILTER PAKET
  if (paket) {
    query += ` AND s.jurusan = ?`;
    params.push(paket);
  }

// GANTI BAGIAN FILTER KELAS DI guru.js JADI INI:
if (kelas) {
  query += ` AND LOWER(TRIM(ss.kelas)) = LOWER(TRIM(?)) `;
  params.push(kelas);
}
  query += ` ORDER BY ss.nama ASC`;

  db.query(query, params, (err, result) => {

    if (err) {
      console.error("ERROR SISWA GURU:", err);
      return res.status(500).json(err);
    }

    res.json(result);

  });

});
 router.put("/siswa/:id/proses", (req, res) => {
  const { id } = req.params;

  const query = `
    UPDATE siswa 
    SET status = 'Sudah Diproses'
    WHERE id = ?
  `;

  db.query(query, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal update status" });
    }

    res.json({ message: "Status berhasil diupdate" });
  });
});

router.get("/rekomendasi", (req, res) => {
  db.query(
    "SELECT id, nama FROM users WHERE TRIM(LOWER(role)) = 'siswa'",
    (err, results) => {
      if (err) {
        console.error("ERROR:", err);
        return res.status(500).json({ message: err.message });
      }

      // 🔥 dummy rekomendasi
      const data = results.map((siswa) => ({
        id: siswa.id,
        nama: siswa.nama,
        jurusan: "IPA",
        confidence: 85,
        alasan: "Nilai IPA lebih tinggi dari IPS",
      }));

      res.json(data);
    }
  );
});
// 🔥 PROSES OTOMATIS REKOMENDASI
router.post("/proses/:id", (req, res) => {
  const { id } = req.params;

  const getSiswa = `
    SELECT * FROM siswa WHERE id = ?
  `;

  db.query(getSiswa, [id], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });

    if (rows.length === 0) {
      return res.status(404).json({ message: "Siswa tidak ditemukan" });
    }

    const s = rows[0];

    // 🔥 MAPPING 14 → 4 NILAI
    const matematika = (s.matematika_umum + s.matematika_lanjutan) / 2;

    const ipa = (s.fisika + s.kimia + s.biologi) / 3;

    const ips = (s.sejarah + s.ppkn) / 2;

    const bahasa =
      (s.bahasa_indonesia + s.bahasa_inggris + s.bahasa_daerah) / 3;

    // 🔥 MASUK AI
    const hasil = classifyStudent({
      matematika,
      ipa,
      ips,
      bahasa,
    });

    // 🔥 SIMPAN HASIL
    const updateQuery = `
      UPDATE siswa 
      SET 
        jurusan = ?, 
        confidence = ?, 
        alasan = ?, 
        status = 'Sudah Diproses'
      WHERE id = ?
    `;

    db.query(
      updateQuery,
      [hasil.jurusan, hasil.confidence, hasil.alasan, id],
      (err2) => {
        if (err2)
          return res.status(500).json({ message: err2.message });

        res.json({
          message: "Berhasil diproses",
          hasil,
        });
      }
    );
  });
});
module.exports = router;