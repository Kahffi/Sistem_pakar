import { useAnswerContext } from "@/contexts/AnswerContext";
import useInferenceEngine from "@/hooks/useInferenceEngine";
import { useEffect } from "react";
import Result from "./Result";

export default function ResultPages() {
  const { processedAnswer } = useAnswerContext();
  const { result } = useInferenceEngine(processedAnswer);

  //   removing answer from localStorage
  //   useEffect(() => {
  //     localStorage.removeItem("answers");
  //   }, []);
  return (
    <div>
      <p>{result?.facts && result.facts}</p>
      <p>{result?.sortedCf && <Result allCF={result.sortedCf} />}</p>
    </div>
  );
}
