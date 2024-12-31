import { TAnswer } from "@/pages/HomePage";
import { createContext, useContext } from "react";
export type Answer = {
  questionId: string;
  value: string;
};

export type AnswerContext = {
  answer: Answer[];
  setAnswer: (questionId: string, value: string) => void;
  processedAnswer: TAnswer[];
};

export const AnswerContext = createContext<null | AnswerContext>(null);

export function useAnswerContext() {
  const context = useContext(AnswerContext);
  if (!context)
    throw new Error(
      "useAnswerContext must be used within AnswerContextProvider!"
    );

  return context;
}
