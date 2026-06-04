import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import "../styles/tasks.css";

function Tasks(){
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get("tasks/");
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    console.log(tasks);
    
    return (
        <MainLayout>
            <div className="tasks-page">
                <div className="tasks-header">
                    <div>
                        <h1 className="tasks-title">
                            Tasks
                        </h1>

                        <p className="tasks-subtitle">
                            Manage your creative workflow.
                        </p>
                    </div>
                    <button className="add-task-button">
                        + add Task
                    </button>
                </div>
                <div className="tasks-list">   
                    {tasks.map((task) => (

                        <div
                            className="task-card"
                            key={task.id}
                        >

                            <div className="task-top">

                                <h3 className="task-name">
                                    {task.title}
                                </h3>

                                <span className={`task-status ${task.status}`}>
                                    {task.status}
                                </span>

                            </div>

                            <p className="task-description">
                                {task.description}
                            </p>

                            <div className="task-footer">

                                <span className="task-deadline">

                                    Deadline:
                                    {" "}
                                    {task.deadline || "No Deadline"}

                                </span>

                            </div>

                        </div>

                    ))}     
                </div>
            </div>
        </MainLayout>
    )
}
export default Tasks;