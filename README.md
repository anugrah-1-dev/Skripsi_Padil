# Website SMA Harapan Bangsa - Sistem Rekomendasi Jurusan

Website sekolah profesional dengan fitur **Sistem Rekomendasi Jurusan** menggunakan algoritma **Decision Tree C4.5**.

## 🎯 Fitur Utama

### Landing Page
- **Hero Section** - Tampilan utama dengan informasi sekolah
- **About** - Informasi tentang sekolah
- **Programs** - Program akademik yang tersedia
- **Sistem Rekomendasi** - Informasi tentang sistem AI
- **News** - Berita dan acara sekolah
- **Contact** - Formulir kontak

### 🔐 3 Role Pengguna dengan Akses Berbeda

#### 1. **SISWA** (Portal Siswa)
- Dashboard siswa
- **Sistem Rekomendasi Jurusan** - Input 12 mata pelajaran
- Riwayat hasil rekomendasi
- Profil siswa

#### 2. **GURU** (Portal Guru)
- Dashboard guru
- Kelola data siswa
- **Buat Rekomendasi Jurusan** untuk siswa
- Lihat hasil rekomendasi
- Laporan dan statistik

#### 3. **ADMIN** (Super Admin)
- Dashboard admin dengan grafik
- **Data Training** - Kelola data historis untuk training model
- **Data Siswa** - Management data siswa
- **Sistem Rekomendasi** - Input 12 mata pelajaran
- **Hasil Rekomendasi** - Lihat semua prediksi
- Pengaturan sistem

## 📊 Sistem Rekomendasi Jurusan (12 Mata Pelajaran)

### Input:
1. **Matematika**
2. **Bahasa Indonesia**
3. **Bahasa Inggris**
4. **Fisika**
5. **Kimia**
6. **Biologi**
7. **Ekonomi**
8. **Geografi**
9. **Sosiologi**
10. **Sejarah**
11. **Seni Budaya**
12. **PJOK**

### Output:
- **IPA** (Ilmu Pengetahuan Alam)
- **IPS** (Ilmu Pengetahuan Sosial)

### Hasil Rekomendasi mencakup:
- Jurusan yang direkomendasikan (IPA/IPS)
- Tingkat keyakinan (confidence %)
- Alasan rekomendasi
- Detail perhitungan (Skor IPA vs IPS, Entropy, Information Gain)
- Saran tambahan (jika diperlukan)

## 🚀 Cara Menggunakan

### 1. Akses Website
```bash
npm run dev
```
Buka browser dan akses `http://localhost:5173/`

### 2. Login Berdasarkan Role

#### Login sebagai SISWA:
- Pilih tab **Siswa**
- Email/NIS: (any)
- Password: (any)
- Klik **Masuk**
- Redirect ke `/siswa/dashboard`

#### Login sebagai GURU:
- Pilih tab **Guru**
- Email/NIP: (any)
- Password: (any)
- Klik **Masuk**
- Redirect ke `/guru/dashboard`

#### Login sebagai ADMIN:
- Pilih tab **Admin**
- Email: (any)
- Password: (any)
- Klik **Masuk**
- Redirect ke `/admin/dashboard`

### 3. Gunakan Sistem Rekomendasi
1. Pilih menu **Sistem Rekomendasi** / **Rekomendasi Jurusan**
2. Input nilai 42 mata pelajaran (0-100)
3. Klik **Proses Rekomendasi**
4. Lihat hasil rekomendasi IPA atau IPS

## 🗄️ Integrasi Database MySQL

### API Service Layer
File `/src/services/api.ts` sudah disiapkan dengan struktur lengkap untuk integrasi MySQL:

```typescript
// Example: Login API
export const authAPI = {
  async login(credentials: LoginCredentials): Promise<User> {
    // TODO: Ganti dengan actual API call ke backend MySQL
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return response.json();
  }
}
```

### Backend yang Perlu Dibuat (PHP/Node.js):
1. **Auth API** - `/api/auth/login`, `/api/auth/logout`
2. **Recommendation API** - `/api/recommendation/predict`, `/api/recommendation/save`
3. **Training Data API** - `/api/training-data` (CRUD)
4. **Student API** - `/api/students` (CRUD)

### Database Schema (MySQL):
```sql
-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role ENUM('siswa', 'guru', 'admin'),
  nis VARCHAR(50),
  nip VARCHAR(50),
  kelas VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students scores table
CREATE TABLE student_scores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  siswa_id INT,
  matematika INT,
  bahasa_indonesia INT,
  bahasa_inggris INT,
  fisika INT,
  kimia INT,
  biologi INT,
  ekonomi INT,
  geografi INT,
  sosiologi INT,
  sejarah INT,
  seni INT,
  pjok INT,
  semester VARCHAR(10),
  tahun_ajaran VARCHAR(20),
  FOREIGN KEY (siswa_id) REFERENCES users(id)
);

-- Recommendations table
CREATE TABLE recommendations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  siswa_id INT,
  jurusan ENUM('IPA', 'IPS'),
  confidence INT,
  alasan TEXT,
  skor_ipa DECIMAL(5,2),
  skor_ips DECIMAL(5,2),
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (siswa_id) REFERENCES users(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Training data table
CREATE TABLE training_data (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama VARCHAR(255),
  kelas VARCHAR(10),
  matematika INT,
  bahasa_indonesia INT,
  bahasa_inggris INT,
  fisika INT,
  kimia INT,
  biologi INT,
  ekonomi INT,
  geografi INT,
  sosiologi INT,
  sejarah INT,
  seni INT,
  pjok INT,
  jurusan ENUM('IPA', 'IPS'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```