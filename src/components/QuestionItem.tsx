import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { TAnswer } from "@/pages/HomePage";

type Props = {
  question: string;
  number: number;
  cfEnabled?: boolean;
  questionCode: string;
  handleChange: (answer: TAnswer) => void;
};

export default function QuestionItem({
  question,
  number,
  questionCode,
  cfEnabled = false,
  handleChange,
}: Props) {
  function handleValueChange(e: string) {
    handleChange({ questionCode: questionCode, userCf: parseInt(e) });
  }
  return (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>{number + ". " + question}</CardTitle>
      </CardHeader>
      <CardContent>
        {cfEnabled ? (
          <RadioGroup onValueChange={handleValueChange}>
            <div className="flex gap-5 justify-around">
              <div className="flex flex-col gap-2 items-center justify-center">
                <RadioGroupItem value="-1" id={questionCode + "cf-tidak"} />
                <label htmlFor={questionCode + "cf-tidak"}>Tidak</label>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center">
                <RadioGroupItem value="0" id={questionCode + "cf-tidak-tahu"} />
                <label htmlFor={questionCode + "cf-tidak-tahu"}>
                  Tidak tahu
                </label>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center">
                <RadioGroupItem value="1" id={questionCode + "cf-tidak-iya"} />
                <label htmlFor={questionCode + "cf-tidak-iya"}>Iya</label>
              </div>
            </div>
          </RadioGroup>
        ) : (
          <div>
            <Button>Ya</Button>
            <Button>Tidak</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
