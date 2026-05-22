import { Calculator, FileText, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';
import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState } from "react";
import { recommendationAPI } from "../../../services/api";
import { API_BASE_URL } from '../../../config';

export function SiswaDashboard() {
  const { user } = useAuth();
  
  const [latest, setLatest] = useState<any>(null);
  useEffect(() => {
  const fetchLatest = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/siswa/latest/${user?.id}`
      );

      const data = await res.json();
      setLatest(data);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  if (user?.id) {
    fetchLatest();
  }
}, [user]);

const getAverage = () => {
  if (!latest) return "-";

  const values = [
    latest.pai,
    latest.ppkn,
    latest.bahasa_indonesia,
    latest.bahasa_inggris,
    latest.matematika_umum,
    latest.ipa,
    latest.ips,
    latest.bahasa_daerah,
    latest.pjok,
    latest.seni,
    latest.informatika,
  ];

  const total = values.reduce((a, b) => a + b, 0);
  return (total / values.length).toFixed(1);
};
  
  const quickActions = [
    {
      title: 'Sistem Rekomendasi',
      description: 'Dapatkan rekomendasi jurusan berdasarkan nilai Anda',
      icon: Calculator,
      link: '/siswa/rekomendasi-jurusan',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Hasil Rekomendasi',
      description: 'Lihat peringkat dan kuota siswa per jurusan',
      icon: FileText,
      link: '/siswa/riwayat',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    }
  ];  
  
  
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Selamat Datang, {user?.nama}!</h1>
        <p className="text-blue-100">NIS: {user?.nis} | Kelas: {user?.kelas}</p>
        <p className="mt-4 text-lg">
          Gunakan sistem rekomendasi jurusan untuk mengetahui jurusan yang paling sesuai dengan kemampuan akademik Anda.
        </p>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Menu Utama</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className={`${action.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <Award className="w-6 h-6 text-orange-600" />
            <h3 className="font-semibold text-gray-900">Status Rekomendasi</h3>
          </div>
    <p className="text-3xl font-bold text-gray-900 mb-1">
  {latest ? latest.jurusan : "Belum Ada"}
</p>
<p className="text-sm text-gray-600">
  {latest ? "Sudah melakukan tes" : "Lakukan tes rekomendasi jurusan"}
</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-gray-900">Rata-rata Nilai</h3>
          </div>

        <p className="text-3xl font-bold text-gray-900 mb-1">
        {latest ? Number(latest.rataRata) : "-"}
        </p>

        <p className="text-sm text-gray-600">
          {latest ? "Berdasarkan nilai terakhir" : "Belum ada data nilai"}
        </p>


        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
  <div className="flex items-center gap-3 mb-3">
    <TrendingUp className="w-6 h-6 text-blue-600" />
    <h3 className="font-semibold text-gray-900">Confidence</h3>
  </div>

  <p className="text-3xl font-bold text-blue-600 mb-1">
    {latest ? `${latest.confidence}%` : "-"}
  </p>

  <p className="text-sm text-gray-600">
    {latest ? "Tingkat keyakinan sistem" : "Belum ada data"}
  </p>
</div>
      </div>
      
          
      {/* Information */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Tentang Sistem Rekomendasi Jurusan</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          Sistem ini menggunakan algoritma Decision Tree C4.5 untuk menganalisis nilai akademik Anda 
          dari 11 mata pelajaran. Berdasarkan analisis tersebut, sistem akan merekomendasikan 
          jurusan yang paling sesuai.
        </p>
      </div>
    </div>
  );
}
