import { SPECIALQUESTION } from "@/constants/Constants";
import { useMemo } from "react";

export type NormalQuestionOption = {
  value: number;
  label: string;
};

export default function useQuestionOption(questionId: string) {
  const options = useMemo(() => {
    if (SPECIALQUESTION.has(questionId)) {
      return SPECIALQUESTION.get(questionId);
    } else {
      return [
        {
          value: 0,
          label: "Tidak",
        },
        {
          value: 0.5,
          label: "Mungkin",
        },
        {
          value: 1,
          label: "Iya",
        },
      ] as NormalQuestionOption[];
    }
  }, [questionId]);

  return options;
}
