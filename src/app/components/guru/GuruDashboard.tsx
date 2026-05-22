import { Users, Calculator, FileText, BarChart3 } from 'lucide-react';
import { Link } from 'react-router';
import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState } from "react";
import { guruAPI } from "../../../services/api";

export function GuruDashboard() {
  const { user } = useAuth();


  const [statsData, setStatsData] = useState({
  totalSiswa: 0,
  totalRekomendasi: 0,
  pending: 0,
});

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await guruAPI.getDashboardStats();
      setStatsData(data);
    } catch (error) {
      console.error("Error fetch dashboard:", error);
    }
  };

  fetchData();
}, []); 


  const stats = [
  { label: 'Total Siswa', value: statsData.totalSiswa, icon: Users, color: 'bg-blue-500' },
  { label: 'Rekomendasi Dibuat', value: statsData.totalRekomendasi, icon: Calculator, color: 'bg-green-500' },
  { label: 'Pending', value: statsData.pending, icon: FileText, color: 'bg-orange-500' },
];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Selamat Datang, {user?.nama}!</h1>
        <p className="text-green-100">NIP: {user?.nip}</p>
        <p className="mt-4 text-lg">
          Lihat data siswa dan hasil rekomendasi jurusan untuk membantu siswa memilih jalur akademik yang tepat.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/guru/data-siswa"
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Lihat Data Siswa</h3>
              <p className="text-sm text-gray-600 mt-1">Lihat data siswa</p>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}