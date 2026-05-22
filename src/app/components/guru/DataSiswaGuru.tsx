import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import { guruAPI } from "../../../services/api";
import * as XLSX from "xlsx";
import { API_BASE_URL } from '../../../config';

export function DataSiswaGuru() {
  const [siswaData, setSiswaData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const exportToExcel = () => {
    if (!siswaData.length) return;

    const dataExport = siswaData.map((s, i) => ({
      No: i + 1,
      Nama: s.nama,
      Kelas: s.kelas,
      "Rata-rata": Number(s.rata || 0).toFixed(1),
      Status: s.status,
      Jurusan: s.jurusan || "-",
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(dataExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Siswa");

    XLSX.writeFile(workbook, "data_siswa.xlsx");
  };

  const [statsData, setStatsData] = useState({
    totalSiswa: 0,
    totalRekomendasi: 0,
    pending: 0,
  });

  // Fetch stats dari endpoint dashboard (sama persis dengan GuruDashboard)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await guruAPI.getDashboardStats();
        setStatsData(data);
      } catch (error) {
        console.error("Error fetch stats:", error);
      }
    };
    fetchStats();
  }, []);

  const [filterPaket, setFilterPaket] = useState("");
  const [filterKelas, setFilterKelas] = useState("");
  
  const fetchSiswa = async () => {
    // 🔥 TAMBAH LOG INI
    console.log("Fetching dengan:", { searchTerm, filterPaket, filterKelas });
    
    try {
      setLoading(true);
      const url = `${API_BASE_URL}/guru/siswa?search=${searchTerm}&paket=${filterPaket}&kelas=${filterKelas}`;
      console.log("URL:", url); // 🔥 Lihat URL di konsol
      
      const res = await fetch(url);
      const data = await res.json();

      const safeData = Array.isArray(data)
        ? data.map((s: any) => ({
            ...s,
            nama: String(s.nama || ""), // 🔥 fix utama
            kelas: String(s.kelas || ""),
          }))
        : [];

      setSiswaData(safeData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchSiswa();
    }, 300);

    return () => clearTimeout(delay);
  }, [searchTerm, filterPaket, filterKelas]);

  if (loading) {
    return <p className="p-6">Loading data siswa...</p>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Siswa</h1>
          <p className="text-gray-500 mt-1">
            Data siswa untuk proses rekomendasi jurusan
          </p>
        </div>
        <button
          onClick={exportToExcel}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Export Excel
        </button>
      </div>
      
      {/* STATS — ngambil dari getDashboardStats(), sama kayak GuruDashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-500">Total Siswa</p>
          <p className="text-2xl font-bold mt-1">{statsData.totalSiswa}</p>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-500">Rekomendasi Dibuat</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {statsData.totalRekomendasi}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {statsData.pending}
          </p>
        </div>
      </div>
      
      {/* SEARCH + FILTER */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari nama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2 items-center w-full md:w-auto">
            <Filter className="text-gray-400 w-5 h-5 hidden md:block" />

            {/* FILTER PAKET */}
            <select
              value={filterPaket}
              onChange={(e) => setFilterPaket(e.target.value)}
              className="border px-3 py-2 rounded-lg text-sm w-full md:w-auto outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Paket</option>
              <option value="Paket A">Paket A</option>
              <option value="Paket B">Paket B</option>
              <option value="Paket C">Paket C</option>
              <option value="Paket D">Paket D</option>
              <option value="Paket E">Paket E</option>
              <option value="Paket F">Paket F</option>
              <option value="Paket G">Paket G</option>
            </select>

{/* FILTER KELAS */}
<select
  value={filterKelas}
  onChange={(e) => setFilterKelas(e.target.value)}
  className="border px-3 py-2 rounded-lg text-sm w-full md:w-auto outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="">Semua Kelas</option>
  <option value="X-A">X-A</option>
  <option value="X-B">X-B</option>
  <option value="X-C">X-C</option>
  <option value="X-D">X-D</option>
  <option value="X-E">X-E</option>
  <option value="X-F">X-F</option>
  <option value="X-G">X-G</option>
</select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse whitespace-nowrap">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nama</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Kelas</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Rata-rata</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Jurusan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {siswaData.length > 0 ? (
                siswaData.map((s, index) => (
                  <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {s.nama}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {s.kelas || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      {Number(s.rata || 0).toFixed(1)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {s.status === "Sudah Diproses" ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          Sudah Diproses
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                          Belum Diproses
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {s.jurusan ? (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          {s.jurusan}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Tidak ada data siswa yang cocok dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}