import { Evidences, evidences } from "@/constants/Constants";

type DstInput = string[];

export default function useDempsterShafer(dstInput: DstInput) {
  // Fungsi untuk menggabungkan dua massa menggunakan aturan Dempster
  function combineTwoMasses(
    m1: { [key: string]: number },
    m2: { [key: string]: number }
  ) {
    const combined: { [key: string]: number } = {};
    let conflict = 0;

    for (const a in m1) {
      for (const b in m2) {
        const intersection = a
          .split(",")
          .filter((val) => b.split(",").includes(val))
          .join(",");

        if (intersection) {
          combined[intersection] =
            (combined[intersection] || 0) + m1[a] * m2[b];
        } else {
          conflict += m1[a] * m2[b];
        }
      }
    }

    // Normalisasi berdasarkan konflik
    const normalizationFactor = 1 - conflict;
    if (normalizationFactor > 0) {
      for (const key in combined) {
        combined[key] /= normalizationFactor;
      }
    } else {
      // Jika seluruhnya konflik, hasilkan hanya ketidakpastian
      combined["Theta"] = 1;
    }

    return combined;
  }

  // Fungsi untuk menggabungkan beberapa massa
  function combineMultipleEvidences(evidences: Evidences): {
    [key: string]: number;
  } {
    const evidenceKeys = Object.keys(evidences);
    if (evidenceKeys.length === 0) {
      throw new Error("Tidak ada evidence yang diberikan.");
    }

    // Inisialisasi dengan evidence pertama
    let combinedMass = { ...evidences[evidenceKeys[0]] };

    // Iterasi untuk menggabungkan semua evidence
    for (let i = 1; i < evidenceKeys.length; i++) {
      combinedMass = combineTwoMasses(combinedMass, evidences[evidenceKeys[i]]);
    }

    return combinedMass;
  }

  // Fungsi utama untuk menangani input pengguna
  function diagnoseUserSymptoms(userSymptoms: DstInput, evidences: Evidences) {
    const relevantEvidences: Evidences = {};

    // Filter evidence berdasarkan input pengguna
    for (const symptom of userSymptoms) {
      if (evidences[symptom]) {
        relevantEvidences[symptom] = evidences[symptom];
      } else {
        console.warn(`Gejala '${symptom}' tidak ditemukan dalam evidence.`);
      }
    }

    if (Object.keys(relevantEvidences).length < 2) {
      throw new Error("Minimal diperlukan dua gejala untuk diagnosis.");
    }

    // Kombinasikan semua evidence terkait
    const combinedMass = combineMultipleEvidences(relevantEvidences);

    // Hitung Belief dan Plausibility
    const belief: { [key: string]: number } = {};
    const plausibility: { [key: string]: number } = {};

    for (const h in combinedMass) {
      // Hitung belief
      belief[h] = Object.keys(combinedMass)
        .filter((k) => k.split(",").every((v) => h.split(",").includes(v)))
        .reduce((sum, k) => sum + combinedMass[k], 0);

      // Hitung plausibility
      plausibility[h] = Object.keys(combinedMass)
        .filter((k) => k.split(",").some((v) => h.split(",").includes(v)))
        .reduce((sum, k) => sum + combinedMass[k], 0);
    }

    return { belief, plausibility };
  }

  return diagnoseUserSymptoms(dstInput, evidences);
}
