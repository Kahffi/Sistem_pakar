import { useAnswerContext } from "@/contexts/AnswerContext";
import useInferenceEngine from "@/hooks/useInferenceEngine";

import useGenerateDecission from "@/hooks/useGenerateDecission";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { PREDICTION_RESULT } from "@/constants/Constants";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { codesAndLabels } from "@/constants/Constants";

import bgBeach from "@/assets/bg-beach1.jpg";

export default function ResultPages() {
  const { processedAnswer } = useAnswerContext();
  const { result } = useInferenceEngine(processedAnswer);
  const { decisions, filteredResult } = useGenerateDecission(result?.sortedCf);
  const navigate = useNavigate();

  function handleReAttempt() {
    localStorage.removeItem("answers");
    navigate("/");
  }

  const factsString = (facts: Set<string>) => {
    let str = "";
    let i = 1;
    facts.forEach((fact) => {
      const prefix = fact.charAt(0);

      const x = codesAndLabels[prefix as "A" | "G"];
      if (!x) return;
      const label = x.find(({ code }) => code === fact)?.label;
      if (i === facts.size) {
        str = str + `${label}`;
      } else {
        str = str + `${label}, `;
      }

      i++;
    });
    return str;
  };
  console.log(result?.sortedCf, result?.facts);

  return (
    <div className="relative flex flex-col items-center gap-14 pt-20 pb-10 bg-cover">
      <div
        className="h-full w-full absolute top-0 bg-cover bg-no-repeat blur z-0"
        style={{ backgroundImage: `url(${bgBeach})` }}
      ></div>
      {decisions && filteredResult && (
        <div className="flex flex-col gap-10 z-10 items-center">
          <h1 className="font-bold text-3xl text-white text-center">
            Hasil Diagnosis
          </h1>

          <div className="flex flex-wrap gap-10">
            <Card
              className="max-w-lg border-4 backdrop-blur-md bg-white/90"
              style={{ borderColor: "#022090" }}
            >
              <CardHeader>
                <CardTitle className="text-center">
                  <h3 className="font-semibold text-xl">{`${
                    PREDICTION_RESULT.get(filteredResult.bahaya![0])?.name
                  }`}</h3>
                </CardTitle>
                <CardDescription className="-mt-4">
                  {decisions && decisions[0].description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-5">
                <p className="-mb-3">Tingkat Kepercayaan:</p>
                <div className="flex justify-center p-1 bg-green-400 rounded-full drop-shadow-sm -mb-2">
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
              </CardContent>
              <CardFooter>
                <div>
                  <p className="text-xl font-semibold">Rekomendasi:</p>
                  {decisions && <p>{`${decisions[0].advice}`}</p>}
                </div>
              </CardFooter>
            </Card>

            <Card
              className="max-w-lg border-4 backdrop-blur-md bg-white/90"
              style={{ borderColor: "#022090" }}
            >
              <CardHeader>
                {/* Title resul */}
                <CardTitle className="text-center">
                  <h3 className="font-semibold text-xl">{`${
                    PREDICTION_RESULT.get(filteredResult.pasangSurut![0])?.name
                  }`}</h3>
                </CardTitle>
                {/* Deskripsi kondisi secara umum */}
                <CardDescription className="-mt-4">
                  {decisions && decisions[1].description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-5">
                <p className="-mb-3">Tingkat Kepercayaan:</p>
                <div className="flex justify-center p-1 bg-green-400 rounded-full drop-shadow-sm -mb-2">
                  {/* Indicator result */}
                  <div className="flex justify-center items-center rounded-full bg-white border-gray-500 drop-shadow-lg min-w-28 min-h-28 p-3">
                    {filteredResult && (
                      <p className="text-2xl font-semibold">
                        {filteredResult.pasangSurut
                          ? Math.round(filteredResult.pasangSurut[1] * 100) +
                            "%"
                          : "ERROR"}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
              {/* Deskripsi spesifik kondisi */}
              <CardFooter>
                <div>
                  <p className="text-xl font-semibold">Rekomendasi:</p>
                  <p>{`${decisions && decisions[1].advice}`}</p>
                </div>
              </CardFooter>
            </Card>
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full bg-white/50 backdrop-blur-lg p-2 rounded-lg max-w-lg"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-bold">
                Lihat Fakta yang Diperoleh
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {result?.facts ? factsString(result?.facts) : ""}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
      <button
        type="button"
        onClick={handleReAttempt}
        className="text-white p-3 w-60 rounded-md bg-blue-700 hover:bg-blue-600 font-semibold z-10"
      >
        Kembali ke Beranda
      </button>
    </div>
  );
}
