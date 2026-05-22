// Types for recommendation system with 14 subjects

export type Jurusan =
  | 'Paket A'
  | 'Paket B'
  | 'Paket C'
  | 'Paket D'
  | 'Paket E'
  | 'Paket F'
  | 'Paket G';

export interface StudentScores {
  pai: number;
  ppkn: number;
  bahasa_indonesia: number;
  bahasa_inggris: number;
  matematika_umum: number;
  ipa: number;
  ips: number;
  bahasa_daerah: number;
  pjok: number;
  seni: number;
  informatika: number;
}

export interface StudentData extends StudentScores {
  id?: number;
  siswa_id?: number;
  nama?: string;
  kelas?: string;
  semester?: string;
  tahun_ajaran?: string;
}

export interface RecommendationResult {
  jurusan: string;
  confidence: number;
  alasan: string[]; // ✅ FIX
  detail_perhitungan?: {
    entropy: number;
    information_gain: number;
  };
}

export interface TrainingData extends StudentData {
  jurusan: Jurusan;
}

export interface RecommendationHistory {
  id: number;
  siswa_id: number;
  nama_siswa: string;
  kelas: string;
  jurusan_rekomendasi: Jurusan;
  confidence: number;
  tanggal: string;
  created_by: number;
}
