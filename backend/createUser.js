const bcrypt = require("bcryptjs");
const db = require("./config/db");

async function createUsers() {
  const password = await bcrypt.hash("123456", 10);

  const users = [
    {
      name: "Admin",
      email: "admin@gmail.com",
      role: "admin",
      nis: null,
      nip: null,
      kelas: null
    },
    {
      name: "Pak Budi",
      email: "guru@gmail.com",
      role: "guru",
      nis: null,
      nip: "198501012010011001",
      kelas: null
    },
    {
      name: "Ahmad Rizki",
      email: "siswa@gmail.com",
      role: "siswa",
      nis: "12345",
      nip: null,
      kelas: "10A"
    }
  ];

  users.forEach((user) => {
    const sql = `
      INSERT INTO users (name, email, password, role, nis, nip, kelas) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        user.nama,
        user.email,
        password,
        user.role,
        user.nis,
        user.nip,
        user.kelas
      ],
      (err, result) => {
        if (err) return console.log(err);
        console.log(`${user.role} created ✅`);
      }
    );
  });
}

createUsers();