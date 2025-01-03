import { QUESTIONS, TQuestion } from "@/constants/Constants";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizQuestion from "../components/quiz/QuizQuestion";
import QuestionNav from "@/components/quiz/QuestionNav";
import { useAnswerContext } from "@/contexts/AnswerContext";
import bgBeach from "@/assets/bg-beach1.jpg";

export default function Quiz() {
  const param = useParams().quizId;
  const [currentQuestion, setCurrentQuestion] = useState<TQuestion | null>(
    null
  );
  const [questionNumber, setQuestionNumber] = useState<number | null>(null);
  const navigate = useNavigate();
  const { answer } = useAnswerContext();
  const isLastQuestion = useMemo(() => {
    if (!currentQuestion) return false;
    return currentQuestion[0] === QUESTIONS[QUESTIONS.length - 1][0];
  }, [currentQuestion]);
  const isQuizCompleted = answer.length === QUESTIONS.length;

  //   get current question, and current question number
  useEffect(() => {
    if (!param) return;
    // check if the question id exist in Questions constants
    const questionIdx = QUESTIONS.findIndex(([id]) => {
      return id === param;
    });

    if (typeof questionIdx !== "number") return;

    setQuestionNumber(questionIdx + 1);
    setCurrentQuestion(QUESTIONS[questionIdx]);
  }, [param]);

  console.log(isLastQuestion, "is Last question");
  console.log(isLastQuestion, "is Last question");

  function handleQuestionNavigation(goto: "next" | "prev") {
    let destination = "/quiz/";
    if (goto === "next" && isLastQuestion) {
      destination = "/result";
      handleSubmit();
    } else if (goto == "next") {
      destination = `${destination}${QUESTIONS[questionNumber! - 1 + 1][0]}`;
    } else {
      destination = `${destination}${QUESTIONS[questionNumber! - 1 - 1][0]}`;
    }
    navigate(destination);
  }

  function handleSubmit() {}

  return (
    <>
      {currentQuestion && (
        <div className="relative min-h-dvh flex flex-col p-3 bg-cover ">
          <div
            className="h-full w-full absolute top-0 bg-cover bg-no-repeat blur z-0"
            style={{ backgroundImage: `url(${bgBeach})` }}
          ></div>
          {/* main Content */}
          <div className="flex flex-col lg:flex-row gap-5 h-full flex-1 z-10">
            {/* question navigation */}
            <div className="min-h-full border rounded-lg bg-white/40 backdrop-blur-md">
              <QuestionNav
                currentQuestId={currentQuestion[0]}
                key={`${currentQuestion[0]}-nav`}
              />
            </div>
            {/* question */}
            <main className="flex flex-col gap-28 flex-1 border rounded-lg p-5 bg-white/40 backdrop-blur-md">
              <QuizQuestion questionData={currentQuestion} />
              {/* button group */}
              <div className="w-full flex justify-between">
                <button
                  {...(questionNumber === 1 ? { disabled: true } : null)}
                  type="button"
                  onClick={() => handleQuestionNavigation("prev")}
                  className="px-3 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed border-gray-600 hover:bg-gray-700 hover:text-white"
                >
                  Sebelumnya
                </button>
                <button
                  {...(!isQuizCompleted && isLastQuestion
                    ? { disabled: true }
                    : { disabled: false })}
                  type="button"
                  onClick={() => handleQuestionNavigation("next")}
                  className="px-3 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed border-gray-600 hover:bg-gray-700 hover:text-white"
                >
                  {isLastQuestion ? "Selesai" : "Selanjutnya"}
                </button>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
