// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "@/components/NavBar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
