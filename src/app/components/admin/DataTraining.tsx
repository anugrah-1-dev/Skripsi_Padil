import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';

export function DataTraining() {
  const [search, setSearch] = useState("");
  const [filterKelas, setFilterKelas] = useState("");
  const [filterJurusan, setFilterJurusan] = useState("");
  const [trainingData, setTrainingData] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);
  
  // 🔥 REVISI: Kelas disamakan jadi X-A sampai X-G
  const kelasList = ["X-A", "X-B", "X-C", "X-D", "X-E", "X-F", "X-G"];
  
  const [formData, setFormData] = useState({
    nama: "",
    kelas: "",
    pai: 0,
    ppkn: 0,
    bahasa_indonesia: 0,
    bahasa_inggris: 0,
    matematika_umum: 0,
    ipa: 0,
    ips: 0,
    bahasa_daerah: 0,
    pjok: 0,
    seni: 0,
    informatika: 0,
    jurusan: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/training-data`);
      setTrainingData(res.data);
    } catch (err) {
      console.error("ERROR FETCH:", err);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // Kalau input angka, dibatasi 0 - 100
    if (e.target.type === "number") {
      let val = Number(value);
      if (val > 100) val = 100;
      if (val < 0) val = 0;
      setFormData({ ...formData, [name]: val });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`${API_BASE_URL}/admin/training-data/${id}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (data: any) => {
    setEditingData(data);
    setFormData({
      nama: data.nama || "",
      kelas: data.kelas || "",
      pai: data.pai || 0,
      ppkn: data.ppkn || 0,
      bahasa_indonesia: data.bahasa_indonesia || 0,
      bahasa_inggris: data.bahasa_inggris || 0,
      matematika_umum: data.matematika_umum || 0,
      ipa: data.ipa || 0,
      ips: data.ips || 0,
      bahasa_daerah: data.bahasa_daerah || 0,
      pjok: data.pjok || 0,
      seni: data.seni || 0,
      informatika: data.informatika || 0,
      jurusan: data.jurusan || ""
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingData(null);
    setFormData({
      nama: "",
      kelas: "",
      pai: 0,
      ppkn: 0,
      bahasa_indonesia: 0,
      bahasa_inggris: 0,
      matematika_umum: 0,
      ipa: 0,
      ips: 0,
      bahasa_daerah: 0,
      pjok: 0,
      seni: 0,
      informatika: 0,
      jurusan: ""
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.nama || !formData.kelas || !formData.jurusan) {
      alert("Nama, Kelas, dan Jurusan wajib diisi!");
      return;
    }

    const cleanedData = {
      ...formData,
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
        await axios.put(`${API_BASE_URL}/admin/training-data/${editingData.id}`, cleanedData);
      } else {
        await axios.post(`${API_BASE_URL}/admin/training-data`, cleanedData);
      }
      setShowModal(false);
      fetchData();
    } catch (err: any) {
      console.error("ERROR SAVE:", err);
      alert("Gagal simpan data");
    }
  };

  // 🔥 FILTERING (PAGINATION DIHAPUS)
  const filteredData = trainingData.filter((d) => {
    const matchSearch = (d.nama || "").toLowerCase().includes(search.toLowerCase());
    const matchKelas = filterKelas ? d.kelas === filterKelas : true;
    const matchJurusan = filterJurusan ? d.jurusan === filterJurusan : true;
    return matchSearch && matchKelas && matchJurusan;
  });

  return (
    <div className="space-y-6">
      
      {/* HEADER (Disamakan dengan DataSiswa) */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Data Training</h1>
          <p className="text-sm text-gray-500 mt-1">Data historis siswa untuk training model Decision Tree</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          Tambah
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded bg-white">
          <p className="text-gray-500 text-sm">Total Data Training</p>
          <h2 className="text-2xl font-bold">{trainingData.length}</h2>
        </div>
      </div>

      {/* SEARCH & FILTER */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Cari nama siswa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/3"
        />
        
        <select
          value={filterKelas}
          onChange={(e) => setFilterKelas(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Semua Kelas</option>
          {kelasList.map(k => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>

        <select
          value={filterJurusan}
          onChange={(e) => setFilterJurusan(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Semua Jurusan</option>
          <option value="Paket A">Paket A</option>
          <option value="Paket B">Paket B</option>
          <option value="Paket C">Paket C</option>
          <option value="Paket D">Paket D</option>
          <option value="Paket E">Paket E</option>
          <option value="Paket F">Paket F</option>
          <option value="Paket G">Paket G</option>
        </select>
      </div>

      {/* TABLE */}
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white">
        <thead>
          <tr className="bg-gray-100 text-left text-sm">
            <th className="px-4 py-3">Nama</th>
            <th className="px-4 py-3">Kelas</th>
            <th className="px-4 py-3">Rata Keseluruhan</th>
            <th className="px-4 py-3">Jurusan</th>
            <th className="px-4 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((data) => (
              <tr key={data.id} className="border-t hover:bg-gray-50 text-sm">
                <td className="px-4 py-3 font-medium text-gray-900">{data.nama}</td>
                <td className="px-4 py-3 text-gray-600">{data.kelas}</td>
                <td className="px-4 py-3 font-semibold text-gray-900">
                  {Number(data.rata_total ?? 0).toFixed(1)}
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                    {data.jurusan}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(data)}
                      className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(data.id)}
                      className="p-1.5 text-red-600 hover:bg-red-100 rounded transition"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-8 text-center text-gray-500">
                Tidak ada data training yang ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MODAL (Disamakan strukturnya dengan DataSiswa) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-5xl space-y-6 max-h-[90vh] overflow-y-auto shadow-lg">
            
            <h2 className="text-2xl font-bold">
              {editingData ? "Edit Data Training" : "Tambah Data Training"}
            </h2>

            {/* FORM UTAMA (Grid 3 Kolom biar estetik) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600 font-medium">Nama Siswa</label>
                <input
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama siswa"
                  className="w-full border p-2 rounded mt-1 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 font-medium">Kelas</label>
                <select
                  name="kelas"
                  value={formData.kelas}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mt-1 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Pilih Kelas --</option>
                  {kelasList.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600 font-medium">Jurusan Target</label>
                <select
                  name="jurusan"
                  value={formData.jurusan}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mt-1 outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                >
                  <option value="">-- Pilih Jurusan --</option>
                  <option value="Paket A">Paket A</option>
                  <option value="Paket B">Paket B</option>
                  <option value="Paket C">Paket C</option>
                  <option value="Paket D">Paket D</option>
                  <option value="Paket E">Paket E</option>
                  <option value="Paket F">Paket F</option>
                  <option value="Paket G">Paket G</option>
                </select>
              </div>
            </div>

            {/* NILAI MAPEL (Grid 3 Kolom seperti DataSiswa) */}
            <div>
              <h3 className="text-lg font-semibold mb-3 border-t pt-4">Nilai Mata Pelajaran</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { key: "pai", label: "PAI" },
                  { key: "ppkn", label: "PPKN" },
                  { key: "bahasa_indonesia", label: "Bahasa Indonesia" },
                  { key: "bahasa_inggris", label: "Bahasa Inggris" },
                  { key: "matematika_umum", label: "Matematika Umum" },
                  { key: "ipa", label: "IPA" },
                  { key: "ips", label: "IPS" },
                  { key: "bahasa_daerah", label: "Bahasa Daerah" },
                  { key: "pjok", label: "PJOK" },
                  { key: "seni", label: "Seni" },
                  { key: "informatika", label: "Informatika" }
                ].map((mapel) => (
                  <div key={mapel.key}>
                    <label className="text-xs text-gray-500 font-medium">{mapel.label}</label>
                    <input
                      type="number"
                      name={mapel.key}
                      // @ts-ignore
                      value={formData[mapel.key] === 0 ? "" : formData[mapel.key]}
                      onChange={handleChange}
                      placeholder="0 - 100"
                      min={0}
                      max={100}
                      className="w-full border p-2 rounded mt-1 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* BUTTON ACTION MODAL */}
            <div className="flex justify-end gap-3 pt-4 mt-2 border-t">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition font-medium text-gray-600"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
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