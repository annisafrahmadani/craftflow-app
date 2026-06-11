import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import "../styles/tasks.css";

function Tasks(){
    const [tasks, setTasks] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        status: "todo",
        deadline: "",
    });

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

    const createTask = async () => {
        try {
            await api.post("tasks/", newTask);

            setNewTask({
                title: "",
                description: "",
                status: "todo",
                deadline: "",
            });

            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    }
    

    console.log(tasks);
    
    return (
        <MainLayout>
            <div className="tasks-page">
                <div className="tasks-header">

                    {showForm && (
                        <div className="modal-overlay">

                            <div className="task-form">

                                <h2>Add New Task</h2>

                                <input
                                    type="text"
                                    placeholder="Task Title"
                                    value={newTask.title}
                                    onChange={(e) =>
                                        setNewTask({
                                            ...newTask,
                                            title: e.target.value,
                                        })
                                    }
                                />

                                <textarea
                                    placeholder="Description"
                                    value={newTask.description}
                                    onChange={(e) =>
                                        setNewTask({
                                            ...newTask,
                                            description: e.target.value,
                                        })
                                    }
                                />

                                <select
                                    value={newTask.status}
                                    onChange={(e) =>
                                        setNewTask({
                                            ...newTask,
                                            status: e.target.value,
                                        })
                                    }
                                >
                                    <option value="todo">To Do</option>
                                    <option value="progress">In Progress</option>
                                    <option value="done">Completed</option>
                                </select>

                                <input
                                    type="date"
                                    value={newTask.deadline}
                                    onChange={(e) =>
                                        setNewTask({
                                            ...newTask,
                                            deadline: e.target.value,
                                        })
                                    }
                                />

                                <div className="modal-actions">

                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        onClick={async () => {
                                            await createTask();
                                            setShowForm(false);
                                        }}
                                    >
                                        Save Task
                                    </button>

                                </div>

                            </div>

                        </div>
                    )}

                    <div>
                        <h1 className="tasks-title">
                            Tasks
                        </h1>

                        <p className="tasks-subtitle">
                            Manage your creative workflow.
                        </p>
                    </div>
                    <button 
                        className="add-task-button"
                        onClick={() => setShowForm(true)}
                    >
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