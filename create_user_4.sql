-- Buat user ID 4 untuk test ProfilSiswa
-- Password: siswa123 (bcrypt: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy)
INSERT INTO users (id, nama, email, password, role, nis, kelas, telepon, alamat) VALUES 
(4, 'Siswa Test', 'siswa4@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'siswa', '67890', '10B', '081234567890', 'Jl Test No 4') 
ON DUPLICATE KEY UPDATE nama=VALUES(nama);

-- Verify
SELECT id, nama, email, role FROM users WHERE id = 4;

