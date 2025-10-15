import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      {/* Sidebar aqui */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
