// src/layouts/PlainLayout.tsx
import { Outlet } from "react-router-dom";

const PlainLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default PlainLayout;
