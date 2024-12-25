import { useMemo } from "react";
import useQuestionOption, {
  NormalQuestionOption,
} from "../../hooks/useQuestionOption";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TSpecialQuestionMapValue } from "../../constants/Constants";
type Props = {
  questionId: string;
  options: ReturnType<typeof useQuestionOption>;
};

export default function QuestionOptions({ options, questionId }: Props) {
  const questionType: "special" | "normal" | undefined = useMemo(() => {
    if (!options) return;
    // The special question have "code" key as a value for referencing a fact
    if (Object.keys(options[0]).find((key) => key === "code")) return "special";
    return "normal";
  }, [options]);

  return (
    <div>
      {questionType && options && (
        <RadioGroup key={`${questionId}`}>
          {options.map((obj) => {
            let val: string;
            let label;
            if (questionType === "special") {
              val = (obj as TSpecialQuestionMapValue).code;
              label = (obj as TSpecialQuestionMapValue).statement;
            } else {
              val = (obj as NormalQuestionOption).value.toString();
              label = (obj as NormalQuestionOption).label;
            }
            console.log(`${questionId}-${label}`);
            return (
              <label
                htmlFor={`${questionId}-${label}`}
                key={`${questionId}-${label}`}
                className="flex gap-2 items-center cursor-pointer"
              >
                <RadioGroupItem
                  value={val}
                  id={`${questionId}-${label}`}
                  key={`${questionId}-${label}`}
                />
                {label}
              </label>
            );
          })}
        </RadioGroup>
      )}
    </div>
  );
}
