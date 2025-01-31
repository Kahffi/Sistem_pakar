import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Quiz from "./pages/Quiz.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import AnswerContextProvider from "./contexts/AnswerContextProvider.tsx";
import ResultPages from "./components/ResultPages.tsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage />, errorElement: <ErrorPage /> },
  {
    path: "quiz/:quizId",
    element: (
      <AnswerContextProvider>
        <Quiz />
      </AnswerContextProvider>
    ),
  },
  {
    path: "result",
    element: (
      <AnswerContextProvider>
        <ResultPages />
      </AnswerContextProvider>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
