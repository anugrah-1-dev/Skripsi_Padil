import { useState } from 'react';
import { Play, CheckCircle, AlertCircle, TrendingUp, Database } from 'lucide-react';

// Simplified C4.5 calculation display
export function ProsesDecisionTree() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleProcess = () => {
    setIsProcessing(true);
    setProgress(0);
    setProcessComplete(false);

    // Simulate processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setProcessComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Mock calculation data for C4.5
  const attributes = [
    { name: 'Matematika', entropy: 0.94, gain: 0.42, selected: true },
    { name: 'IPA', entropy: 0.89, gain: 0.38, selected: false },
    { name: 'IPS', entropy: 0.91, gain: 0.35, selected: false },
    { name: 'Bahasa', entropy: 0.87, gain: 0.29, selected: false },
    { name: 'Minat', entropy: 0.85, gain: 0.51, selected: true },
  ];

  const treeRules = [
    { rule: 'IF Minat = "Teknologi" AND Matematika > 80 THEN IPA', confidence: 95 },
    { rule: 'IF Minat = "Sosial" AND IPS > 80 THEN IPS', confidence: 92 },
    { rule: 'IF Minat = "Sastra" AND Bahasa > 85 THEN Bahasa', confidence: 90 },
    { rule: 'IF Minat = "Komputer" AND Matematika > 85 THEN TKJ', confidence: 88 },
    { rule: 'IF IPA > 85 AND Matematika > 85 THEN IPA', confidence: 93 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Proses Decision Tree</h1>
          <p className="text-gray-500 mt-1">Perhitungan algoritma C4.5 untuk model rekomendasi</p>
        </div>
        <button 
          onClick={handleProcess}
          disabled={isProcessing}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
            isProcessing 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-medium`}
        >
          <Play className="w-5 h-5" />
          {isProcessing ? 'Memproses...' : 'Jalankan Proses'}
        </button>
      </div>

      {/* Progress */}
      {(isProcessing || processComplete) && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress Perhitungan</span>
            <span className="text-sm font-medium text-blue-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          {processComplete && (
            <div className="mt-4 flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Proses berhasil diselesaikan!</span>
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Data Training</p>
              <p className="text-2xl font-bold text-gray-900">120</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Akurasi Model</p>
              <p className="text-2xl font-bold text-gray-900">92.5%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Jumlah Rules</p>
              <p className="text-2xl font-bold text-gray-900">{treeRules.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Information Gain Calculation */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Perhitungan Information Gain</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Atribut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entropy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Information Gain</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attributes.map((attr, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{attr.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{attr.entropy.toFixed(4)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{attr.gain.toFixed(4)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {attr.selected ? (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        Root/Node
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                        Leaf
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Algoritma C4.5:</strong> Atribut dengan Information Gain tertinggi (<strong>Minat: 0.51</strong>) 
            dipilih sebagai root node untuk membagi data secara optimal.
          </p>
        </div>
      </div>

      {/* Decision Rules */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Rules yang Dihasilkan</h2>
        <div className="space-y-3">
          {treeRules.map((rule, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-500">Rule {index + 1}</span>
                    <span className="px-2 py-0.5 text-xs font-medium rounded bg-green-100 text-green-700">
                      {rule.confidence}% Confidence
                    </span>
                  </div>
                  <p className="text-sm font-mono text-gray-900 bg-gray-50 p-2 rounded">
                    {rule.rule}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          Tentang Algoritma C4.5
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Algoritma C4.5 adalah metode decision tree yang menggunakan <strong>Information Gain</strong> untuk 
          memilih atribut terbaik sebagai node. Proses dimulai dengan menghitung entropy dari dataset, 
          kemudian menghitung gain untuk setiap atribut. Atribut dengan gain tertinggi dipilih sebagai 
          root/node untuk memecah data. Proses ini berulang hingga terbentuk pohon keputusan yang optimal.
        </p>
        <div className="mt-3 p-3 bg-white/50 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>Formula:</strong> Gain(S,A) = Entropy(S) - Σ(|Sv|/|S|) * Entropy(Sv)
          </p>
        </div>
      </div>
    </div>
  );
}
