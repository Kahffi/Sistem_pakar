import { useMemo, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { PREDICTION_RESULT } from "@/constants/Constants";

type Props = {
  allCF: [string, number][];
};

export default function Result({ allCF }: Props) {
  const filteredResult = useMemo(() => {
    const pasangSurut = [];
    const bahaya = [];
    const filtered = allCF.filter(([code]) => {
      return code.charAt(0) === "A";
    });
    for (const result of filtered) {
      const identifier = parseInt(result[0].slice(1));
      if (identifier <= 2 && identifier != 0) {
        pasangSurut.push(result);
      } else if (identifier <= 5) {
        bahaya.push(result);
      }
    }
    return { pasangSurut: pasangSurut[0], bahaya: bahaya[0] };
  }, [allCF]);

  type TDecision = {
    advice: string;
    description: string;
  };

  const decideAdvice = useCallback((certaintyFactor: number) => {
    if (certaintyFactor < 0.3) {
      return 0;
    } else if (certaintyFactor < 0.5) {
      return 1;
    } else if (certaintyFactor < 0.7) {
      return 2;
    } else {
      return 3;
    }
  }, []);

  const decisions = useMemo(() => {
    // decisions: [levelBahaya, pasangSurut];
    const decisions: TDecision[] = [];

    const levelBahaya = PREDICTION_RESULT.get(filteredResult.bahaya[0])!;
    const pasangSurut = PREDICTION_RESULT.get(filteredResult.pasangSurut[0])!;

    decisions.push({
      description: levelBahaya.description,
      advice: levelBahaya.advice[decideAdvice(filteredResult.bahaya[1])],
    });
    decisions.push({
      description: pasangSurut.description,
      advice: pasangSurut.advice[decideAdvice(filteredResult.pasangSurut[1])],
    });

    return decisions;
  }, [filteredResult, decideAdvice]);

  return (
    <div className="flex flex-col gap-10">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>{`${
            PREDICTION_RESULT.get(filteredResult.bahaya[0])?.name
          }`}</CardTitle>
          <CardDescription>{decisions[0].description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-5">
          <p className="-mb-3">Tingkat Kepercayaan:</p>
          <div className="flex justify-center p-1 bg-green-400 rounded-full drop-shadow-sm">
            <div className="flex justify-center items-center rounded-full bg-white border-gray-500 drop-shadow-lg min-w-28 min-h-28 p-3">
              {filteredResult && (
                <p className="text-2xl font-semibold">
                  {filteredResult.bahaya
                    ? Math.round(filteredResult.bahaya[1] * 100) + "%"
                    : "ERROR"}
                </p>
              )}
            </div>
          </div>
          <p>{`${decisions[0].advice}`}</p>
        </CardContent>
      </Card>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>{`${
            PREDICTION_RESULT.get(filteredResult.pasangSurut[0])?.name
          }`}</CardTitle>
          <CardDescription>{decisions[1].description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-5">
          <p className="-mb-3">Tingkat Kepercayaan:</p>
          <div className="flex justify-center p-1 bg-green-400 rounded-full drop-shadow-sm">
            <div className="flex justify-center items-center rounded-full bg-white border-gray-500 drop-shadow-lg min-w-28 min-h-28 p-3">
              {filteredResult && (
                <p className="text-2xl font-semibold">
                  {filteredResult.pasangSurut
                    ? Math.round(filteredResult.pasangSurut[1] * 100) + "%"
                    : "ERROR"}
                </p>
              )}
            </div>
          </div>
          <p>{`${decisions[1].advice}`}</p>
        </CardContent>
      </Card>
    </div>
  );
}
