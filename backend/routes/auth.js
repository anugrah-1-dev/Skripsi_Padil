const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");



// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password wajib diisi" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const user = result[0];

    // 🔥 PASSWORD CHECK BENER
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password salah" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "SECRET_KEY",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login success 🔥",
      token,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
        nis: user.nis || null,
        kelas: user.kelas || null,
        foto: user.foto || null,
        token,
      },
    });
  });
});
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  console.log("KIRIM KE:", email);
  if (!email) {
    return res.status(400).json({ message: "Email wajib diisi" });
  }

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (result.length === 0) {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    const user = result[0];

    // 🔥 generate token reset
    const token = crypto.randomBytes(32).toString("hex");
    const expire = new Date(Date.now() + 3600000); // 1 jam

    db.query(
  "UPDATE users SET reset_token=?, reset_expired=? WHERE id=?",
  [token, expire, user.id],
  (err) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ message: "Gagal simpan token" });
    }

    console.log("TOKEN KE DB BERHASIL");
  }
);

    // 🔥 EMAIL CONFIG
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fadhilpraa2024@gmail.com",
        pass: "bqpiujcfvfcxcoti"
      }
    });

    const resetLink = `${process.env.APP_URL || "http://localhost:5173"}/reset-password/${token}`;

    const mailOptions = {
      from: "SMA Harapan Bangsa",
      to: email,
      subject: "Reset Password",
      html: `
        <h3>Reset Password</h3>
        <p>Klik link berikut untuk reset password:</p>
        <a href="${resetLink}">${resetLink}</a>
      `
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Gagal kirim email" });
      }

      res.json({ message: "Link reset password berhasil dikirim ke email" });
    });
  });
}); 

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  db.query(
    "SELECT * FROM users WHERE reset_token = ? AND reset_expired > NOW()",
    [token],
    async (err, result) => {
      if (result.length === 0) {
        return res.status(400).json({ message: "Token tidak valid / expired" });
      }

      const user = result[0];

      // 🔥 HASH PASSWORD BARU
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "UPDATE users SET password = ?, reset_token = NULL, reset_expired = NULL WHERE id = ?",
        [hashedPassword, user.id],
        (err) => {
          if (err) return res.status(500).json({ message: "Gagal update password" });

          res.json({ message: "Password berhasil direset" });
        }
      );
    }
  );
});

module.exports = router;