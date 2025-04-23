// src/components/AuthGuard.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/stores/authStore";
import { JSX } from "react";

interface Props {
  children: JSX.Element;
}

export default function AuthGuard({ children }: Props) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/landing" />;
}
