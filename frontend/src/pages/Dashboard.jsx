import "../styles/dashboard.css";

import MainLayout from "../layouts/MainLayout";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import { useState, useEffect } from "react";



function Dashboard(){
  const [activities, setActivities] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard/")
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects);
        setTasks(data.tasks);
        setJobs(data.jobs);
        setActivities(data.activities);
      });
  }, []);

  const stats = [
  { title: "Projects", value: projects.length, color: "#0066CC" },
  { title: "Tasks", value: tasks.length, color: "#FF6200" },
  { title: "Completed", value: tasks.filter(t => t.status === "done").length, color: "#10B140" },
  { title: "Job Applied", value: jobs.length, color: "#D4FF00" },
];

  const recentActivities = activities
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  const upcomingTasks = tasks
    .filter(task => task.status !== "done")
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
 
  const username = localStorage.getItem("username");
  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good morning" :
    hour < 18 ? "Good afternoon" :
    "Good evening";

  return(
    <MainLayout>
        <div className="dashboard-content">
          <div className="dashboard-banner">
            

            <div>
              <p className="banner-greeting">
                {greeting},{username || "User"} 👋
              </p>

              <h1 className="banner-title">
                Ready to build something creative today?
              </h1>

              <p className="banner-description">
                Track your projects, tasks, and job applications all in one place.
              </p>
            </div>

          
          </div>
        </div>

        <div className="stats-grid">

          {stats.map((item, index) => (
            <StatCard
              key={index}
              title={item.title}
              value={item.value}
              color={item.color}
            />
          ))}
        </div>

        <div className="dashboard-bottom">
          <div className="recent-activity">
            <h2 className="section-title">
              Recent Activity
            </h2>

            {recentActivities.length === 0 ? (
              <p>No recent activity yet</p>
            ) : (
              recentActivities.map((act, i) => (
                <div className="activity-item" key={i}>
                  {act.message || act}
                </div>
              ))
            )}
          </div>

          <div className="upcoming-tasks">
          <h2 className="section-title">Upcoming Tasks</h2>

            {upcomingTasks.length === 0 ? (
              <p>No upcoming tasks</p>
            ) : (
              upcomingTasks.map((task, i) => (
                <div className="task-item" key={i}>
                  {task.title || task}
                </div>
              ))
            )}
        </div>
        </div>

        
    </MainLayout>
  )
}

export default Dashboard;