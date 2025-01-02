import { Evidences, evidences } from "@/constants/Constants";

type DstInput = string[];

export default function useDempsterShafer(dstInput: DstInput) {
  // Fungsi untuk menggabungkan dua massa menggunakan aturan Dempster
  function combineTwoMasses(
    m1: { [key: string]: number },
    m2: { [key: string]: number }
  ) {
    const combined: { [key: string]: number } = {};
    const conflict = 0;

    for (const key1 in m1) {
      for (const key2 in m2) {
        const intersection = key1
          .split(",")
          .filter((v) => key2.split(",").includes(v))
          .join(",");

        if (intersection) {
          // Jika ada irisan, tambahkan ke hipotesis yang sesuai
          combined[intersection] =
            (combined[intersection] || 0) + m1[key1] * m2[key2];
        } else {
          // Jika tidak ada irisan, tambahkan ke Theta
          combined["Theta"] = (combined["Theta"] || 0) + m1[key1] * m2[key2];
        }
      }
    }

    // Normalisasi hasil akhir
    const normalizationFactor = 1 - conflict;
    if (normalizationFactor > 0) {
      for (const key in combined) {
        combined[key] /= normalizationFactor;
      }
    } else {
      // Semua konflik, semua massa masuk ke Theta
      combined["Theta"] = 1;
    }

    return combined;
  }

  // Fungsi untuk menggabungkan beberapa evidence
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

    console.log("Belief:", belief);
    console.log("Plausibility:", plausibility);

    return { belief, plausibility };
  }

  return diagnoseUserSymptoms(dstInput, evidences);
}
