# 📚 PANDUAN PENGGUNAAN SISTEM REKOMENDASI JURUSAN

## 🎯 Overview
Sistem ini adalah website sekolah SMA Harapan Bangsa dengan fitur **Sistem Rekomendasi Jurusan** menggunakan algoritma **Decision Tree C4.5** untuk skripsi.

---

## 🔐 3 ROLE PENGGUNA

### 1. **SISWA** 👨‍🎓
**Akses:**
- Lihat dashboard pribadi
- Input nilai 12 mata pelajaran untuk rekomendasi jurusan
- Kelola profil


### 2. **GURU** 👨‍🏫
**Akses:**
- Dashboard dengan statistik siswa
- Kelola data siswa
- Cetak laporan



### 3. **ADMIN** 👨‍💼
**Akses:**
- Dashboard dengan grafik lengkap
- Kelola data training (data historis)
- Kelola semua data siswa
- Sistem rekomendasi jurusan
- Lihat semua hasil rekomendasi
- Pengaturan sistem


---

## 📊 SISTEM REKOMENDASI JURUSAN

### Input: 11 Mata Pelajaran
1. **Matematika** (IPA)
2. **Bahasa Indonesia** (Umum)
3. **Bahasa Inggris** (Umum)
4. **Fisika** (IPA)
5. **Kimia** (IPA)
6. **Biologi** (IPA)
7. **Ekonomi** (IPS)
8. **Geografi** (IPS)
9. **Sosiologi** (IPS)
10. **Sejarah** (IPS)
11. **Seni Budaya** (Umum)
12. **PJOK** (Umum)

### Output: 11 Paket
- **IPA** - Ilmu Pengetahuan Alam
- **IPS** - Ilmu Pengetahuan Sosial

### Algoritma Decision Tree C4.5
Sistem menggunakan:
1. **Entropy**: Mengukur ketidakpastian data
2. **Information Gain**: Memilih atribut terbaik untuk split
3. **Split Decision**: Membagi data berdasarkan nilai mapel IPA vs IPS
4. **Confidence Level**: Tingkat keyakinan hasil (70-100%)

**Formula:**
```
Skor IPA = (Matematika + Fisika + Kimia + Biologi) / 4
Skor IPS = (Ekonomi + Geografi + Sosiologi + Sejarah) / 4

IF Skor IPA > Skor IPS THEN Jurusan = IPA
ELSE Jurusan = IPS
```

---

## 🚀 CARA MENGGUNAKAN

### A. Untuk SISWA

1. **Login** sebagai Siswa
2. Klik **"Rekomendasi Jurusan"** di sidebar
3. Input nilai 12 mata pelajaran (0-100)
4. Klik **"Proses Rekomendasi"**
5. Lihat hasil:
   - Jurusan rekomendasi (PAKET A-G)
   - Confidence level (%)
   - Alasan detail
   - Perhitungan skor
6. Hasil tersimpan di "Riwayat"

### B. Untuk GURU

1. **Login** sebagai Guru
2. **Kelola Data Siswa:**
   - Klik "Data Siswa"
3. **Lihat Hasil:**
   - Klik "Hasil Rekomendasi"
   - Filter by siswa
   - Export laporan

### C. Untuk ADMIN

1. **Login** sebagai Admin
2. **Kelola Data Training:**
   - Klik "Data Training"
   - Import/Export data CSV
   - Tambah data historis siswa + jurusan
3. **Monitor Sistem:**
   - Dashboard: Lihat statistik
   - Grafik distribusi jurusan
   - Akurasi model
4. **Sistem Rekomendasi:**
   - Sama seperti Siswa/Guru
   - Akses penuh semua fitur

---

## 💾 INTEGRASI DATABASE MYSQL

### Struktur Folder Backend (Recommended)
```
backend/
├── config/
│   └── database.php          # Koneksi MySQL
├── api/
│   ├── auth/
│   │   ├── login.php
│   │   └── logout.php
│   ├── recommendation/
│   │   ├── predict.php       # Algoritma C4.5
│   │   └── save.php
│   ├── training-data/
│   │   ├── list.php
│   │   ├── create.php
│   │   ├── update.php
│   │   └── delete.php
│   └── students/
│       ├── list.php
│       ├── create.php
│       ├── update.php
│       └── delete.php
└── classes/
    ├── User.php
    ├── Recommendation.php
    └── DecisionTree.php
```

### Update Frontend API Calls
Edit `/src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost/backend/api'; // URL backend Anda

// Uncomment actual fetch calls
// Comment mock data
```

### Database Schema
SQL script sudah ada di `README.md` section "Database Schema (MySQL)"

---

## 🎓 UNTUK PRESENTASI SKRIPSI

### Demo Flow:
1. **Tampilkan Landing Page**
   - Jelaskan fitur website sekolah
   - Tunjukkan section "Sistem Rekomendasi"

2. **Login sebagai ADMIN**
   - Tunjukkan dashboard dengan grafik
   - Jelaskan statistik: jumlah siswa, akurasi, dll

3. **Data Training**
   - Tunjukkan data historis siswa
   - Jelaskan: data ini untuk training model

4. **Sistem Rekomendasi**
   - Input contoh nilai siswa
   - LANGSUNG di depan penguji
   - Jelaskan tiap step:
     - 12 mata pelajaran
     - Kategori IPA/IPS/Umum
     - Rata-rata real-time

5. **Hasil Rekomendasi**
   - Tunjukkan output: IPA/IPS
   - Jelaskan confidence level
   - Bahas detail perhitungan:
     - Skor IPA = ...
     - Skor IPS = ...
     - Entropy = ...
     - Information Gain = ...

6. **Algoritma C4.5**
   - Jelaskan mengapa IPA/IPS dipilih
   - Tunjukkan alasan rekomendasi
   - Diskusi tentang akurasi

### Poin Penting untuk Dijelaskan:
✅ **3 Role** - Siswa, Guru, Admin (berbeda akses)
✅ **11 Mata Pelajaran** - Bukan cuma 4, tapi 12 lengkap
✅ **Decision Tree C4.5** - Bukan black box, transparan
✅ **IPA vs IPS** - Binary classification, fokus 2 jurusan
✅ **Confidence Level** - Bukan 100%, ada uncertainty
✅ **MySQL Ready** - Siap integrasi database (tunjukkan API layer)

---

## 🔧 TROUBLESHOOTING

### Error: "Cannot find module"
```bash
npm install
```

### Error: Port 5173 already in use
```bash
# Kill process atau ganti port
npm run dev -- --port 3000
```

### Login tidak redirect
- Check console browser (F12)
- Pastikan AuthContext loaded
- Clear localStorage

### Nilai tidak ter-input
- Pastikan angka 0-100
- Check validation error message

---

## 📞 KONTAK SUPPORT
Jika ada pertanyaan saat development:
- Check `/README.md` untuk detail teknis
- Check `/src/services/api.ts` untuk struktur API
- Check `/src/types/` untuk type definitions

---

**Dibuat untuk Skripsi:**
"Sistem Rekomendasi Jurusan pada Website Sekolah Menggunakan Metode Decision Tree C4.5"

Good luck! 🎓🚀
