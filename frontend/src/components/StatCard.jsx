import "../styles/card.css";

function StatCard({ title, value, color }) {
  return (
    <div className="stat-card">

      <div
        className="stat-card-line"
        style={{ backgroundColor: color }}
      ></div>

      <h3 className="stat-card-title">
        {title}
      </h3>

      <p className="stat-card-value">
        {value}
      </p>

    </div>
  );
}

export default StatCard;