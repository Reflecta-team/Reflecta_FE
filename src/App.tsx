// src/App.tsx
import { useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "@/components/Loader";
import AuthGuard from "@/components/AuthGuard";
import MainLayout from "@/layouts/MainLayout";
import PlainLayout from "@/layouts/PlainLayout";

const Home = lazy(() => import("@/pages/Home"));
const Landing = lazy(() => import("@/pages/Landing"));
const InterviewSetup = lazy(() => import("@/pages/setup/InterviewForm"));
const Interview = lazy(() => import("@/pages/interview/LiveInterview"));
const Results = lazy(() => import("@/pages/Analytics"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("@/pages/login/Login"));
const Signup = lazy(() => import("@/pages/login/SignUp"));

export default function App() {
  const routes = useRoutes([
    {
      element: <MainLayout />,
      children: [
        { path: "/Home", element: <Home /> },
        { path: "/", element: <Landing /> },
        { path: "/setup/interview", element: <InterviewSetup /> },
        { path: "/analytics", element: <Results /> },
        { path: "*", element: <NotFound /> },
        {
          path: "/results",
          element: (
            <AuthGuard>
              <Results />
            </AuthGuard>
          ),
        },
      ],
    },
    {
      element: <PlainLayout />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/interview", element: <Interview /> },
      ],
    },
  ]);

  return <Suspense fallback={<Loader />}>{routes}</Suspense>;
}

// AuthGuard>
//           <Results />
//         </AuthGuard>
