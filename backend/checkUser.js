const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jurusan_db",
});

db.query("SELECT id,nama,email,role,password FROM users", (err, res) => {
  if (err) throw err;

  console.log(res);

  process.exit();
});