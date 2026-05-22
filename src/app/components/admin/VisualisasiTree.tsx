import { useState } from 'react';
import { ZoomIn, ZoomOut, Download, Maximize2 } from 'lucide-react';

// Tree node component
interface TreeNodeProps {
  label: string;
  type: 'root' | 'node' | 'leaf';
  condition?: string;
  result?: string;
  children?: React.ReactNode;
}

function TreeNode({ label, type, condition, result, children }: TreeNodeProps) {
  const getBgColor = () => {
    if (type === 'root') return 'bg-blue-500 text-white';
    if (type === 'leaf') return 'bg-green-100 text-green-800 border-2 border-green-500';
    return 'bg-purple-100 text-purple-800 border-2 border-purple-500';
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`px-4 py-3 rounded-lg font-medium text-sm ${getBgColor()} shadow-md min-w-[120px] text-center`}>
        <div className="font-semibold">{label}</div>
        {condition && <div className="text-xs mt-1 opacity-90">{condition}</div>}
        {result && <div className="text-xs mt-1 font-bold">→ {result}</div>}
      </div>
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}

export function VisualisasiTree() {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50));
  const handleReset = () => setZoom(100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visualisasi Tree</h1>
          <p className="text-gray-500 mt-1">Pohon keputusan Decision Tree C4.5</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {zoom}%
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Legenda:</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500"></div>
            <span className="text-sm text-gray-700">Root Node</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-100 border-2 border-purple-500"></div>
            <span className="text-sm text-gray-700">Decision Node</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-500"></div>
            <span className="text-sm text-gray-700">Leaf Node (Hasil)</span>
          </div>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 overflow-auto">
        <div 
          className="inline-block min-w-full transition-transform"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
        >
          {/* Tree Structure */}
          <div className="flex flex-col items-center space-y-8 p-8">
            {/* Root */}
            <TreeNode label="Minat" type="root" condition="Gain: 0.51" />
            
            {/* Level 1 - Main branches */}
            <div className="flex gap-16">
              {/* Branch 1: Teknologi */}
              <div className="flex flex-col items-center">
                <div className="h-8 w-0.5 bg-gray-300"></div>
                <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded mb-2">Teknologi</div>
                <TreeNode label="Matematika" type="node" condition="> 80" />
                <div className="flex gap-8 mt-4">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-0.5 bg-gray-300"></div>
                    <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded mb-2">Ya</div>
                    <TreeNode label="IPA" type="leaf" result="95% confidence" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-0.5 bg-gray-300"></div>
                    <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded mb-2">Tidak</div>
                    <TreeNode label="TKJ" type="leaf" result="85% confidence" />
                  </div>
                </div>
              </div>

              {/* Branch 2: Sosial */}
              <div className="flex flex-col items-center">
                <div className="h-8 w-0.5 bg-gray-300"></div>
                <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded mb-2">Sosial</div>
                <TreeNode label="IPS" type="node" condition="> 80" />
                <div className="flex gap-8 mt-4">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-0.5 bg-gray-300"></div>
                    <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded mb-2">Ya</div>
                    <TreeNode label="IPS" type="leaf" result="92% confidence" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-0.5 bg-gray-300"></div>
                    <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded mb-2">Tidak</div>
                    <TreeNode label="IPS" type="leaf" result="75% confidence" />
                  </div>
                </div>
              </div>

              {/* Branch 3: Sains */}
              <div className="flex flex-col items-center">
                <div className="h-8 w-0.5 bg-gray-300"></div>
                <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded mb-2">Sains</div>
                <TreeNode label="IPA" type="node" condition="> 85" />
                <div className="flex gap-8 mt-4">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-0.5 bg-gray-300"></div>
                    <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded mb-2">Ya</div>
                    <TreeNode label="IPA" type="leaf" result="93% confidence" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-0.5 bg-gray-300"></div>
                    <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded mb-2">Tidak</div>
                    <TreeNode label="IPA" type="leaf" result="80% confidence" />
                  </div>
                </div>
              </div>

              {/* Branch 4: Sastra */}
              <div className="flex flex-col items-center">
                <div className="h-8 w-0.5 bg-gray-300"></div>
                <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded mb-2">Sastra</div>
                <TreeNode label="Bahasa" type="node" condition="> 85" />
                <div className="flex gap-8 mt-4">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-0.5 bg-gray-300"></div>
                    <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded mb-2">Ya</div>
                    <TreeNode label="Bahasa" type="leaf" result="90% confidence" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-0.5 bg-gray-300"></div>
                    <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded mb-2">Tidak</div>
                    <TreeNode label="IPS" type="leaf" result="70% confidence" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Total Nodes</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">13</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Kedalaman Tree</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">3 Level</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Leaf Nodes</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-2">Cara Membaca Decision Tree</h3>
        <ul className="text-sm text-gray-700 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">1.</span>
            <span>Mulai dari <strong>Root Node</strong> (Minat) di bagian atas - atribut dengan Information Gain tertinggi</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">2.</span>
            <span>Ikuti cabang sesuai nilai atribut siswa (Teknologi, Sosial, Sains, Sastra)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">3.</span>
            <span>Lanjutkan ke <strong>Decision Node</strong> berikutnya (Matematika, IPA, IPS, Bahasa)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">4.</span>
            <span>Sampai mencapai <strong>Leaf Node</strong> yang menunjukkan hasil prediksi jurusan dan confidence level</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
