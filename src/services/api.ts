// API Service Layer - Connected to MySQL Backend
import { User, LoginCredentials } from '../types/auth';
import { StudentScores, RecommendationResult, TrainingData, Jurusan } from '../types/recommendation';
import { API_BASE_URL, API_SERVER_URL } from '../config';

// ─── Helper: get token dari localStorage ─────────────────────────────────────
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ─── AUTH APIs ────────────────────────────────────────────────────────────────
export const authAPI = {
  async login(credentials: LoginCredentials): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  const text = await response.text();
  console.log("LOGIN RESPONSE:", text);

  const data = JSON.parse(text);

  if (!response.ok) throw new Error(data.message);

  localStorage.setItem('token', data.token);

  return { ...data.user, token: data.token };
},

  async logout(): Promise<void> {
    localStorage.removeItem('token');
  },
};

// ─── RECOMMENDATION APIs ──────────────────────────────────────────────────────
export const recommendationAPI = {

  // 🔥 PAKAI BACKEND (INI YANG DIPAKE)
  async processRecommendation(scores: any, userId: number) {
    const res = await fetch(`${API_BASE_URL}/siswa/process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...scores,
        user_id: userId,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("ERROR:", text);
      throw new Error("Gagal proses rekomendasi");
    }

    return await res.json();
  },

};

// ─── TRAINING DATA APIs ───────────────────────────────────────────────────────
export const trainingDataAPI = {
  async getAll(): Promise<TrainingData[]> {
    return [
      {
  id: 1,
  nama: 'Dummy',
  kelas: '11',
  pai: 80,
  ppkn: 75,
  bahasa_indonesia: 78,
  bahasa_inggris: 82,
  matematika_umum: 85,
  ipa: 88,
  ips: 70,
  bahasa_daerah: 77,
  pjok: 80,
  seni: 76,
  informatika: 90,
  jurusan: 'Paket A',
}
    ];
  },

  async create(data: TrainingData): Promise<TrainingData> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { ...data, id: Date.now() };
  },

  async update(id: number, data: TrainingData): Promise<TrainingData> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { ...data, id };
  },

  async delete(id: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
};


// ─── GURU APIs ─────────────────────────────────────────────────────────────
export const guruAPI = {
  async getDashboardStats() {
    const response = await fetch(`${API_BASE_URL}/guru/dashboard`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  async getSiswa(searchTerm: string, filterStatus: string) {
  const response = await fetch(`${API_BASE_URL}/guru/siswa`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
},

async updateStatusSiswa(id: number) {
  const res = await fetch(
    `${API_BASE_URL}/guru/siswa/${id}/proses`,
    {
      method: "PUT",
    }
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
},


  async getRekomendasi() {
    const response = await fetch(`${API_BASE_URL}/guru/rekomendasi`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }
};



// ─── STUDENT APIs ─────────────────────────────────────────────────────────────
export const studentAPI = {
  async getAll() {
    return [];
  },
  async getById(id: number) {
    return null;
  },
  async getScores(siswaId: number): Promise<StudentScores | null> {
    return null;
  },

  

  async getSiswa() {

  const response = await fetch(`${API_BASE_URL}/guru/siswa`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
},
};

// ─── PROFILE APIs (MySQL - Real Implementation) ───────────────────────────────
export interface ProfileData {
  id: number;
  nama: string;
  email: string;
  nis: string;
  kelas: string;
  telepon: string;
  alamat: string;
  tanggal_lahir: string;
  tempat_lahir: string;
  foto?: string;
  role: string;
}

export interface UpdateProfileData {
  nama: string;
  email: string;
  kelas: string;
  telepon: string;
  alamat: string;
  tanggal_lahir: string;
  tempat_lahir: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
}

export const profileAPI = {
  // ── GET profile dari MySQL ────────────────────────────────────────────────
  async getProfile(userId: number): Promise<ProfileData> {
    const response = await fetch(`${API_BASE_URL}/profile/${userId}`, {
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Gagal memuat profil');

    return data;
  },

  // ── UPDATE profile ke MySQL ───────────────────────────────────────────────
  async updateProfile(userId: number, profileData: UpdateProfileData): Promise<User> {
  const cleanedData = {
    ...profileData,
    tanggal_lahir: profileData.tanggal_lahir || null,
  };

  const response = await fetch(`${API_BASE_URL}/profile/${userId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(cleanedData),
  });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Gagal memperbarui profil');

    // Kembalikan user yang diupdate (untuk update AuthContext)
    return {
      id: data.user.id,
      nama: data.user.nama,
      email: data.user.email,
      role: data.user.role,
      nis: data.user.nis,
      kelas: data.user.kelas,
      foto: data.user.foto,
    };
  },

  // ── UPLOAD foto ke MySQL ──────────────────────────────────────────────────
  async uploadPhoto(userId: number, file: File): Promise<string> {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('photo', file);

    const response = await fetch(`${API_BASE_URL}/profile/${userId}/photo`, {
      method: 'POST',
      headers: {
        // JANGAN tambahkan Content-Type di sini —
        // biarkan browser set boundary untuk multipart/form-data
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Gagal upload foto');

    return data.photoUrl; // URL lengkap dari backend
  },

  // ── HAPUS foto dari MySQL ─────────────────────────────────────────────────
  async removePhoto(userId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/profile/${userId}/photo`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Gagal menghapus foto');
  },
  


  // ── GANTI password di MySQL ───────────────────────────────────────────────
  async changePassword(userId: number, passwordData: ChangePasswordData): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/profile/${userId}/password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(passwordData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Gagal mengubah password');
  },
};
