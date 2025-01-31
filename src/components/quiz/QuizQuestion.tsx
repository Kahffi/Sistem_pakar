import { QUESTIONS, TQuestion } from "@/constants/Constants";
import useQuestionOption from "@/hooks/useQuestionOption";
import QuestionOptions from "./QuestionOptions";

export default function QuizQuestion({
  questionData,
}: {
  questionData: TQuestion;
}) {
  const question = questionData[1];
  const questionId = questionData[0];
  const options = useQuestionOption(questionId);

  return (
    <div className="flex flex-col gap-5 font-semibold">
      {/* question */}
      <div className="text-2xl">
        <span>{`${
          QUESTIONS.findIndex(([id]) => id === questionId) + 1
        }. `}</span>
        {question}
      </div>
      {/* options */}
      <div className="text-xl">
        <QuestionOptions options={options} questionId={questionId} />
      </div>
    </div>
  );
}
