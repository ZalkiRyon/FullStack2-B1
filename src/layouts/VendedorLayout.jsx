import { Outlet } from "react-router-dom";
import VendedorSidebar from "../components/vendedor/VendedorSidebar";
import "../styles/admin.css";

const VendedorLayout = () => {
  return (
    <div className="adminLayoutContainer">
      <VendedorSidebar />
      <main className="adminMainContent">
        <Outlet />
      </main>
    </div>
  );
};

export default VendedorLayout;
