import { PREDICTION_RESULT, TPredictionResult } from "@/constants/Constants";
import { useCallback, useMemo } from "react";

export default function useGenerateDecission(
  sortedCf: [string, number][] | undefined
) {
  const decideAdvice = useCallback((certaintyFactor: number) => {
    if (certaintyFactor < 0.3) {
      return 0;
    } else if (certaintyFactor < 0.5) {
      return 1;
    } else if (certaintyFactor < 0.7) {
      return 2;
    } else {
      return 3;
    }
  }, []);

  const filteredResult = useMemo(() => {
    if (!sortedCf) return;
    const pasangSurut = [];
    const bahaya = [];
    // mengambil cf untuk kode berawal A yang berarti Kesimpulan
    const filtered = sortedCf.filter(([code]) => {
      return code.charAt(0) === "A";
    });
    for (const result of filtered) {
      // mengambil kode angka setelah "A"
      const identifier = parseInt(result[0].slice(1));
      console.log(identifier, "identifier");
      if (identifier <= 2 && identifier >= 0) {
        pasangSurut.push(result);
      } else if (identifier <= 5) {
        bahaya.push(result);
      }
    }
    return { pasangSurut: pasangSurut.shift(), bahaya: bahaya.shift() };
  }, [sortedCf]);

  const decisions = useMemo(() => {
    if (
      !filteredResult ||
      !filteredResult.bahaya ||
      !filteredResult.pasangSurut
    )
      return;
    let pasangSurut: TPredictionResult;
    let levelBahaya: TPredictionResult;
    const decisions = [];

    console.log(PREDICTION_RESULT.get(filteredResult.bahaya[0]), "get");

    if (filteredResult.bahaya.length > 0) {
      levelBahaya = PREDICTION_RESULT.get(filteredResult.bahaya[0])!;
    } else {
      levelBahaya = { name: "error", description: "error", advice: ["error"] };
    }
    if (filteredResult.pasangSurut.length > 0) {
      pasangSurut = PREDICTION_RESULT.get(filteredResult.pasangSurut[0])!;
    } else {
      pasangSurut = { name: "error", description: "error", advice: ["error"] };
    }
    decisions.push({
      description: levelBahaya.description,
      advice: levelBahaya.advice[decideAdvice(filteredResult.bahaya[1])],
    });
    decisions.push({
      description: pasangSurut.description,
      advice: pasangSurut.advice[decideAdvice(filteredResult.pasangSurut[1])],
    });

    return decisions;
  }, [filteredResult, decideAdvice]);

  return { decisions, filteredResult };
}
