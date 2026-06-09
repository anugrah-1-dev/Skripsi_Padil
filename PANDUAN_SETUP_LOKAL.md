# 🛠️ Panduan Setup & Menjalankan Project (Lokal)

Panduan ini digunakan untuk melakukan setup ulang setelah melakukan `git pull` di laptop baru/teman agar project berjalan lancar di lingkungan lokal menggunakan **Laragon / XAMPP**.

---

## 📌 Persyaratan Sistem (Prerequisites)
Pastikan laptop sudah terinstall aplikasi berikut:
1. **Node.js** (Minimal versi 16, disarankan versi LTS terbaru)
2. **Laragon** (Sangat disarankan) atau **XAMPP** untuk server MySQL.

---

## 🗄️ Langkah 1: Setup Database MySQL
1. Jalankan **Laragon** atau **XAMPP** Anda, lalu aktifkan service **MySQL / Database**.
2. Buka **phpMyAdmin** atau tool database favorit Anda (HeidiSQL, DBeaver, dll).
3. Buat database baru dengan nama:
   ```sql
   jurusan_db
   ```
4. Pilih database `jurusan_db` tersebut, lalu **Import** file:
   ```filepath
   Database.sql
   ```
   *(File `Database.sql` berada di folder utama/root dari project ini)*
5. Proses import selesai. Tabel-tabel seperti `users`, `siswa`, `student_scores`, dan `training_data` beserta data bawaannya sekarang sudah siap digunakan.

---

## 🚀 Langkah 2: Setup & Jalankan Backend (API Server)
1. Buka terminal baru dan masuk ke folder `backend`:
   ```bash
   cd backend
   ```
2. Sesuaikan konfigurasi database lokal pada file **`.env.local`**.
   Jika file `.env.local` belum ada atau ingin disesuaikan, buat/edit file `.env.local` di dalam folder `backend` dan isi seperti ini:
   ```env
   # Database (Lokal Laragon)
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=jurusan_db

   # Server
   PORT=5000

   # JWT Secret Key (Jangan diubah agar token login valid)
   JWT_SECRET=TreesMaga_JWT_S3cr3t_2026!

   # App URL & Email Service
   APP_URL=http://localhost:5000
   RESEND_API_KEY=re_a9EueDQC_Cixvzaxb544oLL9xazjGMKj8
   ```
   *Catatan: Sesuaikan `DB_USER` dan `DB_PASSWORD` dengan konfigurasi MySQL di laptop teman Anda (Default Laragon biasanya user: `root` dan password: kosong).*

3. Jalankan server backend:
   - Menggunakan node:
     ```bash
     node index.js
     ```
   - Atau menggunakan nodemon (jika ingin restart otomatis):
     ```bash
     npx nodemon index.js
     ```
   - Pastikan muncul log:
     ```text
     Server running on port 5000
     MySQL Connected ✅
     ```

---

## 💻 Langkah 3: Setup & Jalankan Frontend (Vite + React)
1. Buka terminal baru lagi (pisahkan dengan terminal backend) di folder root/utama project.
2. Jalankan perintah berikut untuk memastikan semua package terinstall dengan benar (terutama jika ada package baru):
   ```bash
   npm install
   ```
3. Jalankan aplikasi frontend:
   ```bash
   npm run dev
   ```
4. Buka browser dan akses alamat lokal yang tertera di terminal, biasanya:
   ```text
   http://localhost:5173
   ```

---

## 🔑 Informasi Akun Login Bawaan (Default Users)
Untuk keperluan testing dan demo skripsi, Anda bisa menggunakan akun-akun berikut yang sudah ter-seed di dalam database:

| Role | Email | Password | Keterangan |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@gmail.com` | `123456` | Kelola data training, siswa, & dashboard grafik |
| **Guru** | `guru@gmail.com` | `123456` | Kelola & verifikasi siswa |
| **Siswa** | `siswa1@gmail.com` | `123456` | Melakukan tes rekomendasi jurusan |

*(Anda juga bisa login menggunakan akun siswa lain yang ada di tabel `users` dengan password default yang sama yaitu `123456`)*

---

## ⚠️ Tips Tambahan & Troubleshooting
* **Cara Reset / Import Ulang Data dari Excel**:
  Jika database ingin dikosongkan dan di-import ulang secara acak berdasarkan file excel bawaan (`DATASHEET.xlsx`):
  1. Masuk ke folder `backend` di terminal.
  2. Jalankan perintah:
     ```bash
     node resetImport.js
     ```
  3. Script akan otomatis mengosongkan tabel `training_data` & `student_scores` lalu mengisinya kembali dari file excel.
