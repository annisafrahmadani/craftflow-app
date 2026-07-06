import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import "../styles/projects.css";

function Projects() {
    const [projects, setProjects] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [newProject, setNewProject] = useState({
        name: "",
        category: "",
        description: "",
        progress: 0,
        deadline: "",
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await api.get("projects/");
            setProjects(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createProject = async () => {
        try {
            await api.post("projects/", newProject);

            setNewProject({
                name: "",
                category: "",
                description: "",
                progress: 0,
                deadline: "",
            });

            fetchProjects();
        } catch (error) {
            console.error(error);
        }
    };

    const updateProject = async () => {
        try {
            await api.put(`projects/${editingId}/`, newProject);

            fetchProjects();

            setShowForm(false);
            setIsEditing(false);
            setEditingId(null);

            setNewProject({
                name: "",
                category: "",
                description: "",
                progress: 0,
                deadline: "",
            });

        } catch (error) {
            console.error(error);
        }
    };

    const deleteProject = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`projects/${id}/`);
            fetchProjects();
        } catch (error) {
            console.error(error);
        }
    };

    const editProject = (project) => {
        setNewProject({
            name: project.name,
            category: project.category,
            description: project.description,
            progress: project.progress,
            deadline: project.deadline,
        });

        setEditingId(project.id);
        setIsEditing(true);
        setShowForm(true);
    };

    return (
        <MainLayout>
            <div className="projects-page">

                <div className="projects-header">

                    <div>
                        <h1 className="projects-title">
                            Projects
                        </h1>

                        <p className="projects-subtitle">
                            Track your creative projects and progress.
                        </p>
                    </div>

                    <button 
                        className="add-project-button"
                        onClick={() => setShowForm(true)}
                    >
                        + Add Project
                    </button>

                </div>

                {showForm && (
                    <div className="modal-overlay">
                        <div className="project-form">

                            <h2>{isEditing ? "Edit Project" : "Add New Project"}</h2>

                            <input
                                type="text"
                                placeholder="Project Name"
                                value={newProject.name}
                                onChange={(e) =>
                                    setNewProject({
                                        ...newProject,
                                        name: e.target.value,
                                    })
                                }
                            />

                            <input
                                type="text"
                                placeholder="Category"
                                value={newProject.category}
                                onChange={(e) =>
                                    setNewProject({
                                        ...newProject,
                                        category: e.target.value,
                                    })
                                }
                            />

                            <textarea
                                placeholder="Description"
                                value={newProject.description}
                                onChange={(e) =>
                                    setNewProject({
                                        ...newProject,
                                        description: e.target.value,
                                    })
                                }
                            />

                            <input
                                type="number"
                                placeholder="Progress"
                                value={newProject.progress}
                                onChange={(e) =>
                                    setNewProject({
                                        ...newProject,
                                        progress: e.target.value,
                                    })
                                }
                            />

                            <input
                                type="date"
                                value={newProject.deadline}
                                onChange={(e) =>
                                    setNewProject({
                                        ...newProject,
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
                                    onClick={() => {
                                        if (isEditing) {
                                            updateProject();
                                        } else {
                                            createProject();
                                        }
                                    }}
                                >
                                    {isEditing ? "Update Project" : "Save Project"}
                                </button>

                            </div>
                        </div>
                    </div>
                )}

             
                {projects.map((project) => (

                    <div
                        className="project-card"
                        key={project.id}
                    >
                        

                        <div className="project-top">

                            <div>

                                <h3 className="project-name">
                                    {project.name}
                                </h3>

                                <p className="project-category">
                                    {project.category}
                                </p>

                            </div>

                            <span className="project-status">
                                {project.is_completed ? "Completed" : "Active"}
                            </span>

                        </div>

                        <p className="project-description">
                            {project.description}
                        </p>

                        <div className="project-progress-section">

                            <div className="project-progress-top">

                                <span>Progress</span>

                                <span>
                                    {project.progress}%
                                </span>

                            </div>

                            <div className="project-progress-bar">

                                <div
                                    className="project-progress-fill"
                                    style={{
                                        width: `${project.progress}%`,
                                    }}
                                ></div>

                            </div>

                        </div>

                        <div className="project-footer">

                            <span>
                                Project
                            </span>

                            <span>
                                Deadline{" "}
                                {project.deadline || "No Deadline"}
                            </span>

                        </div>

                        <div className="project-actions">
                            <button
                                className="edit-btn"
                                onClick={() => editProject(project)}
                            >
                                Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => deleteProject(project.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                ))}

            </div>
        </MainLayout>
    );
}

export default Projects;