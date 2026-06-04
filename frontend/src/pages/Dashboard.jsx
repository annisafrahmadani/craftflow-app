import "../styles/dashboard.css";

import MainLayout from "../layouts/MainLayout";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";



function Dashboard(){
  return(
    <MainLayout>
        <div className="dashboard-content">
          <div className="dashboard-banner">
            <p className="banner-greeting">
              Hello, Ca 👋
            </p>

            <h1 className="banner-title">
              Ready to build something creative today?
            </h1>

            <p className="banner-description">
              Track your projects, tasks, and job applications all in one place.
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <StatCard 
              title="Projects"
              value="12"
              color="#0066CC"
          />

          <StatCard 
              title="Taks"
              value="48"
              color="#FF6200"
          />

          <StatCard 
              title="Completed"
              value="29"
              color="#10B140"
          />

          <StatCard 
              title="Job Applied"
              value="18"
              color="#D4FF00"
          />
        </div>

        <div className="dashboard-bottom">
          <div className="recent-activity">
            <h2 className="section-title">
              Recent Activity
            </h2>

            <div className="acitvity-item">
              Finished UI dashboard design
            </div>

            <div className="activity-item">
              Update embroidery project tasks
            </div>
          </div>

          <div className="upcoming-tasks">
            <h2 className="section-title">
              Upcoming Tasks
            </h2>

            <div className="task-item">
              Finish CraftFlow dashboard
            </div>

            <div className="task-item">
              Build Django API
            </div>

            <div className="task-item">
              Create login page UI
            </div>

          </div>
        </div>
    </MainLayout>
  )
}

export default Dashboard;