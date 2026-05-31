import { useEffect, useState } from "react";
import { API_BASE_URL } from '../../../config';

interface User {
  id: number;
  nama: string;
  email: string;
  role: string;
  kelas?: string;
  password?: string; // Tambahkan ini jika API mengirim hash
}

export function KontrolUser() {
  const [users, setUsers] = useState<User[]>([]);
  
  // State untuk Fitur Search
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    nama: "",
    email: "",
    passwordBaru: "", // Diganti namanya biar lebih jelas
    role: "siswa",
  });

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // State untuk Show/Hide Password
  const [showNewPassword, setShowNewPassword] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data.data)) {
        setUsers(data.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error(err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        nama: form.nama,
        email: form.email,
        // Backend lu harusnya nangkep "password" dari form.passwordBaru ini
        password: form.passwordBaru, 
        role: form.role,
      };

      if (editingId) {
        await fetch(`${API_BASE_URL}/users/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        alert("User berhasil diupdate! Jika password diisi, password telah diganti.");
      } else {
        await fetch(`${API_BASE_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        alert("User berhasil ditambahkan");
      }

      setForm({
        nama: "",
        email: "",
        passwordBaru: "",
        role: "siswa",
      });
      setEditingId(null);
      setShowModal(false);
      setShowNewPassword(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    }
  };

  const handleEdit = (user: User) => {
    setShowModal(true);
    setEditingId(user.id);
    setForm({
      nama: user.nama,
      email: user.email,
      passwordBaru: "", // Dikosongkan, nunggu inputan baru kalau mau direset
      role: user.role,
    });
    setShowNewPassword(false);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus user ini?");
    if (!confirmDelete) return;

    try {
      await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
      });
      alert("User berhasil dihapus");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 text-white shadow-md">
        <h1 className="text-3xl font-bold">Pengaturan User</h1>
        <p className="text-indigo-100 mt-1 text-lg">Kelola akun user sistem secara keseluruhan</p>
      </div>

      {/* TOP ACTION & SEARCH */}
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6 w-full xl:flex-1">
          <div className="bg-white shadow-md border border-gray-200 rounded-2xl px-8 py-5 min-w-[180px] flex flex-col justify-center items-center md:items-start shrink-0">
            <p className="text-base text-gray-500 font-bold mb-1 uppercase tracking-wider">Total User</p>
            <h2 className="text-4xl font-black text-gray-800">{users.length}</h2>
          </div>

          <div className="relative w-full md:max-w-[600px] flex-1">
            <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari nama user disini..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-2 border-gray-300 pl-16 pr-8 py-5 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 outline-none shadow-md transition-all text-gray-800 text-xl placeholder:text-gray-400 font-semibold h-full"
            />
          </div>
        </div>

        <button
          onClick={() => {
            setShowModal(true);
            setEditingId(null);
            setForm({ nama: "", email: "", passwordBaru: "", role: "siswa" });
            setShowNewPassword(false);
          }}
          className="w-full xl:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all whitespace-nowrap flex items-center justify-center gap-3 text-xl shrink-0 h-full"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          Tambah User
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowModal(false)} className="absolute top-5 right-5 text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-red-50 rounded-full p-2 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <h2 className="text-2xl font-extrabold text-gray-800 mb-6 border-b pb-4">
              {editingId ? "Ubah Data User" : "Tambah User Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                  <input type="text" placeholder="Masukkan nama lengkap" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="w-full border border-gray-300 bg-gray-50 p-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <input type="email" placeholder="Masukkan email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-300 bg-gray-50 p-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Role</label>
                  <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full border border-gray-300 bg-gray-50 p-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="admin">Admin</option>
                    <option value="guru">Guru</option>
                    <option value="siswa">Siswa</option>
                  </select>
                </div>



                {/* 2 KOLOM PASSWORD SEPERTI REQUEST */}
                <div className="md:col-span-2 bg-gray-50 p-5 rounded-xl border border-gray-200 mt-2">
                  <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Autentikasi & Password
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* KOLOM 1: PASSWORD LAMA (READ-ONLY) */}
                    <div className="relative opacity-70">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Status Password Saat Ini
                      </label>
                      <input
                        type="text"
                        value={editingId ? "•••••••• (Terenkripsi)" : "Belum Ada Password"}
                        disabled
                        className="w-full border border-gray-200 bg-gray-100 text-gray-500 p-3 rounded-xl outline-none cursor-not-allowed font-medium"
                      />
                      {editingId && (
                        <p className="text-xs text-orange-500 mt-2 font-medium">
                          *Admin tidak dapat melihat password asli karena sistem menggunakan hashing (Keamanan Standar).
                        </p>
                      )}
                    </div>

                    {/* KOLOM 2: PASSWORD BARU (INPUT) */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        {editingId ? "Reset/Ganti Password Baru" : "Buat Password"}
                      </label>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder={editingId ? "Isi untuk reset password" : "Masukkan password baru"}
                        value={form.passwordBaru}
                        onChange={(e) => setForm({ ...form, passwordBaru: e.target.value })}
                        required={!editingId}
                        className={`w-full border p-3 pr-12 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${form.passwordBaru ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-[34px] p-1 text-gray-500 hover:text-blue-600 transition"
                      >
                        {showNewPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8 border-t pt-5">
                <button type="button" onClick={() => setShowModal(false)} className="mr-3 px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition">Batal</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl font-bold shadow-lg">
                  {editingId ? "Simpan Perubahan" : "Simpan User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-5 text-left font-bold text-gray-600 uppercase text-sm tracking-wider">Nama Lengkap</th>
                <th className="p-5 text-left font-bold text-gray-600 uppercase text-sm tracking-wider">Email</th>
                <th className="p-5 text-left font-bold text-gray-600 uppercase text-sm tracking-wider">Role</th>
                <th className="p-5 text-left font-bold text-gray-600 uppercase text-sm tracking-wider">Kelas</th>
                <th className="p-5 text-center font-bold text-gray-600 uppercase text-sm tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                    <td className="p-5 text-gray-800 font-bold text-base">{user.nama}</td>
                    <td className="p-5 text-gray-600 font-medium">{user.email}</td>
                    <td className="p-5">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider
                        ${user.role === 'admin' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 
                          user.role === 'guru' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-green-100 text-green-700 border border-green-200'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-5 text-gray-600 font-medium">{user.kelas || "-"}</td>
                    <td className="p-5 flex gap-3 justify-center">
                      <button onClick={() => handleEdit(user)} className="bg-amber-500 hover:bg-amber-600 shadow-md transition text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> Edit
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="bg-red-500 hover:bg-red-600 shadow-md transition text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-gray-500 font-semibold text-lg bg-gray-50/50">
                    Tidak ada user yang ditemukan.
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