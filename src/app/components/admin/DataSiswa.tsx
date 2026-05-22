import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, Search, Filter } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from '../../../config';

export function DataSiswa() {
  const [siswaData, setSiswaData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalSiswa: 0,
    rekomendasiDibuat: 0,
    pending: 0
  });
  const [showModal, setShowModal] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  
  const nilaiList = [
    "pai","ppkn","bahasa_indonesia","bahasa_inggris",
    "matematika_umum","ipa","ips",
    "bahasa_daerah","pjok","seni","informatika"
  ];
  
  // 🔥 REVISI: Pilihan Kelas disesuaikan dengan Database (X-A sampai X-G)
  const kelasList = [
    "X-A", "X-B", "X-C", "X-D",
    "X-E", "X-F", "X-G"
  ];

  // 🔥 FETCH DATA
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/siswa-data`);
      console.log("SISWA:", res.data);
      setSiswaData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/siswa-stats`);
      console.log("STATS:", res.data); // 🔥 DEBUG
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchStats();
  }, []);

  // 🔥 FILTER
  const filteredData = siswaData.filter((siswa: any) => {
    const nama = (siswa.nama ?? "").toString().toLowerCase();
    const kelas = (siswa.kelas ?? "").toString().toLowerCase();

    const matchSearch =
      nama.includes(searchTerm.toLowerCase()) ||
      kelas.includes(searchTerm.toLowerCase());

    return matchSearch;
  });

  const [formData, setFormData] = useState<any>({
    nama: "",
    kelas: "",

    // 🔥 11 MAPEL
    pai: "",
    ppkn: "",
    bahasa_indonesia: "",
    bahasa_inggris: "",
    matematika_umum: "",
    ipa: "",
    ips: "",
    bahasa_daerah: "",
    pjok: "",
    seni: "",
    informatika: ""
  });

  const rataRata = (
    nilaiList.reduce((acc, key) => acc + Number(formData[key] || 0), 0) / 11
  ).toFixed(1);

  const handleChange = (e:any) => {
    const { name, value } = e.target;

    if (nilaiList.includes(name)) {
      if (value > 100) {
        alert("Nilai maksimal 100!");
        return;
      }
      if (value < 0) {
        alert("Nilai minimal 0!");
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  // 🔥 DELETE
  const handleDelete = async (id: number) => {
    if (confirm("Yakin hapus?")) {
      try {
        const res = await axios.delete(
          `${API_BASE_URL}/admin/siswa-data/${id}`
        );
        console.log("DELETE SUCCESS:", res.data);

        fetchData();
      } catch (err) {
        console.error("DELETE ERROR:", err);
      }
    }
  };

  const handleAdd = () => {
    setEditingData(null);

    setFormData({
      nama: "",
      kelas: "",
      
      pai: "",
      ppkn: "",
      bahasa_indonesia: "",
      bahasa_inggris: "",
      matematika_umum: "",
      ipa: "",
      ips: "",
      bahasa_daerah: "",
      pjok: "",
      seni: "",
      informatika: ""
    });

    setShowModal(true);
  };

  const handleEdit = (siswa: any) => {
    setEditingData(siswa);
    setFormData({
      nama: siswa.nama || "",
      kelas: siswa.kelas || "",
      
      pai: siswa.pai || "",
      ppkn: siswa.ppkn || "",
      bahasa_indonesia: siswa.bahasa_indonesia || "",
      bahasa_inggris: siswa.bahasa_inggris || "",
      matematika_umum: siswa.matematika_umum || "",
      ipa: siswa.ipa || "",
      ips: siswa.ips || "",
      bahasa_daerah: siswa.bahasa_daerah || "",
      pjok: siswa.pjok || "",
      seni: siswa.seni || "",
      informatika: siswa.informatika || ""
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);

    // 🔥 BIKIN DATA BERSIH DI AWAL
    const cleanData = {
      ...formData,
      confidence: Number(formData.confidence) || 0,

      pai: Number(formData.pai) || 0,
      ppkn: Number(formData.ppkn) || 0,
      bahasa_indonesia: Number(formData.bahasa_indonesia) || 0,
      bahasa_inggris: Number(formData.bahasa_inggris) || 0,
      matematika_umum: Number(formData.matematika_umum) || 0,
      ipa: Number(formData.ipa) || 0,
      ips: Number(formData.ips) || 0,
      bahasa_daerah: Number(formData.bahasa_daerah) || 0,
      pjok: Number(formData.pjok) || 0,
      seni: Number(formData.seni) || 0,
      informatika: Number(formData.informatika) || 0,
    };

    try {
      if (editingData) {
        await axios.put(
          `${API_BASE_URL}/admin/siswa-data/${editingData.id}`,
          cleanData // ✅ pake ini
        );
      } else {
        await axios.post(
          `${API_BASE_URL}/admin/siswa-data`,
          cleanData // ✅ pake ini juga
        );
      }

      setShowModal(false);
      fetchData();

      // 🔥 reset biar ga nyangkut data lama
      setFormData({
        nama: "",
        kelas: "",
        
        pai: "",
        ppkn: "",
        bahasa_indonesia: "",
        bahasa_inggris: "",
        matematika_umum: "",
        ipa: "",
        ips: "",
        bahasa_daerah: "",
        pjok: "",
        seni: "",
        informatika: ""
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  function getColor(jurusan: string) {
    switch (jurusan) {
      case "Paket A":
        return "bg-red-100 text-red-700";
      case "Paket B":
        return "bg-green-100 text-green-700";
      case "Paket C":
        return "bg-blue-100 text-blue-700";
      case "Paket D":
        return "bg-yellow-100 text-yellow-700";
      case "Paket E":
        return "bg-purple-100 text-purple-700";
      case "Paket F":
        return "bg-pink-100 text-pink-700";
      case "Paket G":
        return "bg-indigo-100 text-indigo-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }
  
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Data Siswa</h1>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          <Plus className="w-4 h-4" />
          Tambah
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border rounded">
          <p>Total Siswa</p>
          <h2>{stats.totalSiswa}</h2>
        </div>

        <div className="p-4 border rounded">
          <p>Belum Diproses</p>
          <h2>{stats.pending}</h2>
        </div>

        <div className="p-4 border rounded">
          <p>Sudah Diproses</p>
          <h2>{stats.rekomendasiDibuat}</h2>
        </div>
      </div>
      
      {/* SEARCH */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Cari..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      {/* TABLE */}
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left text-sm">
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Kelas</th>
            <th className="px-4 py-2">Rata-rata</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((siswa: any) => (
            <tr key={siswa.id} className="border-t hover:bg-gray-50 text-sm">
              <td className="px-4 py-2">{siswa.nama}</td>

              <td className="px-4 py-2">{siswa.kelas}</td>

              <td className="px-4 py-2 font-semibold">
                {Number(siswa.rata || 0).toFixed(1)}
              </td>
              <td className="px-4 py-2">
                <span
                  className={
                    siswa.status === "Sudah Diproses"
                      ? "text-green-600 font-semibold"
                      : "text-orange-500 font-semibold"
                  }
                >
                  {siswa.status}
                </span>
              </td>
                
              {/* AKSI */}
              <td className="px-4 py-2">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(siswa)}
                    className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(siswa.id)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          
          <div className="bg-white p-8 rounded-2xl w-full max-w-5xl space-y-6 max-h-[90vh] overflow-y-auto shadow-lg">

            <h2 className="text-2xl font-bold">
              {editingData ? "Edit Siswa" : "Tambah Siswa"}
            </h2>

            {/* 🔥 FORM UTAMA (2 KOLOM) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="text-sm text-gray-600">Nama</label>
                <input
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama siswa"
                  className="w-full border p-2 rounded mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Kelas</label>
                <select
                  name="kelas"
                  value={formData.kelas}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mt-1"
                >
                  <option value="">-- Pilih Kelas --</option>
                  {kelasList.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* 🔥 NILAI MAPEL */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Nilai Mata Pelajaran
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { key: "pai", label: "PAI" },
                  { key: "ppkn", label: "PPKN" },
                  { key: "bahasa_indonesia", label: "Bahasa Indonesia" },
                  { key: "bahasa_inggris", label: "Bahasa Inggris" },
                  { key: "matematika_umum", label: "Matematika" },
                  { key: "ipa", label: "IPA" },
                  { key: "ips", label: "IPS" },
                  { key: "bahasa_daerah", label: "Bahasa Daerah" },
                  { key: "pjok", label: "PJOK" },
                  { key: "seni", label: "Seni" },
                  { key: "informatika", label: "Informatika" }
                ].map((mapel) => (
                  <div key={mapel.key}>
                    <label className="text-xs text-gray-500">{mapel.label}</label>
                    <input
                      type="number"
                      name={mapel.key}
                      value={formData[mapel.key] || ""}
                      onChange={handleChange}
                      placeholder="0 - 100"
                      min={0} 
                      max={100}
                      className="w-full border p-2 rounded mt-1"
                    />
                  </div>
                ))}
                
              </div>
              <div className="bg-gray-100 p-3 rounded text-center font-semibold mt-4">
                Rata-rata Nilai: {rataRata}
              </div>
            </div>

            {/* BUTTON */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Batal
              </button>

              <button
                type="button"   // 🔥 WAJIB
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Simpan
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}