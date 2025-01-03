import { TAnswer } from "@/pages/HomePages";
import { useMemo } from "react";
import useRule, { Rule } from "./useRule";

export default function useInferenceEngine(userData: TAnswer[]) {
  //   const [facts, setFacts] = useState<Set<string>>(new Set([]));
  //   const [allCf, setAllCf] = useState<Map<string, number>>(new Map());
  const { rules } = useRule();

  //   calculating result as soon as useInferenceEngine called

  const result = useMemo(() => {
    //   initializing facts

    if (!rules || !userData) return;
    function initFacts() {
      return new Set(
        userData.map((ans) => {
          return ans.questionCode;
        })
      );
    }

    const facts = initFacts();
    const allCf = new Map<string, number>();
    const unvisitedRule = new Set<Rule>();

    function calculateCf(rule: Rule) {
      const cfTotal: number[] = [];
      rule.antecedent.forEach((code) => {
        // oldCf: jika cf sudah dihitung sebelumnya, maka kalikan dengan cfUser
        // jika belum kalikan cfUser dengan 1

        // jika cf sudah dihitung sebelumnya, lakukan aturan sekuensial
        const oldCf = allCf.get(code) || 1;
        const userCf =
          userData.find((userData) => userData.questionCode === code)?.userCf ||
          1;
        // menghitung cf masing-masing lalu menambahkan ke cfTotal
        // aturan sekuensial
        cfTotal.push(oldCf * userCf);
        // menentukan cfTotal
        // aturan parallel
        // Jika CF rules sudah dihitung sebelumnya
        if (allCf.has(rule.consequent)) {
          allCf.set(
            rule.consequent,
            calculateParallel(
              allCf.get(rule.consequent)!,
              minRule(cfTotal) * rule.expertCF
            )
          );
        } else {
          allCf.set(rule.consequent, minRule(cfTotal) * rule.expertCF);
        }
        // menambahkan fakta baru
        facts.add(rule.consequent);
      });
    }

    for (const rule of rules) {
      const metRequirements = rule.antecedent.every((ant) => facts.has(ant));

      if (metRequirements) {
        const cfTotal: number[] = [];
        rule.antecedent.forEach((code) => {
          // oldCf: jika cf sudah dihitung sebelumnya, maka kalikan dengan cfUser
          // jika belum kalikan cfUser dengan 1

          // jika cf sudah dihitung sebelumnya, lakukan aturan sekuensial
          const oldCf = allCf.get(code) || 1;
          const userCf =
            userData.find((userData) => userData.questionCode === code)
              ?.userCf || 1;
          // menghitung cf masing-masing lalu menambahkan ke cfTotal
          // aturan sekuensial
          cfTotal.push(oldCf * userCf);
        });

        // menentukan cfTotal
        // aturan parallel
        // Jika CF rules sudah dihitung sebelumnya
        if (allCf.has(rule.consequent)) {
          allCf.set(
            rule.consequent,
            calculateParallel(
              allCf.get(rule.consequent)!,
              minRule(cfTotal) * rule.expertCF
            )
          );
        } else {
          allCf.set(rule.consequent, minRule(cfTotal) * rule.expertCF);
        }
        // menambahkan fakta baru
        facts.add(rule.consequent);
      } else {
        console.log("weeeh");
        unvisitedRule.add(rule);
      }
    }

    let allCalculated = unvisitedRule.size > 0 ? false : true;
    let prevUnvisitedSize = unvisitedRule.size;
    console.log(unvisitedRule, "unvisited before");

    while (!allCalculated) {
      unvisitedRule.forEach((rule) => {
        const metRequirements = rule.antecedent.every((ant) => facts.has(ant));
        if (metRequirements) {
          calculateCf(rule);
          unvisitedRule.delete(rule);
        }
      });
      if (prevUnvisitedSize === unvisitedRule.size) {
        allCalculated = true;
      } else {
        prevUnvisitedSize = unvisitedRule.size;
      }
    }
    console.log(unvisitedRule, "unvisited after");

    const sortedCf = Array.from(allCf.entries());
    sortedCf.sort((a, b) => (b[1] as number) - (a[1] as number));

    return { facts, allCf, sortedCf };
  }, [rules, userData]);

  function minRule(cfTotal: number[]) {
    return cfTotal.reduce((acc, current) => Math.min(acc, current), 1);
  }

  // Fungsi untuk mengecek apakah seluruh premise terpenuhi
  //   const factsHasAll = (list: string[], facts: Set<string | undefined>) =>
  //     list.every((item) => facts.has(item));

  // Fungsi untuk menghitung hasil aturan paralel
  function calculateParallel(oldCf: number, newCf: number) {
    return oldCf + newCf - oldCf * newCf;
  }

  return { result };
}
