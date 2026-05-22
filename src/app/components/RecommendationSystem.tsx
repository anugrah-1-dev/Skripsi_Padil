import { Brain, TrendingUp, Award, Users, GitBranch, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';

export function RecommendationSystem() {
  const features = [
    {
      icon: Brain,
      title: 'Algoritma C4.5',
      description: 'Menggunakan Decision Tree C4.5 untuk analisis data yang akurat dan transparan'
    },
    {
      icon: TrendingUp,
      title: 'Akurasi Tinggi',
      description: 'Model dengan tingkat akurasi 92% berdasarkan data historis siswa'
    },
    {
      icon: GitBranch,
      title: 'Visualisasi Pohon',
      description: 'Lihat proses pengambilan keputusan dalam bentuk pohon yang mudah dipahami'
    },
    {
      icon: Award,
      title: 'Rekomendasi Personal',
      description: 'Saran jurusan yang disesuaikan dengan nilai dan minat setiap siswa'
    }
  ];

  const steps = [
    'Siswa mengisi data nilai akademik dan minat',
    'Sistem memproses data menggunakan algoritma C4.5',
    'Model menghitung Information Gain dari setiap atribut',
    'Hasil rekomendasi jurusan ditampilkan dengan tingkat keyakinan'
  ];

  return (
    <section id="recommendation-system" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            Teknologi Cerdas
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sistem Rekomendasi Jurusan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Membantu siswa memilih jurusan yang tepat menggunakan algoritma Decision Tree C4.5
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* How it Works */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Cara Kerja Sistem</h3>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-gray-700">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">Jurusan yang Tersedia</h4>
            <div className="space-y-3">
              {[
                { name: 'IPA (Ilmu Pengetahuan Alam)', color: 'bg-blue-500' },
                { name: 'IPS (Ilmu Pengetahuan Sosial)', color: 'bg-green-500' },
                { name: 'Bahasa', color: 'bg-orange-500' },
                { name: 'TKJ (Teknik Komputer Jaringan)', color: 'bg-purple-500' }
              ].map((jurusan, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${jurusan.color}`}></div>
                  <span className="text-gray-900 font-medium">{jurusan.name}</span>
                  <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-1">156+</div>
              <div className="text-blue-100">Siswa Terlayani</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-1">92%</div>
              <div className="text-blue-100">Akurasi Model</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-1">120+</div>
              <div className="text-blue-100">Data Training</div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xl mb-6">Mulai konsultasi jurusan Anda sekarang!</p>
            <Link 
              to="/login"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Masuk ke Sistem
            </Link>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Tentang Proyek Ini</h4>
          <p className="text-gray-700 text-sm">
            Sistem Rekomendasi Jurusan ini merupakan bagian dari Tugas Akhir Skripsi yang mengimplementasikan 
            algoritma Decision Tree C4.5 untuk membantu siswa memilih jurusan yang sesuai dengan kemampuan akademik 
            dan minat mereka. Sistem ini dirancang untuk memberikan rekomendasi yang objektif dan transparan 
            dengan visualisasi proses pengambilan keputusan.
          </p>
        </div>
      </div>
    </section>
  );
}
