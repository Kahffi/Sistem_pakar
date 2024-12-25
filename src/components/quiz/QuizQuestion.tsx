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
    <div className="flex">
      {/* question number */}
      <div>{QUESTIONS.findIndex(([id]) => id === questionId) + 1}</div>

      <div>
        {/* question */}
        <div>{question}</div>
        {/* options */}
        <div>
          <QuestionOptions options={options} questionId={questionId} />
        </div>
      </div>
    </div>
  );
}
