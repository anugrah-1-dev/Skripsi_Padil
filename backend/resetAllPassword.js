const bcrypt = require("bcryptjs");
const db = require("./config/db");

async function resetPassword() {
  const hashed = await bcrypt.hash("123456", 10);

  db.query(
    "UPDATE users SET password = ?",
    [hashed],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("SEMUA PASSWORD BERHASIL DIRESET");
      }

      process.exit();
    }
  );
}

resetPassword();