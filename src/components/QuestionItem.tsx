import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TRawAnswer } from "@/pages/HomePage";
import { SPECIALQUESTION } from "@/constants/Constants";

type Props = {
  question: string;
  number: number;
  cfEnabled?: boolean;
  questionCode: string;
  handleChange: (answer: TRawAnswer) => void;
};

export default function QuestionItem({
  question,
  number,
  questionCode,
  handleChange,
}: Props) {
  function handleValueChange(e: string) {
    if (SPECIALQUESTION.has(questionCode))
      handleChange({ questionCode: questionCode, userCf: e });
    else handleChange({ questionCode: questionCode, userCf: parseFloat(e) });
  }
  return (
    <Card
      className="w-[380px] border-4 backdrop-blur-md bg-white/90"
      style={{ borderColor: "#022090" }}
    >
      <CardHeader>
        <CardTitle>{number + ". " + question}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        {!SPECIALQUESTION.has(questionCode) ? (
          <RadioGroup onValueChange={handleValueChange}>
            <div className="flex gap-5 justify-around">
              <div className="flex flex-col gap-2 items-center justify-center">
                <RadioGroupItem value="0" id={questionCode + "cf-tidak"} />
                <label htmlFor={questionCode + "cf-tidak"}>Tidak</label>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center">
                <RadioGroupItem
                  value="0.5"
                  id={questionCode + "cf-tidak-tahu"}
                />
                <label htmlFor={questionCode + "cf-tidak-tahu"}>
                  Mungkin iya
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
            <RadioGroup onValueChange={handleValueChange}>
              <div className="flex flex-col gap-5 items-start">
                {SPECIALQUESTION.get(questionCode)?.map(
                  ({ code, statement }) => {
                    return (
                      <div key={code} className="w-full">
                        <label
                          className="w-full flex gap-2 items-center "
                          htmlFor={statement + code}
                        >
                          <RadioGroupItem value={code} id={statement + code} />
                          {statement}
                        </label>
                      </div>
                    );
                  }
                )}
                {/* <div className="flex flex-col gap-2 items-center justify-center">
                  <RadioGroupItem value="-1" id={questionCode + "cf-tidak"} />
                  <label htmlFor={questionCode + "cf-tidak"}>Tidak</label>
                </div> */}
              </div>
            </RadioGroup>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
