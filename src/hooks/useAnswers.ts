import { useCallback, useState } from "react";

type Answer = {
  questionId: string;
  value: string;
};

export default function useAnswer() {
  const [answers, setAnswersState] = useState<Answer[]>([]);

  const setAnswer = useCallback((questionId: string, value: string) => {
    setAnswersState((prev) => {
      const newAns = [...prev];
      const idx = prev.findIndex(({ questionId: qId }) => qId === questionId);
      if (typeof idx === "number") {
        newAns[idx] = { ...newAns[idx], value: value };
      } else {
        newAns.push({ questionId: questionId, value: value });
      }
      return newAns;
    });
  }, []);

  return { answers, setAnswer };
}
