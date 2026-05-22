// Auth types for the application

export type UserRole = 'siswa' | 'guru' | 'admin';

export interface User {
  id: number;
  nama: string;
  email: string;
  role: UserRole;
  token?: string; // ✅ WAJIB TAMBAH
  nis?: string;
  nip?: string;
  kelas?: string;
  foto?: string;
}
export interface LoginCredentials {
  email: string; // ✅ ganti ini
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
