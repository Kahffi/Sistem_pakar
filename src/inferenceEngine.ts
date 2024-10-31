import { useCallback, useEffect, useState } from "react";
import { Rule } from "./hooks/useRule";

type TUserData = {
  questionCode: string;
  userCf: number;
};

function useInferenceEngine(userData: TUserData[]) {
  const [facts, setFacts] = useState<Set<string>>(new Set([]));
  const [inferredFacts, setInferredFacts] = useState<Map<string, number>>(
    new Map()
  );
  function addFact(newFact: string) {
    const temp = new Set(facts);
    temp.add(newFact);
    setFacts(temp);
  }
  //   initialize facts from user answers
  useEffect(() => {
    if (userData.length === 0) return;
    const newFacts = userData.map(({ questionCode }) => {
      return questionCode;
    });
    setFacts(new Set(newFacts));
  }, [userData]);

  function minRule(userCF: number[]) {
    return userCF.reduce((acc, current) => Math.min(acc, current), 100);
  }

  function calculateCF(userCF: number, expertCF: number) {
    return userCF * expertCF;
  }

  function combineCF(oldCF: number, newCF: number) {
    return oldCF + newCF * (1 - oldCF);
  }

  const diagnose = useCallback((rules: Rule[]) => {
    const allCF = new Map<string, number>();
    const CfTotal = 0;
    const newFacts = new Set(facts);
    for (const rule of rules) {
      const metRequirements = rule.antecedent.every((ant) => facts.has(ant));
      if (metRequirements) {
        const userCFs: number[] = [];
        let userCf = 1;
        rule.antecedent.forEach((questionCode) => {
          userCFs.push(
            userData.find((data) => data.questionCode === questionCode)!.userCf!
          );
        });
        // if (rule.antecedent.length > 1) {
        //   userCf = minRule(userCFs);
        // }
        // const calculatedCF = calculateCF(userCf, rule.expertCF);
        // allCF.set(rule.consequent, calculatedCF);
      }
    }
  }, []);
}
