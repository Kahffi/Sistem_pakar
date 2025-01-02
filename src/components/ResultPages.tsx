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
    facts.forEach((fact) => {
      str = str + `${fact} `;
    });
    return str;
  };
  console.log(result?.sortedCf, result?.facts);

  return (
    <div className="relative flex flex-col items-center gap-14 pb-10 bg-cover">
      <div
        className="h-full w-full absolute top-0 bg-cover bg-no-repeat blur z-0"
        style={{ backgroundImage: `url(${bgBeach})` }}
      ></div>
      {decisions && filteredResult && (
        <div className="flex flex-col gap-10 z-10">
          <h1 className="font-bold text-3xl text-white text-center">
            Hasil Diagnosis
          </h1>
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
              {decisions && <p>{`${decisions[0].advice}`}</p>}
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
                        ? Math.round(filteredResult.pasangSurut[1] * 100) + "%"
                        : "ERROR"}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            {/* Deskripsi spesifik kondisi */}
            <CardFooter>
              <p>{`${decisions && decisions[1].advice}`}</p>
            </CardFooter>
          </Card>
          <Accordion
            type="single"
            collapsible
            className="w-full bg-white/50 backdrop-blur-lg p-2 rounded-lg"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-bold">
                Lihat Fakta yang Diperoleh
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {factsString(result?.facts)}
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
