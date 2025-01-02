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
import useDempsterShafer from "@/hooks/useDempsterShafer";
import { calculateBelief, evidences } from "@/dempsterShafer";

export default function ResultPages() {
  const { processedAnswer } = useAnswerContext();
  const { result } = useInferenceEngine(processedAnswer);
  const { decisions, filteredResult } = useGenerateDecission(
    result?.sortedCf,
    result?.facts
  );

  console.log(
    calculateBelief(evidences, ["G1", "G6", "G9", "G12", "G13", "G16", "G18"])
  );
  const navigate = useNavigate();

  function handleReAttempt() {
    navigate("/quiz/S0");
  }

  return (
    <div className="flex flex-col items-center gap-14 pb-10">
      {decisions && filteredResult && (
        <div className="flex flex-col gap-10">
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
        </div>
      )}
      <button
        type="button"
        onClick={handleReAttempt}
        className="text-white p-3 w-60 rounded-md bg-blue-700 hover:bg-blue-600 font-semibold"
      >
        Ulangi Quiz
      </button>
    </div>
  );
}
