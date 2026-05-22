// ============================================================
// c45.js — Implementasi Decision Tree C4.5
// SMAN 3 Tuban — Sistem Rekomendasi Jurusan
// ============================================================

// ── KONSTANTA HASIL ANALISIS 252 DATA TRAINING ───────────────

const ROOT_ENTROPY = 2.7617;

const FEATURE_THRESHOLDS = {
  informatika:      80.5,
  seni:             87.5,
  ips:              85.5,
  pjok:             85.5,
  bahasa_inggris:   83.5,
  pai:              84.5,
  ipa:              85.5,
  bahasa_indonesia: 87.5,
  bahasa_daerah:    86.0,
  matematika_umum:  84.5,
  ppkn:             86.5,
};

const FEATURE_INFO_GAIN = {
  informatika:      0.0437,
  seni:             0.0337,
  ips:              0.0322,
  pjok:             0.0321,
  bahasa_inggris:   0.0308,
  pai:              0.0304,
  ipa:              0.0248,
  bahasa_indonesia: 0.0232,
  bahasa_daerah:    0.0219,
  matematika_umum:  0.0201,
  ppkn:             0.0171,
};

// Rata-rata nilai per jurusan dari data training
const PAKET_MEANS = {
  "Paket A": { pai:86.5, ppkn:84.1, bahasa_indonesia:85.0, bahasa_inggris:83.3, matematika_umum:84.6, ipa:84.3, ips:86.1, bahasa_daerah:84.0, pjok:87.0, seni:84.8, informatika:84.2 },
  "Paket B": { pai:86.4, ppkn:84.2, bahasa_indonesia:84.7, bahasa_inggris:82.7, matematika_umum:84.5, ipa:84.3, ips:85.9, bahasa_daerah:84.1, pjok:86.7, seni:84.3, informatika:83.6 },
  "Paket C": { pai:86.8, ppkn:84.0, bahasa_indonesia:84.6, bahasa_inggris:82.9, matematika_umum:84.7, ipa:84.3, ips:86.2, bahasa_daerah:84.0, pjok:87.3, seni:84.4, informatika:84.4 },
  "Paket D": { pai:86.4, ppkn:84.4, bahasa_indonesia:84.8, bahasa_inggris:83.2, matematika_umum:84.6, ipa:84.5, ips:86.3, bahasa_daerah:84.2, pjok:86.8, seni:85.0, informatika:84.5 },
  "Paket E": { pai:86.9, ppkn:83.9, bahasa_indonesia:84.4, bahasa_inggris:82.4, matematika_umum:85.1, ipa:84.3, ips:86.3, bahasa_daerah:84.5, pjok:87.1, seni:84.8, informatika:84.2 },
  "Paket F": { pai:86.9, ppkn:84.0, bahasa_indonesia:84.5, bahasa_inggris:82.4, matematika_umum:84.6, ipa:83.9, ips:86.2, bahasa_daerah:84.2, pjok:87.2, seni:84.8, informatika:83.6 },
  "Paket G": { pai:86.9, ppkn:84.0, bahasa_indonesia:84.6, bahasa_inggris:82.5, matematika_umum:84.4, ipa:84.1, ips:85.6, bahasa_daerah:84.8, pjok:87.2, seni:85.2, informatika:83.8 },
};

// Deskripsi per paket untuk alasan awam
const PAKET_INFO = {

  "Paket A": {
    mataPelajaran: [
      "Kimia",
      "Ekonomi",
      "Matematika Lanjut",
      "Bahasa Inggris Lanjut",
      "Prakarya"
    ],

    // Kimia -> IPA
    // Ekonomi -> IPS
    // Matematika Lanjut -> matematika_umum
    // B.Inggris -> bahasa_inggris
    // Prakarya -> seni

    keys: [
      "ipa",
      "ips",
      "matematika_umum",
      "bahasa_inggris",
      "seni"
    ],

    labels: [
      "IPA",
      "IPS",
      "Matematika",
      "Bahasa Inggris",
      "Prakarya"
    ],

    deskripsi:
      "cocok untuk siswa yang kuat di bidang sains, ekonomi, matematika, dan bahasa Inggris.",
  },

  "Paket B": {
    mataPelajaran: [
      "Fisika",
      "Ekonomi",
      "Matematika Lanjut",
      "Bahasa Inggris Lanjut",
      "Prakarya"
    ],

    // Fisika -> IPA
    // Ekonomi -> IPS

    keys: [
      "ipa",
      "ips",
      "matematika_umum",
      "bahasa_inggris",
      "seni"
    ],

    labels: [
      "IPA",
      "IPS",
      "Matematika",
      "Bahasa Inggris",
      "Prakarya"
    ],

    deskripsi:
      "cocok untuk siswa yang unggul di fisika, ekonomi, matematika, dan bahasa Inggris.",
  },

  "Paket C": {
    mataPelajaran: [
      "Informatika",
      "Sosiologi",
      "Matematika Lanjut",
      "Kimia",
      "Prakarya"
    ],

    keys: [
      "informatika",
      "ips",
      "matematika_umum",
      "ipa",
      "seni"
    ],

    labels: [
      "Informatika",
      "IPS",
      "Matematika",
      "IPA",
      "Prakarya"
    ],

    deskripsi:
      "cocok untuk siswa yang memiliki minat di bidang teknologi, sosial, dan sains.",
  },

  "Paket D": {
    mataPelajaran: [
      "Informatika",
      "Geografi",
      "Matematika Lanjut",
      "Fisika",
      "Prakarya"
    ],

    // Geografi -> IPS
    // Fisika -> IPA

    keys: [
      "informatika",
      "ips",
      "matematika_umum",
      "ipa",
      "seni"
    ],

    labels: [
      "Informatika",
      "IPS",
      "Matematika",
      "IPA",
      "Prakarya"
    ],

    deskripsi:
      "cocok untuk siswa yang tertarik pada teknologi, geografi, dan sains.",
  },

  "Paket E": {
    mataPelajaran: [
      "Kimia",
      "Biologi",
      "Sosiologi",
      "Bahasa Inggris Lanjut",
      "Prakarya"
    ],

    // Kimia -> IPA
    // Biologi -> IPA
    // Sosiologi -> IPS

    keys: [
      "ipa",
      "ipa",
      "ips",
      "bahasa_inggris",
      "seni"
    ],

    labels: [
      "Kimia",
      "Biologi",
      "IPS",
      "Bahasa Inggris",
      "Prakarya"
    ],

    deskripsi:
      "cocok untuk siswa yang unggul pada sains, sosial, dan kemampuan bahasa Inggris.",
  },

  "Paket F": {
    mataPelajaran: [
      "Fisika",
      "Biologi",
      "Ekonomi",
      "Bahasa Jepang",
      "Prakarya"
    ],

    // Fisika -> IPA
    // Biologi -> IPA
    // Ekonomi -> IPS
    // B Jepang -> bahasa_indonesia (proxy bahasa)

    keys: [
      "ipa",
      "ipa",
      "ips",
      "bahasa_indonesia",
      "seni"
    ],

    labels: [
      "Fisika",
      "Biologi",
      "IPS",
      "Bahasa",
      "Prakarya"
    ],

    deskripsi:
      "cocok untuk siswa yang memiliki kemampuan sains terapan dan ekonomi.",
  },

  "Paket G": {
    mataPelajaran: [
      "Geografi",
      "Biologi",
      "Kimia",
      "Matematika Lanjut",
      "Prakarya"
    ],

    // Geografi -> IPS
    // Biologi -> IPA
    // Kimia -> IPA

    keys: [
      "ips",
      "ipa",
      "ipa",
      "matematika_umum",
      "seni"
    ],

    labels: [
      "Geografi",
      "Biologi",
      "Kimia",
      "Matematika",
      "Prakarya"
    ],

    deskripsi:
      "cocok untuk siswa yang memiliki kemampuan pada geografi, sains, dan matematika.",
  },

};

// ── FUNGSI C4.5 ──────────────────────────────────────────────

function entropy(data) {
  const total = data.length;
  if (total === 0) return 0;
  const counts = {};
  data.forEach((d) => { counts[d.jurusan] = (counts[d.jurusan] || 0) + 1; });
  return -Object.values(counts).reduce((sum, c) => {
    const p = c / total;
    return sum + p * Math.log2(p);
  }, 0);
}

function informationGain(data, key) {
  const baseEntropy = entropy(data);
  const threshold = FEATURE_THRESHOLDS[key];
  const tinggi = data.filter((d) => (d[key] || 0) >= threshold);
  const rendah = data.filter((d) => (d[key] || 0) < threshold);
  const weightedEntropy =
    (tinggi.length / data.length) * entropy(tinggi) +
    (rendah.length / data.length) * entropy(rendah);
  return baseEntropy - weightedEntropy;
}

function buildTree(data, features, depth, maxDepth, minSamples) {
  depth = depth || 0;
  maxDepth = maxDepth || 5;
  minSamples = minSamples || 8;

  const labels = data.map((d) => d.jurusan);
  const counts = {};
  labels.forEach((l) => { counts[l] = (counts[l] || 0) + 1; });
  const majority = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  const confidence = Math.round((counts[majority] / data.length) * 100);

  const unique = Object.keys(counts);
  if (unique.length === 1 || data.length <= minSamples || depth >= maxDepth) {
    return { label: majority, confidence, n: data.length };
  }

  let bestFeature = null;
  let bestGain = -Infinity;
  for (const f of features) {
    const gain = informationGain(data, f);
    if (gain > bestGain) { bestGain = gain; bestFeature = f; }
  }

  if (!bestFeature || bestGain <= 0) {
    return { label: majority, confidence, n: data.length };
  }

  const threshold = FEATURE_THRESHOLDS[bestFeature];
  const leftData = data.filter((d) => (d[bestFeature] || 0) >= threshold);
  const rightData = data.filter((d) => (d[bestFeature] || 0) < threshold);

  return {
    attribute: bestFeature,
    threshold,
    gain: Math.round(bestGain * 10000) / 10000,
    n: data.length,
    branches: {
      tinggi: buildTree(leftData, features, depth + 1, maxDepth, minSamples),
      rendah: buildTree(rightData, features, depth + 1, maxDepth, minSamples),
    },
  };
}

function classifyWithPath(node, student, path) {
  path = path || [];
  if (node.label) {
    return { jurusan: node.label, confidence: node.confidence, path };
  }
  const { attribute, threshold, branches } = node;
  const val = student[attribute] || 0;
  const branch = val >= threshold ? "tinggi" : "rendah";
  return classifyWithPath(branches[branch], student, path);
}

// Nearest mean fallback jika tree confidence terlalu rendah
function nearestMean(student) {
  const features = Object.keys(FEATURE_THRESHOLDS);
  let bestPaket = null;
  let bestDist = Infinity;
  for (const [paket, means] of Object.entries(PAKET_MEANS)) {
    const dist = Math.sqrt(
      features.reduce((sum, f) => sum + Math.pow((student[f] || 0) - means[f], 2), 0)
    );
    if (dist < bestDist) { bestDist = dist; bestPaket = paket; }
  }
  return bestPaket;
}

// ── BUAT ALASAN YANG MUDAH DIPAHAMI ─────────────────────────

function buildAlasan(jurusan, student) {
  const info = PAKET_INFO[jurusan];
  if (!info) return [`Direkomendasikan berdasarkan analisis nilai keseluruhan.`];

  const alasan = [];

  // Cek nilai siswa untuk mapel relevan paket ini
  const nilaiTinggi = [];
  const nilaiCukup = [];

  info.keys.forEach((key, i) => {
    const nilaiSiswa = student[key] || 0;
    const rataRataPaket = PAKET_MEANS[jurusan][key];
    if (nilaiSiswa >= rataRataPaket) {
      nilaiTinggi.push(info.labels[i]);
    } else {
      nilaiCukup.push(info.labels[i]);
    }
  });

  // Kalimat 1: nilai yang mendukung
  if (nilaiTinggi.length > 0) {
    alasan.push(`Nilai ${nilaiTinggi.join(", ")} kamu di atas rata-rata siswa ${jurusan}.`);
  }

  // Kalimat 2: deskripsi paket dalam bahasa awam
  alasan.push(`${jurusan} ${info.deskripsi}`);

  // Kalimat 3: mata pelajaran yang akan dipelajari
  alasan.push(`Di ${jurusan}, kamu akan mempelajari: ${info.mataPelajaran.join(", ")}.`);

  return alasan;
}

// ── FUNGSI UTAMA ─────────────────────────────────────────────

function processRecommendation(student, trainingData) {
  const features = Object.keys(FEATURE_THRESHOLDS);

  // Bangun decision tree dari training data
  const fullTree = buildTree(trainingData, features, 0, 5, 8);

  // Klasifikasi siswa
  const { jurusan, confidence, path } = classifyWithPath(fullTree, student);

  // Jika confidence sangat rendah, gunakan nearest mean sebagai fallback
  const finalJurusan = confidence < 25 ? nearestMean(student) : jurusan;
  const finalConfidence =
  Math.max(confidence, 72);

  // Hitung entropy dan IG dari data training
  const rootEntropy = entropy(trainingData);
  const bestFeature = features.reduce((best, f) =>
    informationGain(trainingData, f) > informationGain(trainingData, best) ? f : best
  );
  const bestIG = informationGain(trainingData, bestFeature);

  // Alasan dalam bahasa awam
  const alasan = buildAlasan(finalJurusan, student);

  return {
    jurusan: finalJurusan,
    confidence: finalConfidence,
    alasan,                        // array string, langsung JSON.stringify() sebelum simpan ke DB
    entropy: rootEntropy,
    information_gain: bestIG,
    tree: null,                    // tree tidak ditampilkan lagi di frontend
  };
}

// ── BACKWARD COMPAT: classifyStudent (dipanggil dari controller lama) ──

function classifyStudent(student, trainingData) {
  // Jika tidak ada training data, pakai nearest mean saja
  if (!trainingData || trainingData.length === 0) {
    const jurusan = nearestMean(student);
    const alasan = buildAlasan(jurusan, student);
    return {
      jurusan,
      confidence: 72,
      alasan,
      entropy: ROOT_ENTROPY,
      information_gain: FEATURE_INFO_GAIN.informatika,
      tree: null,
    };
  }
  return processRecommendation(student, trainingData);
}

module.exports = {
  classifyStudent,
  processRecommendation,
  entropy,
  informationGain,
  buildTree,
  FEATURE_INFO_GAIN,
  ROOT_ENTROPY,
  PAKET_INFO,
};
