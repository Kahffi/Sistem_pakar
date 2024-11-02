import { QUESTIONS, SPECIALQUESTION } from "../constants/QUESTIONS";
import QuestionItem from "@/components/QuestionItem";
import { useCallback, useMemo, useState } from "react";
import useRule from "@/hooks/useRule";
import { Button } from "@/components/ui/button";
import useInferenceEngine from "@/inferenceEngine";
export type TAnswer = {
  questionCode: string | number;
  userCf: number | string;
};

export default function HomePage() {
  const [rawAnswers, setRawAnswers] = useState<TAnswer[]>([]);
  // const [allCf, setAllCf] = useState<number[][]>([[]]);
  const [submitted, setSubmitted] = useState(false);
  const { rules } = useRule();
  // const [facts, setFacts]

  const answers: TAnswer[] = useMemo(() => {
    const answers = rawAnswers.map((ans) => {
      if (SPECIALQUESTION.has(ans.questionCode as string))
        return { questionCode: ans.userCf, userCf: 1 };
      return ans;
    });
    return answers;
  }, [rawAnswers]);

  // console.log(answers, "parsed answers");
  const { allCF, diagnose } = useInferenceEngine(answers);
  // console.log(allCF);

  const handleAnswer = useCallback(
    (answer: TAnswer) => {
      if (rawAnswers.length == 0) {
        setRawAnswers([answer]);
        return;
      }
      const ansIdx = rawAnswers.findIndex(
        (ans) => answer.questionCode === ans.questionCode
      );
      if (ansIdx !== -1) {
        setRawAnswers((prevAns) => {
          const newAns = [...prevAns];
          newAns[ansIdx] = answer;
          return newAns;
        });
        return;
      } else {
        setRawAnswers((prevAns) => {
          const newAns = [...prevAns];
          newAns.push(answer);
          return newAns;
        });
      }
    },
    [rawAnswers]
  );

  // const handleSubmit = useCallback(() => {
  //   const allCF = [];

  //   for (const rule of rules) {
  //     const cfPerDisease = [];

  //     for (const expertKey of rule.antecedent) {
  //       const userEntry = rawAnswers.find(
  //         ({ questionCode }) => questionCode === expertKey
  //       );
  //       // console.log(expertKey, "expert");
  //       const userValue = userEntry ? userEntry.userCf : 0;
  //       const expValue = ExpertCF.find(([code]) => code === expertKey)!;
  //       const cfResult = (expValue[1] as number) * userValue;
  //       cfPerDisease.push(cfResult);

  //       // console.log(
  //       //   `${expertKey} Data Expert = ${expValue}, User Data = ${userValue}`
  //       // );
  //     }

  //     allCF.push(cfPerDisease);
  //   }

  //   // console.log("All CF:", allCF);
  //   setAllCf(allCF);
  //   setSubmitted(true);
  // }, [rawAnswers, rules]);

  // const cfCombined = useMemo(() => {
  //   if (allCf.length < 1) return;
  //   const cfCombined = [];

  //   for (let i = 0; i < allCf.length; i++) {
  //     const eachCF = allCf[i];
  //     let cfOld = 0;
  //     for (let j = 0; j < eachCF.length; j += 2) {
  //       const firstValue = cfOld === 0 ? eachCF[j] || 0 : cfOld;
  //       const secondValue = eachCF[j + 1] || 0;
  //       const thirdvalue = 1 - firstValue;
  //       cfOld = firstValue + secondValue * thirdvalue;
  //     }
  //     cfCombined.push(cfOld);
  //   }
  //   return cfCombined;
  // }, [allCf]);

  // const conclusion = useMemo(() => {
  //   if (!cfCombined) return;
  //   let highestVal = cfCombined[0]!;
  //   let highestValIdx = 0;
  //   cfCombined.forEach((val, idx) => {
  //     if (val > highestVal) {
  //       highestVal = val;
  //       highestValIdx = idx;
  //     }
  //   });

  //   return { code: ExpertCF[highestValIdx][0], val: highestVal };
  // }, [cfCombined]);
  // console.log(cfCombined);

  const handleSubmit = useCallback(() => {
    if (answers.length !== QUESTIONS.length)
      alert("Mohon isi semua pertanyaan");
    console.log(answers);
    diagnose(rules);
    setSubmitted(true);
  }, [answers, diagnose, rules]);
  return (
    <div className="flex flex-col items-center">
      {!submitted ? (
        <>
          <div className="flex flex-wrap sm:flex-nowrap sm:flex-col gap-5 p-5 justify-around">
            {QUESTIONS.map((question, idx) => {
              return (
                <QuestionItem
                  number={idx + 1}
                  question={question[1]}
                  cfEnabled={true}
                  key={question[0]}
                  questionCode={question[0]}
                  handleChange={handleAnswer}
                />
              );
            })}
          </div>
          <Button onClick={handleSubmit} className="w-60">
            Submit
          </Button>
        </>
      ) : (
        <div>
          {Array.from(allCF.entries()).map(([code, cf]) => {
            return (
              <div key={code}>
                <p>{code}</p>
                <p>{`Tingkat kepercayaan: ${cf}`}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
