import { useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/NavBar";
import Loader from "@/components/Loader";
import AuthGuard from "@/components/AuthGuard";

const Home = lazy(() => import("@/pages/Home"));
const Landing = lazy(() => import("@/pages/Landing"));
const InterviewSetup = lazy(() => import("@/pages/setup/InterviewForm"));
const Interview = lazy(() => import("@/pages/Interview"));
const Results = lazy(() => import("@/pages/Analytics"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));

export default function App() {
  const routes = useRoutes([
    { path: "/Home", element: <Home /> },
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/setup/interview",
      element: (
        <AuthGuard>
          <InterviewSetup />
        </AuthGuard>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/interview",
      element: (
        <AuthGuard>
          <Interview />
        </AuthGuard>
      ),
    },
    {
      path: "/results",
      element: (
        <AuthGuard>
          <Results />
        </AuthGuard>
      ),
    },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>{routes}</Suspense>
    </>
  );
}
