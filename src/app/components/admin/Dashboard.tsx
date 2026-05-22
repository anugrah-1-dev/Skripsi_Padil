import { Users, Database, Award, TrendingUp,FileText } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { useEffect, useState } from "react";
import { API_BASE_URL } from '../../../config';

// 🔥 TYPE
type Stat = {
  label: string;
  value: number | string;
  icon: any;
  color: string;
};

type BarData = {
  jurusan: string;
  siswa: number;
};

type PieData = {
  name: string;
  value: number;
  color?: string;
};

export function Dashboard() {

  const [statsData, setStatsData] = useState<Stat[]>([]);
  const [barData, setBarData] = useState<BarData[]>([]);
  const [pieData, setPieData] = useState<PieData[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/dashboard`);
        const data = await res.json();

        // 🔥 STATS
        setStatsData([
  { label: "Total Siswa", value: data.stats.totalSiswa, icon: Users, color: "bg-blue-500" },
  { label: "Data Training", value: data.stats.totalTraining, icon: Database, color: "bg-green-500" },
  { label: "Rekomendasi Dibuat", value: data.stats.totalRekomendasi, icon: Award, color: "bg-purple-500" },
  { label: "Pending", value: data.stats.pending, icon: FileText, color: "bg-yellow-500" },
]);

        setBarData(data.distribusi || []);

        // 🔥 FIX TYPE ERROR DI SINI
        setPieData(
  (data.pie || []).map((p: any, i: number) => ({
            ...p,
            color: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"][i % 4]
          }))
        );

      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Ringkasan data sistem rekomendasi jurusan</p>
      </div>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔥 CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* BAR */}
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="mb-4 font-semibold">Distribusi Siswa</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="jurusan" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="siswa" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE */}
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="mb-4 font-semibold">Proporsi Jurusan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry: PieData, index: number) => (
                  <Cell key={index} fill={entry.color || "#8884d8"} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}