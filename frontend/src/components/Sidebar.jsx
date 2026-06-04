import "./../styles/sidebar.css";

import logo from "../assets/craftflow-logo.png";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Briefcase,
  Settings,
} from "lucide-react";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="sidebar-logo-container">
        <img
          src={logo}
          alt="CraftFlow Logo"
          className="sidebar-logo"
          width={200}
        />
      </div>

      <div className="sidebar-menu">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "sidebar-button active"
              : "sidebar-button"
          }
        >
          <LayoutDashboard size={22} />
          Dashboard
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive
              ? "sidebar-button active"
              : "sidebar-button"
          }
        >
          <FolderKanban size={22} />
          Projects
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive
              ? "sidebar-button active"
              : "sidebar-button"
          }
        >
          <CheckSquare size={22} />
          Tasks
        </NavLink>

         <NavLink
          to="/jobs"
          className={({ isActive }) =>
            isActive
              ? "sidebar-button active"
              : "sidebar-button"
          }
        >
          <Briefcase size={22} />
          Jobs
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "sidebar-button active"
              : "sidebar-button"
          }
        >
          <Settings size={22} />
          Settings
        </NavLink>

      </div>

      <div className="sidebar-bottom">


        <div className="sidebar-profile">

          <div className="sidebar-profile-picture">
            C
          </div>

          <div>
            <h3 className="sidebar-profile-name">
              Ca
            </h3>

            <p className="sidebar-profile-role">
              Creative Builder ✨
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Sidebar;