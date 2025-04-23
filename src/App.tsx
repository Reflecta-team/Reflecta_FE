import { useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/NavBar";
import Loader from "@/components/Loader";

const Landing = lazy(() => import("./pages/Landing"));
const InterviewSetup = lazy(() => import("./pages/setup/InterviewForm"));
const Interview = lazy(() => import("./pages/Interview"));
const Results = lazy(() => import("./pages/Analytics"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  const routes = useRoutes([
    { path: "/", element: <Landing /> },
    { path: "/setup/interview", element: <InterviewSetup /> },
    { path: "/interview", element: <Interview /> },
    { path: "/results", element: <Results /> },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>{routes}</Suspense>
    </>
  );
}
