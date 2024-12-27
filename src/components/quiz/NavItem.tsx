import { QUESTIONS } from "@/constants/Constants";
import { useNavigate } from "react-router-dom";

type Props = {
  num: number;
  isActive: boolean;
  answered: boolean;
};

export default function NavItem({ num, isActive, answered }: Props) {
  const navigate = useNavigate();
  function handleClick() {
    const destination = "/quiz/";
    const destinationQuestionId = QUESTIONS[num - 1][0];
    navigate(`${destination}${destinationQuestionId}`);
  }

  return (
    <button
      onClick={handleClick}
      className={`border w-14 h-14 rounded-md ${
        isActive
          ? "bg-white-600 text-black border-blue-500 border-2"
          : answered
          ? "bg-blue-600 text-white"
          : ""
      }`}
    >
      {num}
    </button>
  );
}
