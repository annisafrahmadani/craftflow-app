import MainLayout from "../layouts/MainLayout";

import "../styles/jobs.css";


function Jobs(){
    return(
    <MainLayout>
        <div className="jobs-page">
            <div className="jobs-header">
                <div>
                    <h1 className="jobs-title">
                        Job Tracker
                    </h1>

                    <p className="jobs-subtitle">
                        Track your recruitment journey.
                    </p>
                </div>
                <button className="add-job-button">
                    + add Jobs
                </button>
            </div>
            <div className="jobs-summary">
                <div className="summary-card">
                    <h3>Total Applied</h3>
                    <p>25</p>
                </div>

                <div className="summary-card">
                    <h3>Active Process</h3>
                    <p>8</p>
                </div>

                <div className="summary-card">
                    <h3>Rejected</h3>
                    <p>15</p>
                </div>

                <div className="summary-card">
                    <h3>Accept</h3>
                    <p>1</p>
                </div>
            </div>
            <div className="jobs-charts">
                <div className="chart-card">
                    <h3>
                        Aplication Status
                    </h3>

                    <div className="chart-placeholder">
                        Pie Chart
                    </div>
                </div>
                <div className="chart-card">
                    <h3>
                        Employment Type
                    </h3>
                    <div className="chart-placeholder">
                        Pie Chart
                    </div>
                </div>
            </div>
            <div>
                <input 
                    type="text" 
                    placeholder="Search company or position"
                    className="jobs-search"
                />

                <select className="jobs-select">
                    <option>Status</option>
                    <option>Appplied</option>
                    <option>Assesment</option>
                    <option>Interview</option>
                    <option>Accepted</option>
                    <option>Rejected</option>
                </select>

                <select className="jobs-selected">
                    <option>Type</option>
                    <option>Contract</option>
                    <option>Permanent</option>
                    <option>Internship</option>
                    <option>Management Trainee</option>
                    <option>Remote</option>
                    <option>hybrid</option>
                </select>
            </div>
            <div className="jobs-table-container">
                <table className="jobs-table">
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Posisition</th>
                            <th>Type</th>
                            <th>Location</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                            <th>Salary</th>
                            <th>Follow Up</th>
                            <th>Priority</th>
                            <th>Next Action</th>
                            <th>Link</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>High</td>
                            <td>Prepare Assesment</td>
                            <td>View</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </MainLayout>
);
}

export default Jobs;