import { QUESTIONS, TQuestion } from "@/constants/Constants";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizQuestion from "../components/quiz/QuizQuestion";
import AnswerContextProvider from "@/contexts/AnswerContextProvider";

export default function Quiz() {
  const param = useParams().quizId;
  const [currentQuestion, setCurrentQuestion] = useState<TQuestion | null>(
    null
  );
  const [questionNumber, setQuestionNumber] = useState<number | null>(null);
  const navigate = useNavigate();

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

  function handleQuestionNavigation(goto: "next" | "prev") {
    let destination = "/quiz/";
    if (goto === "next" && questionNumber! >= QUESTIONS.length) {
      destination = "/result";
    } else if (goto == "next") {
      destination = `${destination}${QUESTIONS[questionNumber! - 1 + 1][0]}`;
    } else {
      destination = `${destination}${QUESTIONS[questionNumber! - 1 - 1][0]}`;
    }
    navigate(destination);
  }

  return (
    <AnswerContextProvider>
      {currentQuestion && (
        <div className="">
          {/* top bar */}
          <div></div>
          {/* main Content */}
          <div className="flex flex-wrap">
            {/* question navigation */}
            <nav></nav>
            {/* question */}
            <main className="w-full">
              <QuizQuestion questionData={currentQuestion} />
              <div className="w-full flex justify-between">
                <button
                  {...(questionNumber === 1 ? { disabled: true } : null)}
                  type="button"
                  onClick={() => handleQuestionNavigation("prev")}
                  className="px-3 py-2 border rounded-md disabled:opacity-50"
                >
                  Sebelumnya
                </button>
                <button
                  type="button"
                  onClick={() => handleQuestionNavigation("next")}
                  className="px-3 py-2 border rounded-md"
                >
                  Selanjutnya
                </button>
              </div>
            </main>
          </div>
        </div>
      )}
    </AnswerContextProvider>
  );
}
