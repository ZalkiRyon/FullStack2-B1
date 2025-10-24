import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import "../styles/admin.css";

const AdminLayout = () => {
  return (
    <div className="adminLayoutContainer">
      <Sidebar />
      <main className="adminMainContent">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
