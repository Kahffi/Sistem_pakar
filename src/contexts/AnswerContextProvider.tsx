import { ReactNode, useCallback, useState } from "react";
import { Answer, AnswerContext } from "./AnswerContext";

export default function AnswerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [answers, setAnswersState] = useState<Answer[]>([]);

  const setAnswer = useCallback((questionId: string, value: string) => {
    setAnswersState((prev) => {
      const newAns = [...prev];
      const idx = prev.findIndex(({ questionId: qId }) => qId === questionId);
      if (idx >= 0) {
        newAns[idx] = { ...newAns[idx], value: value };
      } else {
        newAns.push({ questionId: questionId, value: value });
      }
      return newAns;
    });
  }, []);

  return (
    <AnswerContext.Provider value={{ answer: answers, setAnswer: setAnswer }}>
      {children}
    </AnswerContext.Provider>
  );
}
