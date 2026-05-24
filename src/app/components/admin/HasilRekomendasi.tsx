import { useState, useEffect } from 'react';
import { Award, TrendingUp, Search, Download, Eye } from 'lucide-react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { API_BASE_URL } from '../../../config';



export function HasilRekomendasi() {
  const [rekomendasi, setRekomendasi] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDetail, setSelectedDetail] = useState<any>(null);

   // 🔥 FETCH SQL
  useEffect(() => {
    fetchData();
    fetchStats();
  }, []);
   const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/hasil-rekomendasi`);

      const mapped = res.data.map((r: any) => ({
  id: r.id,
  nama: r.nama,
  kelas: r.kelas,
  jurusanRekomendasi: r.jurusan,
  confidence: Number(r.confidence || 0),
   status: r.status, // 🔥 TAMBAH INI

  // 🔥 FIX TANGGAL DI SINI
  tanggal: r.created_at
  ? new Date(r.created_at).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  : "-",

  // 🔥 CLEAN ALASAN
  alasan:
  r.alasan
    ? JSON.parse(r.alasan)
    : [],

  nilai: {
    ipa: r.ipa,
    ips: r.ips,
    pai: r.pai,
    ppkn: r.ppkn,
    bahasa_indonesia: r.bahasa_indonesia,
    bahasa_inggris: r.bahasa_inggris,
    matematika_umum: r.matematika_umum,
    bahasa_daerah: r.bahasa_daerah,
    pjok: r.pjok,
    seni: r.seni,
    informatika: r.informatika
  }
}));

      setRekomendasi(mapped);

    } catch (err) {
      console.error(err);
    }
  };

  const [stats, setStats] = useState({
  totalSiswa: 0,
  rekomendasiDibuat: 0,
  pending: 0
});
const fetchStats = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/admin/siswa-stats`);
    setStats(res.data);
  } catch (err) {
    console.error(err);
  }
};

   // 🔥 FILTER (AMAN)
  const filteredData = rekomendasi.filter(item => 
    (item.nama || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.kelas || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.jurusanRekomendasi || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔥 EXPORT EXCEL
  const handleExportExcel = () => {
    const rows = filteredData.map((item, index) => ({
      'No.': index + 1,
      'Nama': item.nama,
      'Kelas': item.kelas,
      'Jurusan Rekomendasi': item.jurusanRekomendasi,
      'Confidence (%)': item.confidence,
      'Tanggal': item.tanggal,
      'PAI': item.nilai?.pai ?? '-',
      'PPKn': item.nilai?.ppkn ?? '-',
      'B. Indonesia': item.nilai?.bahasa_indonesia ?? '-',
      'B. Inggris': item.nilai?.bahasa_inggris ?? '-',
      'Matematika': item.nilai?.matematika_umum ?? '-',
      'IPA': item.nilai?.ipa ?? '-',
      'IPS': item.nilai?.ips ?? '-',
      'B. Daerah': item.nilai?.bahasa_daerah ?? '-',
      'PJOK': item.nilai?.pjok ?? '-',
      'Seni': item.nilai?.seni ?? '-',
      'Informatika': item.nilai?.informatika ?? '-',
      'Alasan': Array.isArray(item.alasan) ? item.alasan.join('; ') : (item.alasan || '-'),
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hasil Rekomendasi');

    const today = new Date().toLocaleDateString('id-ID', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    }).replace(/\//g, '-');

    XLSX.writeFile(wb, `Hasil_Rekomendasi_${today}.xlsx`);
  };

  

   // 🔥 STATS BARU (SESUAI REQUEST LU)
// ✅ PAKE DATA DARI BACKEND
const totalSiswa = stats.totalSiswa;
const rekomendasiDibuat = stats.rekomendasiDibuat;
const pending = stats.pending;

  const getJurusanColor = (jurusan: string) => {
    switch(jurusan) {
      case 'IPA': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'IPS': return 'bg-green-100 text-green-700 border-green-200';
      case 'Bahasa': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'TKJ': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-blue-600';
    if (confidence >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

   return (
    <div className="space-y-6">

      {/* HEADER (TETAP) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hasil Rekomendasi</h1>
          <p className="text-gray-500 mt-1">Prediksi jurusan untuk siswa berdasarkan Decision Tree C4.5</p>
        </div>
        <button
          onClick={handleExportExcel}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Download className="w-4 h-4" />
          Export Excel
        </button>
      </div>

      {/* 🔥 STATS (DIUBAH SESUAI LU) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Total Siswa</p>
          <p className="text-2xl font-bold">{totalSiswa}</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Rekomendasi Dibuat</p>
<p className="text-2xl font-bold text-blue-600">
  {rekomendasiDibuat}
</p>
        </div>


        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-orange-500">{pending}</p>
        </div>

      </div>

      {/* Results Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredData.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{item.nama}</h3>
                <p className="text-sm text-gray-500">Kelas {item.kelas} • {item.tanggal}</p>
              </div>
              <button
                onClick={() => setSelectedDetail(item)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Eye className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Jurusan Rekomendasi:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getJurusanColor(item.jurusanRekomendasi)}`}>
                  {item.jurusanRekomendasi}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tingkat Keyakinan:</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.confidence >= 90 ? 'bg-green-500' :
                        item.confidence >= 80 ? 'bg-blue-500' :
                        item.confidence >= 70 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${item.confidence}%` }}
                    />
                  </div>
                  <span className={`text-sm font-semibold ${getConfidenceColor(item.confidence)}`}>
                    {item.confidence}%
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Alasan:</p>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                  {item.alasan}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">Tidak ada hasil rekomendasi yang ditemukan</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedDetail.nama}</h3>
                <p className="text-gray-500">Detail Rekomendasi Jurusan</p>
              </div>
              <button
                onClick={() => setSelectedDetail(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Kelas</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedDetail.kelas}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Tanggal Dibuat</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedDetail.tanggal}</p>
                </div>
              </div>

              <div className={`p-6 rounded-xl border-2 ${getJurusanColor(selectedDetail.jurusanRekomendasi)}`}>
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-6 h-6" />
                  <p className="text-sm font-medium">Jurusan Rekomendasi</p>
                </div>
                <p className="text-3xl font-bold">{selectedDetail.jurusanRekomendasi}</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">Confidence: <strong>{selectedDetail.confidence}%</strong></span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900 mb-2">Alasan Rekomendasi:</p>
                <div className="space-y-2">
  {Array.isArray(selectedDetail.alasan) ? (
    selectedDetail.alasan.map((item: string, index: number) => (
      <div
        key={index}
        className="bg-white border border-blue-100 px-3 py-2 rounded-lg text-sm"
      >
        {index + 1}. {item}
      </div>
    ))
  ) : (
    <p className="text-sm text-gray-700">
      {String(selectedDetail.alasan || "-")}
    </p>
  )}
</div>
              </div>

              <div>
  <p className="text-sm font-medium text-gray-900 mb-3">
    Nilai Siswa:
  </p>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
    {Object.entries(selectedDetail.nilai || {}).map(([key, value]) => (
      <div
        key={key}
        className="p-3 bg-gray-50 rounded-lg"
      >
        <p className="text-xs text-gray-600 uppercase mb-1">
          {key}
        </p>

        <p className="text-2xl font-bold text-gray-900">
          {Number(value) || 0}
        </p>
      </div>
    ))}
  </div>
</div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setSelectedDetail(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Tutup
              </button>
              <button
  onClick={async () => {

    const confirmDelete = window.confirm(
      "Yakin mau hapus hasil rekomendasi ini?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `${API_BASE_URL}/admin/hasil-rekomendasi/${selectedDetail.id}`
      );

      setSelectedDetail(null);

      fetchData();
      fetchStats();

      alert("Hasil rekomendasi berhasil dihapus");

    } catch (err) {
      console.error(err);
      alert("Gagal menghapus");
    }

  }}
  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
>
  Hapus
</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
