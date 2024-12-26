import { QUESTIONS } from "@/constants/Constants";
import { useNavigate } from "react-router-dom";

type Props = {
  num: number;
  isActive: boolean;
};

export default function NavItem({ num, isActive }: Props) {
  const navigate = useNavigate();
  function handleClick() {
    const destination = "/quiz/";
    const destinationQuestionId = QUESTIONS[num - 1][0];
    navigate(`${destination}${destinationQuestionId}`);
  }

  return (
    <button
      onClick={handleClick}
      className={`border w-14 aspect-square rounded-md ${
        isActive ? "bg-blue-600 text-white" : ""
      }`}
    >
      {num}
    </button>
  );
}
