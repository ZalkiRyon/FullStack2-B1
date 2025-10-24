import { Outlet } from "react-router-dom";
import Header from "../components/store/Header";
import "../styles/store.css";

const StoreLayout = () => {
  return (
    <>
      <Header />
      <div className="mainContentWrapper">
        <Outlet />
      </div>
    </>
  );
};

export default StoreLayout;
