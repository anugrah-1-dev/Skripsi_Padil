const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
const envPath = fs.existsSync(path.join(__dirname, "../.env.local"))
  ? path.join(__dirname, "../.env.local")
  : path.join(__dirname, "../.env");
require("dotenv").config({ path: envPath });

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "jurusan_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("DB Error:", err);
    process.exit(1);
  } else {
    console.log("MySQL Connected ✅");
    connection.release();
  }
});

module.exports = pool;