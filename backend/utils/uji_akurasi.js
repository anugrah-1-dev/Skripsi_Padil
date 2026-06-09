// ============================================================
// uji_akurasi.js — Pengujian Confusion Matrix Dinamis dari DB
// ============================================================

const mysql = require('mysql2/promise');
const { processRecommendation } = require('./c45.js');

async function jalankanPengujianAkurasi() {
  // 1. KONFIGURASI KONEKSI DATABASE (Sesuaikan dengan DB lo bro)
  const dbConfig = {
    host: 'localhost',
    user: 'root',          // Ganti dengan username MySQL lo
    password: '',          // Ganti dengan password MySQL lo (kalau ada)
    database: 'jurusan_db'  // Ganti dengan nama database lo
  };

  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("=== MEMULAI KONEKSI DATABASE ===");

    // 2. TARIK 50 DATA TRAINING
    const [dataTraining] = await connection.query(`
      SELECT * FROM training_data 
    `);
    console.log(`✓ Berhasil menarik ${dataTraining.length} Data Training.`);

    // 3. TARIK 50 DATA SISWA (TESTING) DENGAN JURUSAN AKTUALNYA
    // Kita lakukan JOIN karena nilai mapel ada di student_scores, tapi label jurusan asli ada di tabel siswa
    const [dataTesting] = await connection.query(`
      SELECT ss.*, s.jurusan AS jurusan_asli 
      FROM student_scores ss
      JOIN siswa s ON ss.user_id = s.user_id 
      WHERE s.status = 'Sudah Diproses'
      
    `);
    console.log(`✓ Berhasil menarik ${dataTesting.length} Data Siswa untuk Testing.`);

    if (dataTraining.length === 0 || dataTesting.length === 0) {
      console.log("❌ Gagal: Data training atau data testing kosong di database.");
      return;
    }

    // 4. INISIALISASI MATRIKS 7x7 (Paket A sampai Paket G)
    const targetClasses = ['Paket A', 'Paket B', 'Paket C', 'Paket D', 'Paket E', 'Paket F', 'Paket G'];
    let matriks = {};
    targetClasses.forEach(actualClass => {
        matriks[actualClass] = {};
        targetClasses.forEach(predictedClass => {
            matriks[actualClass][predictedClass] = 0;
        });
    });

    let prediksiBenar = 0;

    // 5. PROSES KLASIFIKASI DENGAN C4.5 UNTUK SETIAP DATA SISWA
    dataTesting.forEach((siswa) => {
      // Panggil fungsi utama dari c45.js
      const hasilMesin = processRecommendation(siswa, dataTraining);
      
      const aktual = siswa.jurusan_asli;
      const prediksi = hasilMesin.jurusan;

      // Masukkan ke dalam koordinat Confusion Matrix [AKTUAL][PREDIKSI]
      if (matriks[aktual] && matriks[aktual][prediksi] !== undefined) {
          matriks[aktual][prediksi] += 1;
      }

      // Hitung jika tebakan algoritma C4.5 COCOK dengan data aktual
      if (prediksi === aktual) {
        prediksiBenar++;
      }
    });

    // 6. TAMPILKAN HASIL AKHIR DI TERMINAL
    console.log("\n=== TABEL CONFUSION MATRIX (Baris: Aktual | Kolom: Prediksi) ===");
    console.table(matriks);

    const akurasiGlobal = (prediksiBenar / dataTesting.length) * 100;
    console.log("=================================================");
    console.log(`Total Data Uji (Siswa)   : ${dataTesting.length}`);
    console.log(`Prediksi Benar oleh C4.5 : ${prediksiBenar}`);
    console.log(`Akurasi Sistem           : ${akurasiGlobal.toFixed(2)}%`);
    console.log("=================================================");

  } catch (error) {
    console.error("❌ Terjadi Error saat menjalankan pengujian:", error);
  } finally {
    // Putus koneksi DB setelah selesai
    await connection.end();
    console.log("=== KONEKSI DATABASE DITUTUP ===");
  }
}

// Eksekusi fungsi utama
jalankanPengujianAkurasi();