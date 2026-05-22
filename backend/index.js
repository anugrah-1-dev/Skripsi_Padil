const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const app = express();

// ─── Routes ──────────────────────────────────────────────────────────────────
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile"); // ← BARU
const guruRoutes = require("./routes/guru");
const siswaRoutes = require("./routes/siswa");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    "https://treesmaga.com",
    "https://www.treesmaga.com",
    "http://localhost:5173",
    "http://localhost:4173"
  ],
  credentials: true
}));


// ─── Serve static files untuk foto profil ───────────────────────────────────
// Foto tersimpan di backend/uploads/photos/
// Akses via: http://localhost:5000/uploads/photos/namafile.jpg
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Backend jalan bro 🔥");
});

// 🔥 BARU PAKE DI SINI
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes); // ← BARU
app.use("/api/siswa", siswaRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/guru", guruRoutes);
app.use("/api/users", userRoutes);





app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

setInterval(() => {}, 1000);
