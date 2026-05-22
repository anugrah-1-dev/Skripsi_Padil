import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Award, BookOpen, CheckCircle } from 'lucide-react';
import { StudentScores, RecommendationResult } from '../../../types/recommendation';
import { recommendationAPI } from '../../../services/api';
import { API_BASE_URL } from '../../../config';

const subjects = [
  { key: 'pai',              label: 'Agama' },
  { key: 'ppkn',             label: 'PPKN' },
  { key: 'bahasa_indonesia', label: 'Bahasa Indonesia' },
  { key: 'bahasa_inggris',   label: 'Bahasa Inggris' },
  { key: 'matematika_umum',  label: 'Matematika' },
  { key: 'ipa',              label: 'IPA' },
  { key: 'ips',              label: 'IPS' },
  { key: 'bahasa_daerah',    label: 'Bahasa Daerah' },
  { key: 'pjok',             label: 'PJOK' },
  { key: 'seni',             label: 'Seni' },
  { key: 'informatika',      label: 'Informatika' },
] as const;

// Warna per paket
const PAKET_COLOR: Record<string, { bg: string; border: string; text: string }> = {
  "Paket A": { bg: "from-blue-50 to-blue-100",    border: "border-blue-300",  text: "text-blue-700"   },
  "Paket B": { bg: "from-indigo-50 to-indigo-100", border: "border-indigo-300", text: "text-indigo-700" },
  "Paket C": { bg: "from-cyan-50 to-cyan-100",    border: "border-cyan-300",  text: "text-cyan-700"   },
  "Paket D": { bg: "from-teal-50 to-teal-100",    border: "border-teal-300",  text: "text-teal-700"   },
  "Paket E": { bg: "from-green-50 to-green-100",  border: "border-green-300", text: "text-green-700"  },
  "Paket F": { bg: "from-yellow-50 to-yellow-100", border: "border-yellow-300", text: "text-yellow-700"},
  "Paket G": { bg: "from-purple-50 to-purple-100", border: "border-purple-300", text: "text-purple-700"},
};

const defaultColor = { bg: "from-gray-50 to-gray-100", border: "border-gray-300", text: "text-gray-700" };

export function SistemRekomendasiJurusan() {
  const emptyScores: StudentScores = {
    pai: 0, ppkn: 0, bahasa_indonesia: 0, bahasa_inggris: 0,
    matematika_umum: 0, ipa: 0, ips: 0, bahasa_daerah: 0,
    pjok: 0, seni: 0, informatika: 0,
  };

  const [scores, setScores]           = useState<StudentScores>(emptyScores);
  const [result, setResult]           = useState<RecommendationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors]           = useState<Record<string, string>>({});

  // Rata-rata nilai
  const values = Object.values(scores).map(Number);
  const rataRata = values.reduce((a, b) => a + (b || 0), 0) / values.length;

  // ── Load data siswa jika sudah pernah tes ──────────────────
  useEffect(() => {
    const fetchLatest = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user.id) return;
      try {
        const res = await fetch(`${API_BASE_URL}/siswa/latest/${user.id}`);
        const data = await res.json();
        if (!data || !data.jurusan) return;

        setResult({
          jurusan: data.jurusan,
          confidence: data.confidence,
          alasan: data.alasan ? JSON.parse(data.alasan) : [],
          detail_perhitungan: {
            entropy: data.entropy,
            information_gain: data.information_gain,
          },
        });

        setScores({
          pai: data.pai, ppkn: data.ppkn,
          bahasa_indonesia: data.bahasa_indonesia, bahasa_inggris: data.bahasa_inggris,
          matematika_umum: data.matematika_umum, ipa: data.ipa,
          ips: data.ips, bahasa_daerah: data.bahasa_daerah,
          pjok: data.pjok, seni: data.seni, informatika: data.informatika,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchLatest();
  }, []);

  // ── Handlers ──────────────────────────────────────────────
  const handleScoreChange = (key: keyof StudentScores, value: string) => {
    const numValue = parseInt(value) || 0;
    if (numValue < 0 || numValue > 100) {
      setErrors(prev => ({ ...prev, [key]: 'Nilai harus antara 0–100' }));
      return;
    }
    setErrors(prev => { const e = { ...prev }; delete e[key]; return e; });
    setScores(prev => ({ ...prev, [key]: numValue }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    Object.entries(scores).forEach(([key, value]) => {
      if (!value || value <= 0)   newErrors[key] = 'Nilai tidak boleh kosong';
      if (value > 100)            newErrors[key] = 'Nilai harus antara 0–100';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (result) { alert("Anda sudah melakukan rekomendasi. Data tidak dapat diubah."); return; }
    if (!window.confirm("Apakah Anda yakin nilai yang diinput sudah benar?")) return;
    if (!validateForm()) { alert("Mohon lengkapi semua nilai!"); return; }

    setIsProcessing(true);
    setResult(null);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await recommendationAPI.processRecommendation(scores, user.id);
      setResult(response);
    } catch (error: any) {
      alert(error?.response?.data?.message || "Terjadi kesalahan, coba lagi.");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    if (result) { alert("Anda sudah melakukan rekomendasi. Data tidak dapat diubah."); return; }
    setScores(emptyScores);
    setErrors({});
  };

  // ── Warna paket ───────────────────────────────────────────
  const paketColor = result ? (PAKET_COLOR[result.jurusan] || defaultColor) : defaultColor;

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Sistem Rekomendasi Jurusan</h1>
        </div>
        <p className="text-blue-100 text-lg">
          Input nilai 11 mata pelajaran untuk mendapatkan rekomendasi jurusan berdasarkan algoritma Decision Tree C4.5
        </p>
      </div>

      {/* Notice jika sudah tes */}
      {result && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg">
          <p className="text-sm text-yellow-800 font-medium">
            ⚠️ Anda sudah melakukan tes rekomendasi. Data tidak dapat diubah.
          </p>
        </div>
      )}

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Input Nilai Siswa</h2>
          <p className="text-gray-500 text-sm">Masukkan nilai untuk semua mata pelajaran (0–100)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {subjects.map((subject) => (
            <div key={subject.key} className="border rounded-lg p-4 bg-gray-50">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {subject.label}
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={scores[subject.key] || ''}
                onChange={(e) => handleScoreChange(subject.key, e.target.value)}
                disabled={!!result}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors[subject.key] ? 'border-red-500' : 'border-gray-300'
                } ${result ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
                placeholder="0–100"
              />
              {errors[subject.key] && (
                <p className="text-xs text-red-600 mt-1">{errors[subject.key]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Rata-rata */}
        <div className="p-4 bg-gray-50 rounded-lg mb-6">
          <p className="text-sm text-gray-600 mb-1">Rata-rata Keseluruhan</p>
          <p className="text-2xl font-bold text-gray-900">
            {Number.isInteger(rataRata) ? rataRata : rataRata.toFixed(1)}
          </p>
        </div>

        {/* Tombol */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isProcessing || !!result}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              isProcessing || !!result
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                Proses Rekomendasi
              </>
            )}
          </button>

          <button
            type="button"
            onClick={resetForm}
            disabled={!!result}
            className={`px-6 py-3 border rounded-lg font-semibold ${
              result
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300'
                : 'border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}
          >
            {result ? "Terkunci" : "Reset"}
          </button>
        </div>
      </form>

      {/* ── HASIL REKOMENDASI ── */}
      {result && (
        <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-8">

          <div className="flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Hasil Rekomendasi</h2>
          </div>

          {/* Paket Result Card */}
          <div className={`p-8 rounded-xl mb-6 bg-gradient-to-br ${paketColor.bg} border-2 ${paketColor.border}`}>
            <div className="text-center">
              <p className="text-base text-gray-600 mb-2">Jurusan yang Direkomendasikan:</p>
              <h3 className={`text-5xl font-bold mb-4 ${paketColor.text}`}>
                {result.jurusan}
              </h3>
              <div className="flex items-center justify-center gap-2 text-lg mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="font-semibold text-gray-800">
                  Tingkat Keyakinan: {result.confidence}%
                </span>
              </div>
              <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    result.confidence >= 80 ? 'bg-green-500' : 'bg-orange-400'
                  }`}
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>
          </div>

          {/* Alasan Rekomendasi */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Mengapa kamu direkomendasikan ke {result.jurusan}?
            </h4>

            {Array.isArray(result.alasan) && result.alasan.length > 0 ? (
              <ul className="space-y-3 text-gray-700">
                {result.alasan.map((a: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0">
                      {i === 0 ? "📊" : i === result.alasan.length - 1 ? "📚" : "✅"}
                    </span>
                    <span className="leading-relaxed">{a}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Data alasan tidak tersedia.</p>
            )}
          </div>

          {/* Entropy & Information Gain */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 border border-purple-100 p-5 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Entropy Dataset</p>
              <p className="text-3xl font-bold text-purple-600">
                {result.detail_perhitungan?.entropy?.toFixed(4) || "-"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Ukuran ketidakpastian pada 7 kelas jurusan
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-100 p-5 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Information Gain Terbaik</p>
              <p className="text-3xl font-bold text-orange-500">
                {result.detail_perhitungan?.information_gain?.toFixed(4) || "-"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Fitur: <span className="font-medium text-gray-500">Informatika</span> (IG tertinggi)
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
