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
  const { allCFSorted, diagnose } = useInferenceEngine(answers);
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
          {allCFSorted.map(([code, cf]) => {
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
