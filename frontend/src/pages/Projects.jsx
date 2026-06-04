import MainLayout from "../layouts/MainLayout";

import "../styles/projects.css"

function Projects(){
    return(
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

                    <button className="add-project-button">
                        + Add Project
                    </button>
                </div>

                <div className="projects-grid">
                    <div className="project-card">
                        <div className="project-top">
                            <div>
                                <h3 className="project-name">
                                    CraftFlow Dashboard
                                </h3>

                                <p className="project-category">
                                    Web Development
                                </p>
                            </div>

                            <span className="project-status active">
                                Active
                            </span>
                        </div>
                        <p className="project-description">
                            Build productivity with React and Django backend.
                        </p>
                        
                        <div className="project-progress-section">
                            <div className="project-progress-top">
                                <span>Progress</span>
                                <span>75%</span>
                            </div>

                            <div className="project-progress-bar">
                                <div className="project-progress-fill"
                                style={{width: 75}}
                                ></div>
                            </div>
                        </div>
                        <div className="project-footer">
                            <span>
                                12 Tasks
                            </span>

                            <span>
                                Deadline: May 28
                            </span>
                        </div>
                    </div>
                    <div className="project-card">
                        <div className="project-top">
                            <div>
                                <h3 className="project-name">
                                    Ponyo Sims 4 Mod
                                </h3>

                                <p className="project-category">
                                    Game Modding
                                </p>
                            </div>
                            <span className="project-status completed">
                                Completed
                            </span>
                        </div>
                        <p className="project-description">
                            Create custom Ponyo inpires assets and gameplay experience.
                        </p>
                        <div className="projects-progress-section">
                            <div className="project-progress-top">
                                <span>Progress</span>
                                <span>100%</span>
                            </div>
                            <div className="project-progress-bar">
                                <div className="project-progress-fill completed-fill"
                                style={{width: "100%"}}></div>
                            </div>
                        </div>
                        <div className="project-footer">
                            <span>
                                20 Tasks
                            </span>

                            <span>Deadline: May 18</span>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
export default Projects;