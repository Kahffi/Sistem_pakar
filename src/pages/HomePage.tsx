import { QUESTIONS, SPECIALQUESTION } from "../constants/QUESTIONS";
import QuestionItem from "@/components/QuestionItem";
import { useCallback, useMemo, useState } from "react";
import useRule from "@/hooks/useRule";
import { Button } from "@/components/ui/button";
import useInferenceEngine from "@/inferenceEngine";
export type TRawAnswer = {
  questionCode: string | number;
  userCf: number | string;
};

export type TAnswer = {
  questionCode: string;
  userCf: number;
};

// const testData: TAnswer[] = [
//   {
//     questionCode: "G2",
//     userCf: 1,
//   },
//   {
//     questionCode: "G6",
//     userCf: 1,
//   },
//   {
//     questionCode: "G7",
//     userCf: 0,
//   },
//   {
//     questionCode: "G8",
//     userCf: 1,
//   },
//   {
//     questionCode: "G9",
//     userCf: 0.5,
//   },
//   {
//     questionCode: "G10",
//     userCf: 0.5,
//   },
//   {
//     questionCode: "G11",
//     userCf: 1,
//   },
//   {
//     questionCode: "G13",
//     userCf: 1,
//   },
//   {
//     questionCode: "G14",
//     userCf: 1,
//   },
//   {
//     questionCode: "G16",
//     userCf: 1,
//   },
// ];

export default function HomePage() {
  const [rawAnswers, setRawAnswers] = useState<TRawAnswer[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const { rules } = useRule();

  const answers: TAnswer[] = useMemo(() => {
    const answers: TAnswer[] = rawAnswers.map((ans) => {
      if (SPECIALQUESTION.has(ans.questionCode as string))
        return { questionCode: ans.userCf as string, userCf: 1 };
      return ans as TAnswer;
    });
    return answers;
  }, [rawAnswers]);

  const { allCFSorted, diagnose } = useInferenceEngine(answers);

  const handleAnswer = useCallback(
    (answer: TRawAnswer) => {
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
    if (answers.length !== QUESTIONS.length) {
      alert("Mohon isi semua pertanyaan");
      return;
    }
    console.log(answers);
    diagnose(rules);
    setSubmitted(true);
  }, [answers, diagnose, rules]);

  return (
    <div className="flex flex-col items-center pt-5 pb-10">
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
