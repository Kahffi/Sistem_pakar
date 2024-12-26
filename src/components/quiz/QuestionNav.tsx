import { QUESTIONS } from "@/constants/Constants";
import NavItem from "./NavItem";

export default function QuestionNav({
  currentQuestId,
}: {
  currentQuestId: string;
}) {
  return (
    <div className="flex flex-wrap gap-2 h-fit">
      {QUESTIONS.map(([questId], idx) => {
        return (
          <NavItem
            num={idx + 1}
            key={currentQuestId}
            isActive={questId === currentQuestId ? true : false}
          />
        );
      })}
    </div>
  );
}
