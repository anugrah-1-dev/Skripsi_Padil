# Backend API Documentation - Profile Management

## Overview
Dokumentasi ini menjelaskan API endpoints yang harus dibuat di backend (PHP/Node.js + MySQL) untuk fitur Profile Management pada dashboard SISWA.

## Database Schema

### Tabel: `users` atau `siswa`
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('siswa', 'guru', 'admin') NOT NULL,
  nis VARCHAR(50) UNIQUE,
  nip VARCHAR(50) UNIQUE,
  kelas VARCHAR(20),
  telepon VARCHAR(20),
  alamat TEXT,
  tanggal_lahir DATE,
  tempat_lahir VARCHAR(100),
  foto VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## API Endpoints

### 1. Get Profile
**Endpoint:** `GET /api/profile/{userId}`

**Description:** Mengambil data profil user berdasarkan ID

**Response Success (200):**
```json
{
  "id": 1,
  "nama": "Ahmad Rizki",
  "email": "ahmad@student.com",
  "nis": "12345",
  "kelas": "10A",
  "telepon": "081234567890",
  "alamat": "Jl. Pendidikan No. 123, Jakarta Selatan",
  "tanggal_lahir": "2008-05-15",
  "tempat_lahir": "Jakarta",
  "foto": "/uploads/profile/12345.jpg",
  "role": "siswa"
}
```

**Response Error (404):**
```json
{
  "error": "User not found"
}
```

---

### 2. Update Profile
**Endpoint:** `PUT /api/profile/{userId}`

**Description:** Update data profil user

**Request Body:**
```json
{
  "nama": "Ahmad Rizki Updated",
  "email": "ahmad.new@student.com",
  "kelas": "10B",
  "telepon": "081234567890",
  "alamat": "Jl. Pendidikan No. 123, Jakarta Selatan",
  "tanggal_lahir": "2008-05-15",
  "tempat_lahir": "Jakarta"
}
```

**Response Success (200):**
```json
{
  "id": 1,
  "nama": "Ahmad Rizki Updated",
  "email": "ahmad.new@student.com",
  "role": "siswa",
  "nis": "12345",
  "kelas": "10B",
  "foto": "/uploads/profile/12345.jpg"
}
```

**Response Error (400):**
```json
{
  "error": "Invalid data",
  "details": {
    "email": "Email already exists"
  }
}
```

**Validasi:**
- `nama`: required, min 3 characters
- `email`: required, valid email format, unique
- `telepon`: optional, valid phone format
- `tanggal_lahir`: optional, valid date

---

### 3. Upload Photo
**Endpoint:** `POST /api/profile/{userId}/photo`

**Description:** Upload foto profil user

**Request:** multipart/form-data
```
photo: [File]
```

**Response Success (200):**
```json
{
  "photoUrl": "/uploads/profile/12345_1234567890.jpg"
}
```

**Response Error (400):**
```json
{
  "error": "Invalid file format. Only JPG, PNG, and GIF allowed"
}
```

**Validasi:**
- File type: image/jpeg, image/png, image/gif
- Max file size: 2MB
- Rename file dengan format: `{nis}_{timestamp}.{ext}`
- Simpan ke folder: `/uploads/profile/`
- Hapus foto lama jika ada

---

### 4. Remove Photo
**Endpoint:** `DELETE /api/profile/{userId}/photo`

**Description:** Hapus foto profil user

**Response Success (200):**
```json
{
  "message": "Photo removed successfully"
}
```

**Response Error (404):**
```json
{
  "error": "Photo not found"
}
```

---

### 5. Change Password
**Endpoint:** `PUT /api/profile/{userId}/password`

**Description:** Ubah password user

**Request Body:**
```json
{
  "current_password": "old_password123",
  "new_password": "new_password456"
}
```

**Response Success (200):**
```json
{
  "message": "Password changed successfully"
}
```

**Response Error (400):**
```json
{
  "error": "Current password is incorrect"
}
```

**Response Error (400):**
```json
{
  "error": "New password must be at least 6 characters"
}
```

**Validasi:**
- Verify current password dengan hash di database
- New password: min 6 characters
- Hash new password sebelum save ke database (gunakan bcrypt/password_hash)

---

## Security Considerations

1. **Authentication:** Semua endpoints harus protected dengan authentication middleware
2. **Authorization:** User hanya bisa update profile mereka sendiri
3. **Password Hashing:** Gunakan bcrypt atau password_hash() untuk PHP
4. **File Upload Security:**
   - Validate file type dan size
   - Generate unique filename
   - Store outside public root jika memungkinkan
5. **SQL Injection:** Gunakan prepared statements
6. **XSS Prevention:** Sanitize input data

---

## Example Implementation (PHP Laravel)

```php
// ProfileController.php

public function getProfile($userId) {
    $user = User::find($userId);

    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    return response()->json([
        'id' => $user->id,
        'nama' => $user->nama,
        'email' => $user->email,
        'nis' => $user->nis,
        'kelas' => $user->kelas,
        'telepon' => $user->telepon,
        'alamat' => $user->alamat,
        'tanggal_lahir' => $user->tanggal_lahir,
        'tempat_lahir' => $user->tempat_lahir,
        'foto' => $user->foto,
        'role' => $user->role
    ]);
}

public function updateProfile(Request $request, $userId) {
    $request->validate([
        'nama' => 'required|min:3',
        'email' => 'required|email|unique:users,email,' . $userId,
        'kelas' => 'nullable|string',
        'telepon' => 'nullable|string',
        'alamat' => 'nullable|string',
        'tanggal_lahir' => 'nullable|date',
        'tempat_lahir' => 'nullable|string'
    ]);

    $user = User::find($userId);
    $user->update($request->only([
        'nama', 'email', 'kelas', 'telepon',
        'alamat', 'tanggal_lahir', 'tempat_lahir'
    ]));

    return response()->json([
        'id' => $user->id,
        'nama' => $user->nama,
        'email' => $user->email,
        'role' => $user->role,
        'nis' => $user->nis,
        'kelas' => $user->kelas,
        'foto' => $user->foto
    ]);
}

public function uploadPhoto(Request $request, $userId) {
    $request->validate([
        'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
    ]);

    $user = User::find($userId);

    // Delete old photo
    if ($user->foto && Storage::exists($user->foto)) {
        Storage::delete($user->foto);
    }

    // Upload new photo
    $file = $request->file('photo');
    $filename = $user->nis . '_' . time() . '.' . $file->extension();
    $path = $file->storeAs('uploads/profile', $filename, 'public');

    $user->foto = '/storage/' . $path;
    $user->save();

    return response()->json([
        'photoUrl' => $user->foto
    ]);
}

public function removePhoto($userId) {
    $user = User::find($userId);

    if ($user->foto && Storage::exists($user->foto)) {
        Storage::delete($user->foto);
    }

    $user->foto = null;
    $user->save();

    return response()->json([
        'message' => 'Photo removed successfully'
    ]);
}

public function changePassword(Request $request, $userId) {
    $request->validate([
        'current_password' => 'required',
        'new_password' => 'required|min:6'
    ]);

    $user = User::find($userId);

    // Verify current password
    if (!Hash::check($request->current_password, $user->password)) {
        return response()->json([
            'error' => 'Current password is incorrect'
        ], 400);
    }

    // Update password
    $user->password = Hash::make($request->new_password);
    $user->save();

    return response()->json([
        'message' => 'Password changed successfully'
    ]);
}
```

---

## Example Implementation (Node.js + Express)

```javascript
// profileController.js

const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: './uploads/profile/',
  filename: (req, file, cb) => {
    const userId = req.params.userId;
    const ext = path.extname(file.originalname);
    cb(null, `${userId}_${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
}).single('photo');

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const [user] = await db.query(
      'SELECT id, nama, email, nis, kelas, telepon, alamat, tanggal_lahir, tempat_lahir, foto, role FROM users WHERE id = ?',
      [userId]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { nama, email, kelas, telepon, alamat, tanggal_lahir, tempat_lahir } = req.body;

    // Validation
    if (!nama || nama.length < 3) {
      return res.status(400).json({ error: 'Nama must be at least 3 characters' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check email uniqueness
    const [existingUser] = await db.query(
      'SELECT id FROM users WHERE email = ? AND id != ?',
      [email, userId]
    );

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Update user
    await db.query(
      'UPDATE users SET nama = ?, email = ?, kelas = ?, telepon = ?, alamat = ?, tanggal_lahir = ?, tempat_lahir = ? WHERE id = ?',
      [nama, email, kelas, telepon, alamat, tanggal_lahir, tempat_lahir, userId]
    );

    const [updatedUser] = await db.query(
      'SELECT id, nama, email, role, nis, kelas, foto FROM users WHERE id = ?',
      [userId]
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload Photo
exports.uploadPhoto = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const userId = req.params.userId;
      const photoUrl = `/uploads/profile/${req.file.filename}`;

      // Get old photo
      const [user] = await db.query('SELECT foto FROM users WHERE id = ?', [userId]);

      // Delete old photo if exists
      if (user && user.foto) {
        const oldPhotoPath = path.join(__dirname, '..', user.foto);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }

      // Update database
      await db.query('UPDATE users SET foto = ? WHERE id = ?', [photoUrl, userId]);

      res.json({ photoUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

// Remove Photo
exports.removePhoto = async (req, res) => {
  try {
    const userId = req.params.userId;
    const [user] = await db.query('SELECT foto FROM users WHERE id = ?', [userId]);

    if (user && user.foto) {
      const photoPath = path.join(__dirname, '..', user.foto);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    await db.query('UPDATE users SET foto = NULL WHERE id = ?', [userId]);

    res.json({ message: 'Photo removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { current_password, new_password } = req.body;

    // Validation
    if (!current_password || !new_password) {
      return res.status(400).json({ error: 'Both passwords are required' });
    }

    if (new_password.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    // Get user
    const [user] = await db.query('SELECT password FROM users WHERE id = ?', [userId]);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isValid = await bcrypt.compare(current_password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Update password
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## Frontend Integration

File frontend yang sudah dibuat:
- `/src/app/components/siswa/ProfilSiswa.tsx` - Profile page component
- `/src/services/api.ts` - API service layer (lihat section `profileAPI`)

Untuk mengaktifkan koneksi ke backend, edit file `/src/services/api.ts`:

```typescript
// Ubah API_BASE_URL
const API_BASE_URL = 'http://localhost:8000/api'; // Atau URL backend Anda

// Uncomment kode API calls di setiap function profileAPI
// dan comment/hapus mock data
```

---

## Testing

Gunakan tools seperti Postman atau cURL untuk testing:

```bash
# Get Profile
curl http://localhost:8000/api/profile/1

# Update Profile
curl -X PUT http://localhost:8000/api/profile/1 \
  -H "Content-Type: application/json" \
  -d '{"nama":"Ahmad Updated","email":"ahmad@test.com"}'

# Upload Photo
curl -X POST http://localhost:8000/api/profile/1/photo \
  -F "photo=@/path/to/image.jpg"

# Change Password
curl -X PUT http://localhost:8000/api/profile/1/password \
  -H "Content-Type: application/json" \
  -d '{"current_password":"old123","new_password":"new456"}'
```

---

## Next Steps

1. Buat database schema sesuai dokumentasi
2. Implement API endpoints di backend (PHP/Node.js)
3. Update `API_BASE_URL` di `/src/services/api.ts`
4. Uncomment API calls dan hapus mock data
5. Test dengan `npm run dev`
