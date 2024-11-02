import { useCallback, useEffect, useMemo, useState } from "react";
import { Rule } from "./hooks/useRule";
import { TAnswer } from "./pages/HomePage";

function useInferenceEngine(userData: TAnswer[]) {
  const [facts, setFacts] = useState<Set<string | undefined>>(new Set([]));
  const [allCF, setAllCF] = useState<Map<string, number>>(new Map());
  //   initialize facts from user answers
  useEffect(() => {
    if (userData.length === 0) return;

    const newFacts: string[] = [];
    userData.forEach((answer) => {
      // if (((answer as TRawAnswer).userCf as number) > 0) {
      // }
      newFacts.push(answer.questionCode);
    });

    setFacts(new Set(newFacts));
  }, [userData]);

  function minRule(cfTotal: number[]) {
    return cfTotal.reduce((acc, current) => Math.min(acc, current), 1);
  }

  const factsHasAll = (list: string[], facts: Set<string | undefined>) =>
    list.every((item) => facts.has(item));

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

  const allCFSorted = useMemo(() => {
    const sorted = Array.from(allCF.entries());
    sorted.sort((a, b) => (b[1] as number) - (a[1] as number));
    return sorted;
  }, [allCF]);

  const diagnose = useCallback(
    (rules: Rule[]) => {
      const tempAllCF = new Map<string, number>(allCF);
      const tempFacts = new Set(doForwardChaining(rules));
      for (const rule of rules) {
        const metRequirements = rule.antecedent.every((ant) =>
          tempFacts.has(ant)
        );
        if (metRequirements) {
          const cfTotal: number[] = [];
          // menghitung cf total untuk setiap antecedent
          rule.antecedent.forEach((code) => {
            // oldCf: jika cf sudah dihitung sebelumnya, maka kalikan dengan cfUser
            // jika belum kalikan cfUser dengan 1

            const oldCf = tempAllCF.get(code) ? tempAllCF.get(code) : 1;
            let userCf: unknown = userData.find(
              (userData) => userData.questionCode === code
            );
            userCf = userCf ? (userCf as TAnswer).userCf : 1;
            // menghitung cf masing-masing lalu menambahkan ke cfTotal
            cfTotal.push(oldCf! * (userCf as number));
          });
          // menentukan cfTotal
          tempAllCF.set(rule.consequent, minRule(cfTotal) * rule.expertCF);
          tempFacts.add(rule.consequent);
        }
      }
      setFacts(new Set(tempFacts));
      setAllCF(new Map(tempAllCF));
    },
    [userData, allCF, doForwardChaining]
  );

  return { diagnose, allCFSorted, doForwardChaining, facts };
}

export default useInferenceEngine;
