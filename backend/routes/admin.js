const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { classifyStudent } = require("../utils/c45");

// 🔥 DASHBOARD ADMIN
// 🔥 DASHBOARD ADMIN - FIXED
// 🔥 DASHBOARD ADMIN - FIXED
router.get("/dashboard", (req, res) => {

  const statsQuery = `
    SELECT
      (SELECT COUNT(*) FROM student_scores) AS totalSiswa,
      (SELECT COUNT(*) FROM training_data) AS totalTraining,
      (SELECT COUNT(*) FROM siswa WHERE jurusan IS NOT NULL) AS totalRekomendasi,
      (
        (SELECT COUNT(*) FROM student_scores) -
        (SELECT COUNT(*) FROM siswa WHERE jurusan IS NOT NULL)
      ) AS pending
  `;

  const distribusiQuery = `
    SELECT
      s.jurusan AS jurusan,
      COUNT(*) AS jumlah
    FROM siswa s
    WHERE s.jurusan IS NOT NULL
    GROUP BY s.jurusan
    ORDER BY jumlah DESC
  `;

  db.query(statsQuery, (err, statsResult) => {
    if (err) {
      console.error("ERROR STATS:", err);
      return res.status(500).json(err);
    }

    db.query(distribusiQuery, (err2, distribusiResult) => {
      if (err2) {
        console.error("ERROR DISTRIBUSI:", err2);
        return res.status(500).json(err2);
      }

      const distribusi = distribusiResult.map(d => ({
        jurusan: d.jurusan,
        siswa: d.jumlah
      }));

      const pie = distribusiResult.map(d => ({
        name: d.jurusan,
        value: d.jumlah
      }));

      res.json({
        stats: {
          totalSiswa: statsResult[0].totalSiswa,
          totalTraining: statsResult[0].totalTraining,
          totalRekomendasi: statsResult[0].totalRekomendasi,
          pending: statsResult[0].pending,
          akurasi: "90%"
        },
        distribusi,
        pie
      });
    });
  });
});

// 🔥 GET TRAINING DATA
router.get("/training-data", (req, res) => {
  db.query("SELECT * FROM training_data", (err, result) => {
    if (err) {
  console.error("ERROR SISWA:", err);
  return res.status(500).json(err);
}

    const dataWithAvg = result.map((d) => {
      const total =
        Number(d.pai || 0) +
        Number(d.ppkn || 0) +
        Number(d.bahasa_indonesia || 0) +
        Number(d.bahasa_inggris || 0) +
        Number(d.matematika_umum || 0) +
        Number(d.ipa || 0) +
        Number(d.ips || 0) +
        Number(d.bahasa_daerah || 0) +
        Number(d.pjok || 0) +
        Number(d.seni || 0) +
        Number(d.informatika || 0);

      return {
        ...d,
        rata_total: (total / 11).toFixed(1),
      };
    });

    res.json(dataWithAvg);
  });
});

// 🔥 CREATE TRAINING
router.post("/training-data", (req, res) => {
  db.query("INSERT INTO training_data SET ?", req.body, (err) => {
    if (err) {
  console.error("ERROR SISWA:", err);
  return res.status(500).json(err);
}

    res.json({ message: "Data berhasil ditambah" });
  });
});

// 🔥 UPDATE TRAINING
router.put("/training-data/:id", (req, res) => {
  const { id } = req.params;

  const data = {
    ...req.body,
    pai: Number(req.body.pai) || 0,
    ppkn: Number(req.body.ppkn) || 0,
    bahasa_indonesia: Number(req.body.bahasa_indonesia) || 0,
    bahasa_inggris: Number(req.body.bahasa_inggris) || 0,
    matematika_umum: Number(req.body.matematika_umum) || 0,
    ipa: Number(req.body.ipa) || 0,
    ips: Number(req.body.ips) || 0,
    bahasa_daerah: Number(req.body.bahasa_daerah) || 0,
    pjok: Number(req.body.pjok) || 0,
    seni: Number(req.body.seni) || 0,
    informatika: Number(req.body.informatika) || 0,
  };

  db.query(
    "UPDATE training_data SET ? WHERE id = ?",
    [data, id],
    (err) => {
      if (err) {
  console.error("ERROR SISWA:", err);
  return res.status(500).json(err);
}
      res.json({ message: "Data berhasil diupdate" });
    }
  );
});

// 🔥 DELETE TRAINING
router.delete("/training-data/:id", (req, res) => {
  db.query("DELETE FROM training_data WHERE id = ?", [req.params.id], (err) => {
    if (err) {
  console.error("ERROR SISWA:", err);
  return res.status(500).json(err);
}
    res.json({ message: "Data berhasil dihapus" });
  });
});

// 🔥 GET DATA SISWA (PURE SISWA + NILAI)
// 🔥 GET DATA SISWA STATS
router.get("/siswa-stats", (req, res) => {

  const query = `
SELECT
  COUNT(*) AS totalSiswa,
  SUM(
    CASE
      WHEN EXISTS (
        SELECT 1
        FROM siswa sr
        WHERE sr.user_id = COALESCE(ss.user_id, um.id)
          AND sr.jurusan IS NOT NULL
      ) THEN 1
      ELSE 0
    END
  ) AS rekomendasiDibuat
FROM student_scores ss
LEFT JOIN (
  SELECT LOWER(TRIM(nama)) AS normalized_nama, MIN(id) AS id
  FROM users
  GROUP BY LOWER(TRIM(nama))
) um
  ON um.normalized_nama = LOWER(TRIM(ss.nama))
`;

  db.query(query, (err, rows) => {

    if (err) {
      console.error("ERROR STATS:", err);
      return res.status(500).json(err);
    }

    const totalSiswa = rows[0].totalSiswa || 0;
    const rekomendasiDibuat = rows[0].rekomendasiDibuat || 0;

    res.json({
  totalSiswa,
  rekomendasiDibuat,
  pending: totalSiswa - rekomendasiDibuat
});

  });

});

// 🔥 GET DATA SISWA
router.get("/siswa-data", (req, res) => {

  const query = `
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

  CASE
    WHEN EXISTS (
      SELECT 1
      FROM siswa sr
      WHERE sr.user_id = COALESCE(ss.user_id, um.id)
        AND sr.jurusan IS NOT NULL
    )
    THEN 'Sudah Diproses'
    ELSE 'Belum Diproses'
  END AS status,

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

LEFT JOIN (
  SELECT LOWER(TRIM(nama)) AS normalized_nama, MIN(id) AS id
  FROM users
  GROUP BY LOWER(TRIM(nama))
) um
ON um.normalized_nama = LOWER(TRIM(ss.nama))

ORDER BY ss.nama ASC
`;

  db.query(query, (err, result) => {

    if (err) {
      console.error("ERROR SISWA:", err);
      return res.status(500).json(err);
    }

    res.json(result);

  });

});

router.delete("/siswa-data/:id", (req, res) => {

  const { id } = req.params;

  db.query(
    "DELETE FROM student_scores WHERE id = ?",
    [id],
    (err) => {

      if (err) {
        console.error("DELETE ERROR:", err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Data berhasil dihapus"
      });

    }
  );

});
router.put("/siswa-data/:id", (req, res) => {

  const { id } = req.params;

  const {
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
  } = req.body;

  const getUserQuery = `
    SELECT id
    FROM users
    WHERE LOWER(TRIM(nama)) = LOWER(TRIM(?))
    LIMIT 1
  `;

  db.query(getUserQuery, [nama], (userErr, userResult) => {
    if (userErr) {
      console.error("USER ERROR:", userErr);
      return res.status(500).json(userErr);
    }

    const resolvedUserId = userResult.length > 0 ? userResult[0].id : null;

    const query = `
      UPDATE student_scores SET
        user_id = ?,
        nama = ?,
        kelas = ?,
        pai = ?,
        ppkn = ?,
        bahasa_indonesia = ?,
        bahasa_inggris = ?,
        matematika_umum = ?,
        ipa = ?,
        ips = ?,
        bahasa_daerah = ?,
        pjok = ?,
        seni = ?,
        informatika = ?
      WHERE id = ?
    `;

    db.query(
      query,
      [
        resolvedUserId,
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
        id
      ],
      (err) => {

        if (err) {
          console.error("UPDATE ERROR:", err);
          return res.status(500).json(err);
        }

        // Sinkronisasi kelas ke tabel users
        if (resolvedUserId) {
          db.query(
            "UPDATE users SET kelas = ? WHERE id = ?",
            [kelas, resolvedUserId],
            (syncErr) => {
              if (syncErr) console.error("SYNC KELAS ERROR:", syncErr);
            }
          );
        }

        res.json({
          message: "Data siswa berhasil diupdate"
        });

      }
    );
  });

});
router.post("/siswa-data", (req, res) => {

  const {
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
  } = req.body;

  const checkQuery = `
    SELECT * FROM student_scores
    WHERE nama = ?
    AND kelas = ?
  `;

  db.query(checkQuery, [nama, kelas], (err, existing) => {

    if (err) {
      console.error("CHECK ERROR:", err);
      return res.status(500).json(err);
    }

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Siswa sudah ada"
      });
    }

    // 🔥 AUTO CARI USER_ID
    const getUserQuery = `
      SELECT id
      FROM users
      WHERE LOWER(TRIM(nama)) = LOWER(TRIM(?))
      LIMIT 1
    `;

    db.query(getUserQuery, [nama], (err, userResult) => {

      if (err) {
        console.error("USER ERROR:", err);
        return res.status(500).json(err);
      }

      // 🔥 AMBIL USER_ID
      const user_id =
        userResult.length > 0
          ? userResult[0].id
          : null;

      // 🔥 INSERT
      const query = `
        INSERT INTO student_scores (
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

      db.query(
        query,
        [
          user_id,
          nama,
          kelas,
          Number(pai) || 0,
          Number(ppkn) || 0,
          Number(bahasa_indonesia) || 0,
          Number(bahasa_inggris) || 0,
          Number(matematika_umum) || 0,
          Number(ipa) || 0,
          Number(ips) || 0,
          Number(bahasa_daerah) || 0,
          Number(pjok) || 0,
          Number(seni) || 0,
          Number(informatika) || 0
        ],
        (err, result) => {

          if (err) {
            console.error("INSERT ERROR:", err);
            return res.status(500).json(err);
          }

          // Sinkronisasi kelas ke tabel users
          if (user_id) {
            db.query(
              "UPDATE users SET kelas = ? WHERE id = ?",
              [kelas, user_id],
              (syncErr) => {
                if (syncErr) console.error("SYNC KELAS ERROR:", syncErr);
              }
            );
          }

          res.json({
            message: "Siswa berhasil ditambahkan"
          });

        }
      );

    });

  });

});


// 🔥 HASIL REKOMENDASI
router.get("/hasil-rekomendasi", (req, res) => {

 const query = `
SELECT 
  s.id,

  s.nama,
  s.kelas,

  s.jurusan,
  s.confidence,
  s.alasan,
  s.status,

  s.created_at,

  ss.ipa,
  ss.ips,
  ss.pai,
  ss.ppkn,
  ss.bahasa_indonesia,
  ss.bahasa_inggris,
  ss.matematika_umum,
  ss.bahasa_daerah,
  ss.pjok,
  ss.seni,
  ss.informatika

FROM siswa s

LEFT JOIN student_scores ss
ON ss.user_id = s.user_id

WHERE s.jurusan IS NOT NULL

ORDER BY s.id DESC
`;

  db.query(query, (err, result) => {

    if (err) {
      console.error("QUERY ERROR:", err);
      return res.status(500).json(err);
    }

    res.json(result);

  });

});

// 🔥 HAPUS HASIL REKOMENDASI
router.delete("/hasil-rekomendasi/:id", (req, res) => {

  const { id } = req.params;

  db.query(
    "DELETE FROM siswa WHERE id = ?",
    [id],
    (err) => {

      if (err) {
        console.error("DELETE ERROR:", err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Hasil rekomendasi berhasil dihapus"
      });

    }
  );

});

// 🔥 BULK PROCESS: proses semua siswa yang belum punya rekomendasi
router.post("/bulk-process", async (req, res) => {
  try {
    // Ambil training data
    const trainingData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM training_data WHERE jurusan IS NOT NULL",
        (err, rows) => (err ? reject(err) : resolve(rows))
      );
    });

    // Ambil semua siswa yang belum direkomendasikan.
    // Jika user_id di student_scores kosong, coba fallback dari users berdasarkan nama.
    const pendingRows = await new Promise((resolve, reject) => {
      db.query(
        `SELECT
          ss.*,
          COALESCE(ss.user_id, um.id) AS resolved_user_id
         FROM student_scores ss
         LEFT JOIN (
           SELECT LOWER(TRIM(nama)) AS normalized_nama, MIN(id) AS id
           FROM users
           GROUP BY LOWER(TRIM(nama))
         ) um
           ON um.normalized_nama = LOWER(TRIM(ss.nama))
         WHERE NOT EXISTS (
           SELECT 1
           FROM siswa sr
           WHERE sr.user_id = COALESCE(ss.user_id, um.id)
             AND sr.jurusan IS NOT NULL
         )`,
        (err, rows) => (err ? reject(err) : resolve(rows))
      );
    });

    if (pendingRows.length === 0) {
      return res.json({ message: "Tidak ada siswa yang perlu diproses.", processed: 0 });
    }

    let successCount = 0;
    let failCount = 0;
    let skippedCount = 0;
    const skippedNames = [];
    const unresolvedNames = [];

    const SCORE_KEYS = [
      "pai", "ppkn", "bahasa_indonesia", "bahasa_inggris",
      "matematika_umum", "ipa", "ips", "bahasa_daerah",
      "pjok", "seni", "informatika",
    ];

    for (const student of pendingRows) {
      const resolvedUserId = student.resolved_user_id;

      // Tidak bisa diproses jika belum punya akun users yang bisa dipetakan.
      if (!resolvedUserId) {
        skippedCount++;
        unresolvedNames.push(student.nama || `id:${student.id}`);
        continue;
      }

      // Lewati siswa yang nilainya belum lengkap (ada yang 0 atau NULL)
      const hasIncomplete = SCORE_KEYS.some(
        (k) => student[k] === null || student[k] === undefined || Number(student[k]) === 0
      );
      if (hasIncomplete) {
        skippedCount++;
        skippedNames.push(student.nama || `user_id:${student.user_id}`);
        continue;
      }

      try {
        const scores = {
          pai:              Number(student.pai),
          ppkn:             Number(student.ppkn),
          bahasa_indonesia: Number(student.bahasa_indonesia),
          bahasa_inggris:   Number(student.bahasa_inggris),
          matematika_umum:  Number(student.matematika_umum),
          ipa:              Number(student.ipa),
          ips:              Number(student.ips),
          bahasa_daerah:    Number(student.bahasa_daerah),
          pjok:             Number(student.pjok),
          seni:             Number(student.seni),
          informatika:      Number(student.informatika),
        };

        const result = classifyStudent(scores, trainingData);

        await new Promise((resolve, reject) => {
          db.query(
            `INSERT INTO siswa
              (user_id, nama, kelas, jurusan, confidence, status, alasan, tree, entropy, information_gain)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              resolvedUserId,
              student.nama,
              student.kelas,
              result.jurusan,
              result.confidence,
              "Sudah Diproses",
              JSON.stringify(result.alasan),
              null,
              result.entropy,
              result.information_gain,
            ],
            (err) => (err ? reject(err) : resolve())
          );
        });

        // Sinkronkan user_id di student_scores jika sebelumnya null.
        if (!student.user_id) {
          await new Promise((resolve, reject) => {
            db.query(
              "UPDATE student_scores SET user_id = ? WHERE id = ?",
              [resolvedUserId, student.id],
              (err) => (err ? reject(err) : resolve())
            );
          });
        }

        successCount++;
      } catch (e) {
        console.error(`Gagal proses user_id ${resolvedUserId}:`, e.message);
        failCount++;
      }
    }

    res.json({
      message: `Berhasil memproses ${successCount} siswa.${skippedCount > 0 ? ` Dilewati: ${skippedCount}.` : ""}${failCount > 0 ? ` Gagal: ${failCount}.` : ""}${unresolvedNames.length > 0 ? " Sebagian dilewati karena belum terhubung ke akun user." : ""}`,
      processed: successCount,
      skipped: skippedCount,
      skippedNames,
      unresolvedNames,
      failed: failCount,
    });

  } catch (err) {
    console.error("BULK PROCESS ERROR:", err);
    res.status(500).json({ message: "Terjadi kesalahan saat bulk process.", error: err.message });
  }
});

module.exports = router;