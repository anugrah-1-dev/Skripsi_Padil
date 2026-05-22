const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");

//
// GET ALL USERS
//
router.get("/", (req, res) => {
  db.query(
    `
    SELECT 
      id,
      nama,
      email,
      role,
      kelas
    FROM users
    ORDER BY id DESC
    `,
    (err, rows) => {
      if (err) {
        console.error("ERROR USERS:", err);

        return res.status(500).json({
          message: "Gagal mengambil data user",
          error: err.message,
        });
      }

      res.json(rows);
    }
  );
});

//
// TAMBAH USER
//
router.post("/", async (req, res) => {
  try {
    const { nama, email, password, role, kelas } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      `
      INSERT INTO users
      (nama, email, password, role, kelas)
      VALUES (?, ?, ?, ?, ?)
      `,
      [nama, email, hashedPassword, role, kelas],
      (err, result) => {
        if (err) {
          console.error(err);

          return res.status(500).json({
            message: "Gagal tambah user",
          });
        }

        res.json({
          message: "User berhasil ditambahkan",
        });
      }
    );
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

//
// UPDATE USER
//
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email, password, role, kelas } = req.body;

    if (password && password !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        `
        UPDATE users
        SET
          nama = ?,
          email = ?,
          password = ?,
          role = ?,
          kelas = ?
        WHERE id = ?
        `,
        [nama, email, hashedPassword, role, kelas, id],
        (err) => {
          if (err) {
            console.error(err);

            return res.status(500).json({
              message: "Gagal update user",
            });
          }

          res.json({
            message: "User berhasil diupdate",
          });
        }
      );
    } else {
      db.query(
        `
        UPDATE users
        SET
          nama = ?,
          email = ?,
          role = ?,
          kelas = ?
        WHERE id = ?
        `,
        [nama, email, role, kelas, id],
        (err) => {
          if (err) {
            console.error(err);

            return res.status(500).json({
              message: "Gagal update user",
            });
          }

          res.json({
            message: "User berhasil diupdate",
          });
        }
      );
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

//
// DELETE USER
//
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM users WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Gagal hapus user",
        });
      }

      res.json({
        message: "User berhasil dihapus",
      });
    }
  );
});

module.exports = router;