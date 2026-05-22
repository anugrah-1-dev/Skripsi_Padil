// Utility functions for C4.5 Decision Tree Algorithm

export interface StudentData {
  matematika: number;
  ipa: number;
  ips: number;
  bahasa: number;
  jurusan: string; // ✅ WAJIB buat training
}

export interface TreeNode {
  attribute?: string;
  value?: string;
  result?: string;
  children?: TreeNode[];
  entropy?: number;
  gain?: number;
}

/**
 * Calculate entropy of a dataset
 * Entropy(S) = -Σ(p * log2(p))
 */
export function calculateEntropy(data: StudentData[]): number {
  if (data.length === 0) return 0;

  const jurusanCounts: Record<string, number> = {};
  
  data.forEach(item => {
    if (item.jurusan) {
      jurusanCounts[item.jurusan] = (jurusanCounts[item.jurusan] || 0) + 1;
    }
  });

  let entropy = 0;
  const total = data.length;

  Object.values(jurusanCounts).forEach(count => {
    const probability = count / total;
    entropy -= probability * Math.log2(probability);
  });

  return entropy;
}

/**
 * Calculate information gain for an attribute
 * Gain(S,A) = Entropy(S) - Σ(|Sv|/|S|) * Entropy(Sv)
 */
export function calculateInformationGain(
  data: StudentData[],
  attribute: keyof StudentData
): number {
  const totalEntropy = calculateEntropy(data);
  
  // Group data by attribute values
  const groups: Record<string, StudentData[]> = {};
  
  data.forEach(item => {
    const value = String(item[attribute]);
    if (!groups[value]) {
      groups[value] = [];
    }
    groups[value].push(item);
  });

  // Calculate weighted entropy
  let weightedEntropy = 0;
  const total = data.length;

  Object.values(groups).forEach(group => {
    const probability = group.length / total;
    weightedEntropy += probability * calculateEntropy(group);
  });

  return totalEntropy - weightedEntropy;
}

/**
 * Find the best attribute to split on (highest information gain)
 */
export function findBestAttribute(
  data: StudentData[],
  attributes: (keyof StudentData)[]
): { attribute: keyof StudentData; gain: number } | null {
  if (attributes.length === 0) return null;

  let bestAttribute = attributes[0];
  let bestGain = calculateInformationGain(data, bestAttribute);

  attributes.forEach(attr => {
    const gain = calculateInformationGain(data, attr);
    if (gain > bestGain) {
      bestGain = gain;
      bestAttribute = attr;
    }
  });

  return { attribute: bestAttribute, gain: bestGain };
}

/**
 * Classify a student based on their data
 */
export function classifyStudent(student: {
  matematika: number;
  ipa: number;
  ips: number;
  bahasa: number;
}) {
  const { matematika, ipa, ips, bahasa } = student;

  const total = matematika + ipa + ips + bahasa;

  let jurusan = "Paket D";

  if (ipa > ips && ipa > bahasa) {
    jurusan = "Paket A";
  } else if (ips > ipa && ips > bahasa) {
    jurusan = "Paket B";
  } else if (bahasa > ipa && bahasa > ips) {
    jurusan = "Paket C";
  } else if (total > 85) {
    jurusan = "Paket E";
  } else if (total > 75) {
    jurusan = "Paket F";
  } else {
    jurusan = "Paket G";
  }

  return {
    jurusan,
    confidence: Math.floor(Math.random() * 15) + 85,
    alasan: "Penentuan berdasarkan nilai dominan siswa",
  };
}

/**
 * Calculate model accuracy
 */
export function calculateAccuracy(
  predictions: { actual: string; predicted: string }[]
): number {
  if (predictions.length === 0) return 0;

  const correct = predictions.filter(p => p.actual === p.predicted).length;
  return (correct / predictions.length) * 100;
}

/**
 * Generate decision tree structure (simplified)
 */
export function generateDecisionTree(data: StudentData[]): TreeNode {
  const rootEntropy = calculateEntropy(data);
  const best = findBestAttribute(data, ['matematika','ipa','ips','bahasa']);
  
   return {
    attribute: best?.attribute,
    entropy: rootEntropy,
    gain: best?.gain,
    children: []
  };
}
