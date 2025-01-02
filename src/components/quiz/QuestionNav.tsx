import { QUESTIONS } from "@/constants/Constants";
import NavItem from "./NavItem";
import { useAnswerContext } from "@/contexts/AnswerContext";
import { useCallback } from "react";

export default function QuestionNav({
  currentQuestId,
}: {
  currentQuestId: string;
}) {
  const { answer } = useAnswerContext();
  const hasAnswered = useCallback(
    (qId: string) => {
      const exist = answer.find(({ questionId }) => questionId === qId);
      if (exist) return true;
      return false;
    },
    [answer]
  );

  return (
    <div className="flex flex-wrap lg:grid lg:grid-cols-5 lg:grid-flow-row gap-2 p-3 rounded-lg h-fit font-semibold">
      {QUESTIONS.map(([questId], idx) => {
        return (
          <NavItem
            num={idx + 1}
            key={`${currentQuestId}-${idx}`}
            isActive={questId === currentQuestId ? true : false}
            answered={hasAnswered(questId)}
          />
        );
      })}
    </div>
  );
}
