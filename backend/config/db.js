const mysql = require("mysql2");
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

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