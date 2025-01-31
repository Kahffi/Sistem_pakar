import { useCallback, useEffect, useMemo, useState } from "react";
import { Rule } from "./hooks/useRule";
import { TAnswer } from "./pages/HomePages";

function useInferenceEngine(userData: TAnswer[]) {
  const [facts, setFacts] = useState<Set<string | undefined>>(new Set([]));
  const [allCF, setAllCF] = useState<Map<string, number>>(new Map());
  //   initialize facts from user answers
  useEffect(() => {
    if (userData.length === 0) return;

    const newFacts: string[] = [];
    userData.forEach((answer) => {
      newFacts.push(answer.questionCode);
    });

    setFacts(new Set(newFacts));
  }, [userData]);

  // Menghitung nilai minimum
  function minRule(cfTotal: number[]) {
    return cfTotal.reduce((acc, current) => Math.min(acc, current), 1);
  }

  // Fungsi untuk mengecek apakah seluruh premise terpenuhi
  const factsHasAll = (list: string[], facts: Set<string | undefined>) =>
    list.every((item) => facts.has(item));

  // Tidak digunakan
  const doForwardChaining = useCallback(
    (rules: Rule[]) => {
      const tempInferFacts = new Set<string>([]);

      const tempFacts = new Set<string | undefined>(facts);

      while (true) {
        let inferred = false;
        for (const rule of rules) {
          if (
            factsHasAll(rule.antecedent, tempFacts) &&
            !tempInferFacts.has(rule.consequent)
          ) {
            tempFacts.add(rule.consequent);
            tempInferFacts.add(rule.consequent);
            inferred = true;
            break;
          }
        }
        if (!inferred) break;
      }

      return tempFacts;
    },
    [facts]
  );

  // Fungsi untuk menghitung hasil aturan paralel
  function calculateParallel(oldCf: number, newCf: number) {
    return oldCf + newCf - oldCf * newCf;
  }

  //
  const allCFSorted = useMemo(() => {
    const sorted = Array.from(allCF.entries());
    sorted.sort((a, b) => (b[1] as number) - (a[1] as number));
    return sorted;
  }, [allCF]);

  const diagnose = useCallback(
    (rules: Rule[]) => {
      const tempAllCF = new Map<string, number>(allCF);
      const tempFacts = new Set(facts);

      // mengecek rule satu per satu
      for (const rule of rules) {
        // mengecek apakah kondisi rules terpenuhi
        const metRequirements = rule.antecedent.every((ant) =>
          tempFacts.has(ant)
        );
        // jika terpenuhi lanjut
        if (metRequirements) {
          const cfTotal: number[] = [];
          // menghitung cf total untuk setiap antecedent
          rule.antecedent.forEach((code) => {
            // oldCf: jika cf sudah dihitung sebelumnya, maka kalikan dengan cfUser
            // jika belum kalikan cfUser dengan 1

            // jika cf sudah dihitung sebelumnya, lakukan aturan sekuensial
            const oldCf = tempAllCF.get(code) || 1;
            const userCf: unknown =
              userData.find((userData) => userData.questionCode === code)
                ?.userCf || 1;
            // menghitung cf masing-masing lalu menambahkan ke cfTotal
            // aturan sekuensial
            cfTotal.push(oldCf! * (userCf as number));
          });
          // menentukan cfTotal
          // aturan parallel
          // Jika CF rules sudah dihitung sebelumnya
          if (tempAllCF.has(rule.consequent)) {
            tempAllCF.set(
              rule.consequent,
              calculateParallel(
                tempAllCF.get(rule.consequent)!,
                minRule(cfTotal) * rule.expertCF
              )
            );
            // jika CF Belum pernah dihitung sebelumnya, kalikan dengan nilai minimum
          } else {
            tempAllCF.set(rule.consequent, minRule(cfTotal) * rule.expertCF);
          }
          tempFacts.add(rule.consequent);
        }
      }
      setFacts(new Set(tempFacts));
      setAllCF(new Map(tempAllCF));
    },
    [userData, allCF, facts]
  );

  return { diagnose, allCFSorted, doForwardChaining, facts };
}

export default useInferenceEngine;
