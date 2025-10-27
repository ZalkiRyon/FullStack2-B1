const DashboardStatCard = ({ title, value, subtitle, gradient }) => {
  return (
    <div
      style={{
        background: gradient,
        borderRadius: "10px",
        padding: "25px",
        color: "white",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ fontSize: "14px", marginBottom: "10px" }}>{title}</div>
      <div style={{ fontSize: "32px", fontWeight: "bold" }}>{value}</div>
      {subtitle && (
        <div style={{ fontSize: "12px", marginTop: "8px" }}>{subtitle}</div>
      )}
    </div>
  );
};

export default DashboardStatCard;
