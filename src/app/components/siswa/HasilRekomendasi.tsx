import { Users } from 'lucide-react';
import { useEffect, useState } from "react";
import { API_BASE_URL } from '../../../config';

export function HasilRekomendasi() {
  const [dataPaket, setDataPaket] = useState<any>({});
  const [totalSiswa, setTotalSiswa] = useState(0);
  const [processed, setProcessed] = useState(0);
  const [pending, setPending] = useState(0);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/siswa/kuota`);
        const data = await res.json();



        setProcessed(data.processed);
        setPending(data.pending);
        setDataPaket(data.paket || {});
        setTotalSiswa(data.total);
      } catch (err) {
        console.error("Gagal ambil data kuota:", err);
      }
    };

    fetchData();
  }, []);

  const RankingTable = ({ paket, data, kuota }: any) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h3 className="text-2xl font-bold">Paket {paket}</h3>
          <p>Kuota: {kuota} | Terdaftar: {data.length}</p>
        </div>

        {/* TABLE */}
        <table className="w-full border-collapse">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-4 py-3 text-left border">Peringkat</th>
      <th className="px-4 py-3 text-left border">Nama</th>
      <th className="px-4 py-3 text-left border">Kelas</th>
      <th className="px-4 py-3 text-left border">Rata-rata</th>
      <th className="px-4 py-3 text-left border">Confidence</th>
    </tr>
  </thead>

  <tbody>
    {data.map((s: any) => (
      <tr key={s.nama}
      >
        <td className="px-4 py-3 border">{s.rank}</td>
        <td className="px-4 py-3 border">{s.nama}</td>
        <td className="px-4 py-3 border">{s.kelas}</td>
        <td className="px-4 py-3 border">
          {s.rataRata ? Number(s.rataRata).toFixed(1) : "-"}
        </td>
        <td className="px-4 py-3 border">{s.confidence}%</td>
        <td className="px-4 py-3 border">
        </td>
      </tr>
    ))}
  </tbody>
</table>

        {/* WARNING */}
        {data.length >= kuota && (
          <div className="bg-amber-50 p-3 text-sm text-amber-700">
            ⚠️ Kuota penuh
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl text-white">
        <div className="flex items-center gap-3">
          <Users className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">Hasil Rekomendasi</h1>
            <p className="text-blue-100">Paket A - G</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

  <div className="bg-white p-6 rounded-xl border">
    <h3 className="text-gray-500 text-sm">Total Siswa</h3>
    <p className="text-3xl font-bold mt-2">{totalSiswa}</p>
  </div>

  <div className="bg-white p-6 rounded-xl border">
    <h3 className="text-gray-500 text-sm">Rekomendasi Dibuat</h3>
    <p className="text-3xl font-bold text-green-600 mt-2">
      {processed}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl border">
    <h3 className="text-gray-500 text-sm">Pending</h3>
    <p className="text-3xl font-bold text-orange-500 mt-2">
      {pending}
    </p>
  </div>

</div>


      {/* KUOTA PER PAKET */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(dataPaket || {}).map(([paket, val]: any) => {
          const sisa = val.kuota - val.data.length;

          return (
            <div
  key={paket}
  className={`
    p-4 rounded-xl border transition-all

    ${val.data.length > 0
      ? "bg-blue-50 border-blue-300"
      : "bg-white"}
  `}
>
              <h4 className="font-bold">Paket {paket}</h4>
              <p className="font-bold text-lg">
  {val.data.length}/{val.kuota}
</p>
              <p
  className={`text-sm font-medium ${
    sisa <= 5
      ? "text-red-500"
      : "text-gray-500"
  }`}
>
                {sisa > 0 ? `${sisa} slot tersisa` : "Penuh"}
              </p>
            </div>
          );
        })}
      </div>

      {/* TABLE PER PAKET */}
      <div className="space-y-6">
        {Object.entries(dataPaket).map(([paket, val]: any) => (
          <RankingTable
            key={paket}
            paket={paket}
            data={val.data}
            kuota={val.kuota}
          />
        ))}
      </div>

    </div>
  );
}