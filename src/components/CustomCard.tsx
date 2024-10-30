import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

type Props = {
  title: string;
  description: string;
  urlPath: string;
};

export default function CustomCard({ title, description, urlPath }: Props) {
  return (
    <Card className="w-[280px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Link to={urlPath}>
          <Button>Lakukan Test</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
