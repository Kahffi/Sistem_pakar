import { QUESTIONS, SPECIALQUESTION } from "../constants/Constants";
import QuestionItem from "@/components/QuestionItem";
import { useCallback, useMemo, useState } from "react";
import useRule from "@/hooks/useRule";
import { Button } from "@/components/ui/button";
import useInferenceEngine from "@/inferenceEngine";
import Result from "@/components/Result";

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
//     questionCode: "G1",
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
//     questionCode: "G12",
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
  // const answers = testData;

  const { allCFSorted, diagnose } = useInferenceEngine(answers);
  console.log(allCFSorted);

  function backToMainMenu() {
    setRawAnswers([]);
    setSubmitted(false);
  }

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
    <div
      className="flex flex-col items-center pt-5 pb-10 max-h-dvh overflow-auto bg-gradient-to-b from-blue-500 to-orange-200"
      style={
        {
          // backgroundImage: `url(${background})`,
          // // backgroundRepeat: "repeat-x",
          // backgroundSize: "cover",
        }
      }
    >
      {!submitted ? (
        <>
          <div className="flex flex-wrap items-center sm:flex-nowrap sm:flex-col gap-5 p-5 justify-around">
            <h1 className="-mt-4 font-bold text-3xl text-white">
              Prediksi Pasang Surut Air Laut dan Keamanan Pantai
            </h1>
            <p className="mb-5 text-white font-medium">
              Hallo, sebelum Anda memulai petualangan, pastikan Anda memeriksa
              prediksi pasang surut air laut dan informasi keamanan pantai
              melalui situs ini. Selamat berlibur dan nikmati hari Anda!
            </p>
            {QUESTIONS.map(([code, question], idx) => {
              return (
                <QuestionItem
                  number={idx + 1}
                  question={question}
                  cfEnabled={true}
                  key={code}
                  questionCode={code}
                  handleChange={handleAnswer}
                />
              );
            })}
          </div>
          <Button
            onClick={handleSubmit}
            className="w-60 text-md font-semibold hover:"
            style={{ backgroundColor: "#022090" }}
          >
            Submit
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-10">
          <Result allCF={allCFSorted} />
          <Button
            onClick={backToMainMenu}
            className="w-60 text-md font-semibold hover:"
            style={{ backgroundColor: "#022090" }}
          >
            Diagnosa Lagi
          </Button>
        </div>
      )}
    </div>
  );
}
