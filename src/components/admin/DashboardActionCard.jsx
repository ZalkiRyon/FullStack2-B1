import { useNavigate } from "react-router-dom";

const DashboardActionCard = ({ title, description, route, isActive }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route && !isActive) {
      navigate(route);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        background: "white",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        cursor: isActive ? "default" : "pointer",
        transition: "transform 0.2s",
      }}
      onMouseOver={(e) => {
        if (!isActive) e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseOut={(e) => {
        if (!isActive) e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ fontSize: "16px", fontWeight: "600", color: "#333" }}>
        {title}
      </div>
      <div style={{ fontSize: "13px", color: "#666", marginTop: "8px" }}>
        {description}
      </div>
    </div>
  );
};

export default DashboardActionCard;
