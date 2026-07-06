import "../styles/header.css";

import { Bell, Search } from "lucide-react";

function Header() {
  const username = localStorage.getItem("username");
  return (
    <div className="dashboard-header">

      <div>

        <h1 className="header-title">
           Welcome back, {username || "User"} ✨
        </h1>

        <p className="header-subtitle">
          Let’s organize your creative world today.
        </p>

      </div>

      <div className="header-actions">

        <div className="search-bar">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />

        </div>

        <button className="notification-button">
          <Bell size={20} />
        </button>

        <div className="profile-circle"></div>

      </div>

    </div>
  );
}

export default Header;