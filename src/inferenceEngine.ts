import { useCallback, useEffect, useMemo, useState } from "react";
import { Rule } from "./hooks/useRule";
import { TAnswer } from "./pages/HomePage";

function useInferenceEngine(userData: TAnswer[]) {
  const [facts, setFacts] = useState<Set<string | undefined>>(new Set([]));
  const [allCF, setAllCF] = useState<Map<string, number>>(new Map());

  //   initialize facts from user answers
  useEffect(() => {
    if (userData.length === 0) return;
    console.log(userData[0], "first user data");
    const newFacts: string[] = [];
    userData.forEach((answer) => {
      if (((answer as TAnswer).userCf as number) > 0) {
        newFacts.push((answer as TAnswer).questionCode as string);
      }
    });
    console.log(userData, "original data");
    console.log(newFacts, "new Facts");
    setFacts(new Set(newFacts));
  }, [userData]);

  function minRule(cfTotal: number[]) {
    return cfTotal.reduce((acc, current) => Math.min(acc, current), 1);
  }

  const allCFSorted = useMemo(() => {
    const sorted = Array.from(allCF.entries());
    sorted.sort((a, b) => (b[1] as number) - (a[1] as number));
    return sorted;
  }, [allCF]);

  const diagnose = useCallback(
    (rules: Rule[]) => {
      const tempAllCF = new Map<string, number>(allCF);
      const tempFacts = new Set(facts);
      console.log("diagnosing");
      for (const rule of rules) {
        console.log("enter top loop");
        const metRequirements = rule.antecedent.every((ant) =>
          tempFacts.has(ant)
        );
        console.log("met requirements?", metRequirements);
        console.log(facts, "facts");
        if (metRequirements) {
          const cfTotal: number[] = [];
          // menghitung cf total untuk setiap antecedent
          rule.antecedent.forEach((code) => {
            // oldCf: jika cf sudah dihitung sebelumnya, maka kalikan dengan cfUser
            // jika belum kalikan cfUser dengan 1

            const oldCf = tempAllCF.get(code) ? tempAllCF.get(code) : 1;
            let userCf: unknown = userData.find(
              (userData) => (userData as TAnswer).questionCode === code
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

      console.log(tempAllCF, "allCF");
    },
    [facts, userData, allCF]
  );

  return { diagnose, allCFSorted };
}

export default useInferenceEngine;
