import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Answer, AnswerContext } from "./AnswerContext";
import { QUESTIONS } from "@/constants/Constants";

export default function AnswerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [answers, setAnswersState] = useState<Answer[]>([]);

  useEffect(() => {
    const answerHistory = localStorage.getItem("answers");
    if (!answerHistory) return;
    setAnswersState(JSON.parse(answerHistory));
  }, []);

  const setAnswer = useCallback((questionId: string, value: string) => {
    setAnswersState((prev) => {
      const newAns = [...prev];
      const idx = prev.findIndex(({ questionId: qId }) => qId === questionId);
      if (idx >= 0) {
        newAns[idx] = { ...newAns[idx], value: value };
      } else {
        newAns.push({ questionId: questionId, value: value });
      }
      localStorage.setItem("answers", JSON.stringify(newAns));
      return newAns;
    });
  }, []);

  const processedAnswer = useMemo(() => {
    if (answers.length < QUESTIONS.length) return;
  }, [answers]);

  return (
    <AnswerContext.Provider value={{ answer: answers, setAnswer: setAnswer }}>
      {children}
    </AnswerContext.Provider>
  );
}
