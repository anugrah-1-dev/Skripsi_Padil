const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

// 🔥 Helper biar gak kirim "" ke MySQL
const clean = (val) => val === "" ? null : val;

// ─────────────────────────────────────────────────────────────
// MULTER CONFIG (UPLOAD FOTO)
// ─────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/photos";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, "user_" + req.params.id + "_" + Date.now() + ext);
  }
});
const upload = multer({ storage });

// ─────────────────────────────────────────────────────────────
// GET PROFILE
// ─────────────────────────────────────────────────────────────
router.get("/:id", (req, res) => {
  const id = req.params.id;

  const sql = `
    SELECT id, nama, email, role, nis, nip, kelas, telepon, alamat, 
           tanggal_lahir, tempat_lahir, foto 
    FROM users 
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("GET ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json(result[0]);
  });
});

// ─────────────────────────────────────────────────────────────
// CHANGE PASSWORD
// ─────────────────────────────────────────────────────────────
router.put("/:id/password", async (req, res) => {
  const id = req.params.id;
  const { current_password, new_password } = req.body;

  db.query("SELECT password FROM users WHERE id=?", [id], async (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (result.length === 0) return res.status(404).json({ message: "User tidak ditemukan" });

    const isMatch = await bcrypt.compare(current_password, result[0].password);
    if (!isMatch) return res.status(400).json({ message: "Password lama tidak sesuai" });

    const hashed = await bcrypt.hash(new_password, 10);

    db.query("UPDATE users SET password=? WHERE id=?", [hashed, id], (err2) => {
      if (err2) return res.status(500).json({ message: "Gagal update password" });

      res.json({ message: "Password berhasil diubah" });
    });
  });
});

// ─────────────────────────────────────────────────────────────
// UPDATE PROFILE (🔥 FIX UTAMA ADA DI SINI)
// ─────────────────────────────────────────────────────────────
router.put("/:id", (req, res) => {
  const id = req.params.id;

  const {
    nama,
    email,
    kelas,
    telepon,
    alamat,
    tanggal_lahir,
    tempat_lahir
  } = req.body;

  const sql = `
    UPDATE users SET 
      nama=?,
      email=?,
      kelas=?,
      telepon=?,
      alamat=?,
      tanggal_lahir=?,
      tempat_lahir=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      nama,
      email,
      kelas,
      clean(telepon),
      clean(alamat),
      clean(tanggal_lahir), // 🔥 INI FIX ERROR LU
      clean(tempat_lahir),
      id
    ],
    (err) => {
      if (err) {
        console.error("UPDATE ERROR:", err);
        return res.status(500).json({ message: "Server error" });
      }

      db.query(
        "SELECT id, nama, email, role, nis, nip, kelas, foto FROM users WHERE id=?",
        [id],
        (err2, result) => {
          if (err2) return res.status(500).json({ message: "Server error" });

          res.json({
            message: "Profil berhasil diupdate",
            user: result[0]
          });
        }
      );
    }
  );
});

// ─────────────────────────────────────────────────────────────
// UPLOAD FOTO
// ─────────────────────────────────────────────────────────────
router.post("/:id/photo", upload.single("photo"), (req, res) => {
  const id = req.params.id;

  if (!req.file) {
    return res.status(400).json({ message: "File tidak ditemukan" });
  }

  const fotoUrl = "/uploads/photos/" + req.file.filename;

  db.query("UPDATE users SET foto=? WHERE id=?", [fotoUrl, id], (err) => {
    if (err) {
      console.error("PHOTO ERROR:", err);
      return res.status(500).json({ message: "Gagal simpan foto" });
    }

    res.json({ photoUrl: "http://localhost:5000" + fotoUrl });
  });
});

// ─────────────────────────────────────────────────────────────
// DELETE FOTO
// ─────────────────────────────────────────────────────────────
router.delete("/:id/photo", (req, res) => {
  const id = req.params.id;

  db.query("UPDATE users SET foto=NULL WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Server error" });

    res.json({ message: "Foto dihapus" });
  });
});

module.exports = router;