const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
const envPath = fs.existsSync(path.join(__dirname, "../.env.local"))
  ? path.join(__dirname, "../.env.local")
  : path.join(__dirname, "../.env");
require("dotenv").config({ path: envPath });

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "jurusan_db"
});

db.connect((err) => {
  if (err) {
    console.error("DB Error:", err);
    process.exit(1);
  } else {
    console.log("MySQL Connected ✅");
  }
});

module.exports = db;