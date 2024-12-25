import { Link, useParams } from "react-router-dom";

export default function ErrorPage() {
  const p = useParams();
  console.log(p);
  return (
    <div>
      <h1>Oh no, this route doesn't exist!</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
}
