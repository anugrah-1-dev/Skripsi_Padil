import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { API_BASE_URL } from '../../config';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // EFFECT UNTUK COOLDOWN TIMER
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const sendEmail = async () => {
    if (!email) {
      return toast.error("Email wajib diisi 😑");
    }

    if (!isValidEmail(email)) {
      return toast.error("Format email gak valid bro 📛");
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Link reset dikirim ke email 📩");
      setSent(true);
      setCooldown(60); // Mulai cooldown 60 detik setelah sukses
    } catch (err: any) {
      toast.error(err.message || "Gagal kirim email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      {/* Card Wrapper */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 w-full max-w-md transition-all duration-300">
        
        {/* Header Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl">🔐</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            Lupa Password
          </h2>
        </div>

        {!sent ? (
          <>
            <p className="text-slate-500 text-sm mb-5 text-center leading-relaxed">
              Masukkan email yang terdaftar untuk menerima link verifikasi reset password.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Alamat Email
                </label>
                <input
                  type="email"
                  placeholder="contoh@email.com"
                  className="w-full border border-slate-200 px-4 py-3 rounded-xl text-slate-700 placeholder-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                onClick={sendEmail}
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-sm shadow-sm shadow-blue-200 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading || cooldown > 0}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Mengirim...
                  </>
                ) : cooldown > 0 ? (
                  `Tunggu ${cooldown}s`
                ) : (
                  "Kirim Link Reset"
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Success Alert Card */}
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-xl text-center text-sm mb-5 leading-relaxed">
              <span className="text-lg block mb-1">📩 Email Berhasil Dikirim!</span>
              Silakan periksa folder **Inbox** atau **Spam** pada email <span className="font-semibold">{email}</span>.
            </div>

            <button
              onClick={sendEmail}
              disabled={loading || cooldown > 0}
              className="w-full border border-slate-200 hover:bg-slate-50 active:bg-slate-100 text-slate-700 py-3 rounded-xl mb-3 font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cooldown > 0 ? `🔄 Kirim Ulang (${cooldown}s)` : "🔄 Kirim Ulang"}
            </button>
          </>
        )}

        {/* Back To Login Button */}
        <button
          onClick={() => navigate("/login")}
          className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700 w-full flex items-center justify-center gap-1 transition-all duration-200"
        >
          <span>←</span> Kembali ke Halaman Login
        </button>
      </div>
    </div>
  );
}