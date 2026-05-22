import { useState } from "react";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../services/api";
import { API_BASE_URL } from '../../config';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  // ✅ LOGIN
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await authAPI.login({
        email: identifier,
        password,
      });

      if (user.token) {
        localStorage.setItem("token", user.token);
      }

      login(user);

      if (user.role === "siswa") {
        navigate("/siswa/dashboard");
      } else if (user.role === "guru") {
        navigate("/guru/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      alert("Login gagal ❌");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ FORGOT PASSWORD
  const handleForgotPassword = async () => {
    if (!identifier) {
      alert("Isi email dulu bro 😅");
      return;
    }

    setIsForgotLoading(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: identifier }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Link reset dikirim ke email lu 📩");
    } catch (err: any) {
      alert(err.message || "Gagal kirim email");
    } finally {
      setIsForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex selection:bg-blue-200 selection:text-blue-900">
      {/* LEFT SECTION (IMAGE) */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden group">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1771408427146-09be9a1d4535"
          alt="Education"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        {/* Gradient Overlay biar lebih premium */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-900/80 to-blue-800/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white p-12">
          <div className="text-center transform transition-all duration-700 hover:-translate-y-2">
            <div className="inline-block p-4 bg-white/10 rounded-full backdrop-blur-md mb-6 border border-white/20 shadow-2xl">
              <GraduationCap className="w-20 h-20 text-blue-100" />
            </div>
            <h2 className="text-4xl font-extrabold mb-4 leading-tight tracking-tight">
              Portal Sistem Rekomendasi <br /> Jurusan SMAN 3 TUBAN
            </h2>
            <p className="text-lg text-blue-100/90 font-light max-w-lg mx-auto">
              Sistem cerdas rekomendasi jurusan siswa  menggunakan metode Decision Tree.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION (FORM) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50 relative overflow-hidden">
        
        {/* BACKGROUND ANIMATIONS (Nilai Plus Wkwk) */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="w-full max-w-md relative z-10">
          
          {/* HEADER MOVED OUTSIDE THE CARD */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg border border-slate-100 mb-5 text-blue-600 animate-bounce" style={{ animationDuration: '3s' }}>
              <GraduationCap className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
              Selamat Datang
            </h1>
            <p className="text-slate-500 font-medium">
              Silakan masuk ke akun Anda
            </p>
          </div>

          {/* CARD FORM */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 p-8 transition-all duration-300 hover:shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* EMAIL */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Alamat Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="email"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-300"
                    placeholder="contoh@email.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-300"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* FORGOT PASSWORD */}
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Lupa password?
                </button>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Memproses...
                  </>
                ) : (
                  <>
                    Masuk Sekarang
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* FOOTER TEXT (Optional) */}
          <p className="text-center text-slate-400 text-xs mt-8">
            © {new Date().getFullYear()} SMAN 3 TUBAN. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}