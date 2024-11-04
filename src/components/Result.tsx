import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
  allCF: [string, number][];
};

export default function Result({ allCF }: Props) {
  const decission = useMemo(() => {
    return allCF.filter(([code]) => {
      return code.charAt(0) === "A";
    });
  }, [allCF]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hasil Diagnosa</CardTitle>
        <CardDescription>Halo gais</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="flex justify-center p-1 bg-green-400 rounded-full drop-shadow-sm">
          <div className="flex justify-center items-center rounded-full bg-white border-gray-500 drop-shadow-lg min-w-28 min-h-28 p-3">
            {decission && (
              <p className="text-2xl font-semibold">
                {decission[0] ? decission[0][1] * 100 + "%" : "woilah"}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
