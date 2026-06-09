// ============================================================
// uji_akurasi.js — Pengujian Confusion Matrix Dinamis dari DB
// Ditambah perhitungan TP, FP, FN, Precision, Recall, F1-Score
// ============================================================

const mysql = require('mysql2/promise');
const { processRecommendation } = require('./c45.js');

async function jalankanPengujianAkurasi() {
  const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jurusan_db' // Pastikan nama DB lo bener
  };

  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("=== MEMULAI KONEKSI DATABASE ===");

    const [dataTraining] = await connection.query(`SELECT * FROM training_data`);
    const [dataTesting] = await connection.query(`
      SELECT ss.*, s.jurusan AS jurusan_asli 
      FROM student_scores ss
      JOIN siswa s ON ss.user_id = s.user_id 
      WHERE s.status = 'Sudah Diproses'
    `);

    if (dataTraining.length === 0 || dataTesting.length === 0) {
      console.log("❌ Gagal: Data training atau data testing kosong di database.");
      return;
    }

    const targetClasses = ['Paket A', 'Paket B', 'Paket C', 'Paket D', 'Paket E', 'Paket F', 'Paket G'];
    
    // Inisialisasi Matriks
    let matriks = {};
    targetClasses.forEach(actualClass => {
        matriks[actualClass] = {};
        targetClasses.forEach(predictedClass => {
            matriks[actualClass][predictedClass] = 0;
        });
    });

    let prediksiBenar = 0;

    // Isi Matriks
    dataTesting.forEach((siswa) => {
      const hasilMesin = processRecommendation(siswa, dataTraining);
      const aktual = siswa.jurusan_asli;
      const prediksi = hasilMesin.jurusan;

      if (matriks[aktual] && matriks[aktual][prediksi] !== undefined) {
          matriks[aktual][prediksi] += 1;
      }
      if (prediksi === aktual) {
        prediksiBenar++;
      }
    });

    console.log("\n=== 1. TABEL CONFUSION MATRIX (Baris: Aktual | Kolom: Prediksi) ===");
    console.table(matriks);

    // ==========================================
    // PERHITUNGAN METRIK MULTI-CLASS
    // ==========================================
    console.log("\n=== 2. DETAIL METRIK PER KELAS (JURUSAN) ===");
    
    let totalPrecision = 0;
    let totalRecall = 0;
    let totalF1 = 0;

    let metrikTabel = [];

    targetClasses.forEach(kelas => {
      let TP = matriks[kelas][kelas];
      let FP = 0;
      let FN = 0;

      // Hitung FP (Total dari Kolom prediksi kelas ini, kecuali TP)
      targetClasses.forEach(aktual => {
        if (aktual !== kelas) FP += matriks[aktual][kelas];
      });

      // Hitung FN (Total dari Baris aktual kelas ini, kecuali TP)
      targetClasses.forEach(prediksi => {
        if (prediksi !== kelas) FN += matriks[kelas][prediksi];
      });

      // Hitung Metrics (Cegah pembagian dengan 0 menggunakan logika or || 0)
      let precision = TP + FP === 0 ? 0 : TP / (TP + FP);
      let recall = TP + FN === 0 ? 0 : TP / (TP + FN);
      let f1Score = precision + recall === 0 ? 0 : 2 * (precision * recall) / (precision + recall);

      totalPrecision += precision;
      totalRecall += recall;
      totalF1 += f1Score;

      metrikTabel.push({
        "Paket": kelas,
        "TP": TP,
        "FP": FP,
        "FN": FN,
        "Precision": (precision * 100).toFixed(2) + "%",
        "Recall": (recall * 100).toFixed(2) + "%",
        "F1-Score": (f1Score * 100).toFixed(2) + "%"
      });
    });

    console.table(metrikTabel);

    // Rata-rata Metrik (Macro Average)
    let macroPrecision = (totalPrecision / targetClasses.length) * 100;
    let macroRecall = (totalRecall / targetClasses.length) * 100;
    let macroF1 = (totalF1 / targetClasses.length) * 100;
    let akurasiGlobal = (prediksiBenar / dataTesting.length) * 100;

    console.log("\n=== 3. HASIL EVALUASI AKHIR ===");
    console.log(`Total Data Uji     : ${dataTesting.length}`);
    console.log(`Prediksi Benar     : ${prediksiBenar}`);
    console.log(`Accuracy (Global)  : ${akurasiGlobal.toFixed(2)}%`);
    console.log(`Macro Precision    : ${macroPrecision.toFixed(2)}%`);
    console.log(`Macro Recall       : ${macroRecall.toFixed(2)}%`);
    console.log(`Macro F1-Score     : ${macroF1.toFixed(2)}%`);
    console.log("===============================\n");

  } catch (error) {
    console.error("❌ Terjadi Error saat menjalankan pengujian:", error);
  } finally {
    await connection.end();
  }
}

jalankanPengujianAkurasi();