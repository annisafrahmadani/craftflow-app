import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import "../styles/jobs.css";


function Jobs(){
    
    const [jobs, setJobs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [newJob, setNewJob] = useState({
        company_name: "",
        job_title: "",
        employment_type: "",
        location: "",
        salary: "",
        source: "",
        application_link: "",
        follow_up_date: "",
        priority: "",
        next_action: "",
        status: "",
    });
        
    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
            try {
                const response = await api.get("jobs/");
                setJobs(response.data);
            } catch (error) {
                console.error(error);
            }
    };

    const createJob = async () => {
        try {

            const payload = {
                ...newJob,
                application_link: newJob.application_link?.trim() || ""
            };

            await api.post("jobs/", payload);
           
            setNewJob({
                company_name: "",
                job_title: "",
                employment_type: "",
                location: "",
                salary: "",
                source: "",
                application_link: "",
                follow_up_date: "",
                priority: "",
                next_action: "",
                status: "",
            });

            fetchJobs();

        } catch (error) {

            console.error(error);

        }
    };

    const handleEdit = (job) => {
        setEditingJob(job);

        setNewJob({
                company_name: job.company_name || "",
                job_title: job.job_title || "",
                employment_type: job.employment_type || "",
                location: job.location || "",
                salary: job.salary || "",
                source: job.source || "",
                application_link: job.application_link || "",
                follow_up_date: job.follow_up_date || "",
                priority: job.priority || "",
                next_action: job.next_action || "",
                status: job.status || "",
        });

        setIsModalOpen(true);
    };

    const updateJob = async () => {
        try {
            const payload = {
                ...newJob,
                application_link: newJob.application_link || ""
            };

            await api.put(`jobs/${editingJob.id}/`, payload);

            setEditingJob(null);

            setNewJob({
                company_name: "",
                job_title: "",
                employment_type: "",
                location: "",
                salary: "",
                source: "",
                application_link: "",
                follow_up_date: "",
                priority: "Select Option",
                next_action: "",
                status: "",
            });

            fetchJobs();

        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingJob(null);

        setNewJob({
            company_name: "",
            job_title: "",
            employment_type: "",
            location: "",
            salary: "",
            source: "",
            application_link: "",
            follow_up_date: "",
            priority: "Select Option",
            next_action: "",
            status: "",
        });
    };

    const deleteJob = async (id) => {
        try {
            await api.delete(`jobs/${id}/`);
            fetchJobs();
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    const cancelEdit = () => {
        setEditingJob(null);
        setNewJob({
            company_name: "",
            job_title: "",
            employment_type: "",
            location: "",
            salary: "",
            source: "",
            application_link: "",
            follow_up_date: "",
            priority: "Select Option",
            next_action: "",
            status: "",
        });
    };

    const totalApply = jobs.length;
    const activeJobsCount = jobs.filter(job => job.status !== "Rejected" && job.status !== "Accepted").length;
    const rejectedJobsCount = jobs.filter(job => job.status === "Rejected").length;
    const acceptedJobsCount = jobs.filter(job => job.status === "Accepted").length;

    const uniqueStatuses = [...new Set(jobs.map(job => job.status || "No Status"))];
    const colorPalette = ["#0066CC", "#10B140", "#FF6200", "#C58AF0", "#D4FF00", "#666666", "#111111"];

    const statusPieData = uniqueStatuses.map((statusName, index) => {
        const count = jobs.filter(job => (job.status || "No Status") === statusName).length;
    
            // Tentukan warna berdasarkan nama status agar konsisten, atau pakai urutan palet
            let statusColor = colorPalette[index % colorPalette.length];
            if (statusName === "Applied") statusColor = "var(--craft-blue)";
            if (statusName === "Accepted") statusColor = "var(--support-green)";
            if (statusName === "Rejected") statusColor = "var(--energy-orange)";

            return {
                name: statusName,
                value: count,
                color: statusColor
            };
    });
    const totalStatusValue = statusPieData.reduce((sum, item) => sum + item.value, 0);

    const typePieData = [
        { name: "Permanent", value: jobs.filter(job => job.employment_type === "Permanent").length, color: "var(--craft-blue)" },
        { name: "Contract", value: jobs.filter(job => job.employment_type === "Contract").length, color: "var(--flow-purple)" },
        { name: "Internship", value: jobs.filter(job => job.employment_type === "Internship").length, color: "var(--energy-orange)" },
        { name: "Management Trainee", value: jobs.filter(job => job.employment_type === "Management Trainee").length, color: "var(--neon-lime)" },
        { name: "Remote", value: jobs.filter(job => job.employment_type === "Remote").length, color: "var(--support-green)" },
        { name: "Hybrid", value: jobs.filter(job => job.employment_type === "Hybrid").length, color: "var(--gray-text)" },
        { name: "Freelance", value: jobs.filter(job => job.employment_type === "Freelance").length, color: "var(--dark-text)" }
    ];
    const totalTypeValue = typePieData.reduce((sum, item) => sum + item.value, 0);

    let statusGradString = "";
    let statusAcc = 0;
    statusPieData.filter(d => d.value > 0).forEach((slice) => {
        const pc = (slice.value / totalStatusValue) * 100;
        const start = statusAcc;
        statusAcc += pc;
        statusGradString += `${slice.color} ${start}% ${statusAcc}%, `;
    });
    statusGradString = statusGradString.slice(0, -2);

    let typeGradString = "";
    let typeAcc = 0;
    typePieData.filter(d => d.value > 0).forEach((slice) => {
        const pc = (slice.value / totalTypeValue) * 100;
        const start = typeAcc;
        typeAcc += pc;
        typeGradString += `${slice.color} ${start}% ${typeAcc}%, `;
    });
    typeGradString = typeGradString.slice(0, -2);

    console.log(jobs);

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
                <button 
                    className="add-job-button"
                    onClick={() => setShowForm(true)}
                >
                    + add Jobs
                </button>
            </div>

            <div className="jobs-summary">
                <div className="summary-card">
                    <h3>Total Application</h3>
                    <p>{totalApply}</p>
                </div>

                <div className="summary-card">
                    <h3>Active Process</h3>
                    <p
                        style={{color: "var(--craft-blue)"}}
                    >{activeJobsCount}</p>
                </div>

                <div className="summary-card">
                    <h3>Rejected</h3>
                    <p
                        style={{color: "var(--energy-orange)"}}
                    >{rejectedJobsCount}</p>
                </div>

                <div className="summary-card">
                    <h3>Accepted</h3>
                    <p
                        style={{color: "var(--support-green)"}}
                    >{acceptedJobsCount}</p>
                </div>
            </div>

            <div className="jobs-charts">
                <div className="chart-card">
                    <h3>Aplication Status</h3>

                    <div className="chart-container">
                        {totalStatusValue === 0 ?(
                            <div className="chart-placeholder">Belum ada data tipe kerja.</div>
                        ) :(
                            <>
                                <svg width="160" height="160" viewBox="0 0 32 32" style={{ transform: "rotate(-90deg)", borderRadius: "50%" }}>
                                    {(() => {
                                        let acc = 0;
                                        return typePieData.map((slice, i) => {
                                            if (slice.value === 0) return null;
                                            const pc = (slice.value / totalTypeValue) * 100;
                                            const dash = `${pc} ${100 - pc}`;
                                            const offset = 100 - acc;
                                            acc += pc;
                                            return <circle key={i} cx="16" cy="16" r="16" fill="transparent" stroke={slice.color} strokeWidth="32" strokeDasharray={dash} strokeDashoffset={offset} />;
                                        });
                                    })()}
                                </svg>

                                {statusPieData.map((item,i) => item.value > 0 &&(
                                    <span style={{ backgroundColor: item.color }} className="legend-badge">
                                        {item.name}
                                        {item.value} (
                                            {((item.value / totalStatusValue) * 100).toFixed(0)}%)
                    
                                    </span>
                                ))}

                                
                            </>
                        )}
                    </div>
                </div>

                <div className="chart-card">
                    <h3>Employment Type</h3>
                    
                    {totalTypeValue === 0 ? (
                        <div className="chart-placeholder">Belum ada data tipe kerja.</div>
                    ) : (
                        <>
                            <svg 
                                width="140" 
                                height="140" 
                                viewBox="0 0 32 32" 
                                style={{ transform: "rotate(-90deg)", borderRadius: "50%" }}
                            >
                                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#F3F3F3" strokeWidth="6" />
                                {(() => {
                                    let acc = 0;
                                    return typePieData.map((slice, i) => {
                                        if (slice.value === 0) return null;
                                        const pc = (slice.value / totalTypeValue) * 100;
                                        const dash = `${pc} ${100 - pc}`;
                                        const offset = 100 - acc;
                                        acc += pc;
                                        return (
                                            <circle 
                                                key={i} 
                                                cx="16" 
                                                cy="16" 
                                                r="16" 
                                                fill="transparent" 
                                                stroke={slice.color} 
                                                strokeWidth="32" 
                                                strokeDasharray={dash} 
                                                strokeDashoffset={offset} 
                                            />
                                        );
                                    });
                                })()}
                            </svg>

                            <div className="chart-legends" style={{ maxHeight: "200px", overflowY: "auto" }}>
                                {typePieData.map((item, i) => item.value > 0 && (
                                    <div key={i} className="legend-item">
                                        <span style={{ backgroundColor: item.color }} className="legend-badge"></span>
                                        <span className="legend-text">{item.name}</span>
                                        <strong>{item.value} ({((item.value / totalTypeValue) * 100).toFixed(0)}%)</strong>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
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
                            <th>Salary</th>
                            <th>Priority</th>
                            <th>Source</th>
                            <th>Status</th>
                            <th>Next Action</th>
                            <th>Link</th>
                        </tr>
                    </thead>

                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.id}>

                                <td>{job.company_name}</td>

                                <td>{job.job_title}</td>

                                <td>{job.employment_type}</td>

                                <td>{job.location}</td>

                                <td>{job.follow_up_date}</td>

                                <td>{job.salary}</td>

                                <td>{job.priority}</td>

                                <td>{job.source}</td>

                                <td>{job.status}</td>

                                <td>{job.next_action}</td>

                                <td>
                                    {job.application_link ? ( 
                                        <a
                                            href={
                                                 job.application_link.startsWith("http")
                                                ? job.application_link
                                                : `https://${job.application_link}`
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            View
                                        </a>
                                    ) :(
                                         <span style={{ color: "#aaa" }}>No link</span>
                                    )}
                                    
                                </td>

                                <td>
                                    <button onClick={() => handleEdit(job)}>
                                        Edit
                                    </button>

                                    <button onClick={() => deleteJob(job.id)}>
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <div className="modal-overlay">

                    <div className="job-form">

                        <h2>Add Job Application</h2>

                        <input
                            type="text"
                            placeholder="Company Name"
                            value={newJob.company_name}
                            onChange={(e) =>
                                setNewJob({
                                    ...newJob,
                                    company_name: e.target.value,
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Job Title"
                            value={newJob.job_title}
                            onChange={(e) =>
                                setNewJob({
                                    ...newJob,
                                    job_title: e.target.value,
                                })
                            }
                        />

                        <select
                            value={newJob.employment_type}
                            onChange={(e) =>
                                setNewJob({
                                    ...newJob,
                                    employment_type: e.target.value,
                                })
                            }
                        >
                            <option value="">
                                Select Employment Type
                            </option>

                            <option value="Permanent">
                                Permanent
                            </option>

                            <option value="Contract">
                                Contract
                            </option>

                            <option value="Internship">
                                Internship
                            </option>

                            <option value="Management Trainee">
                                Management Trainee
                            </option>

                            <option value="Remote">
                                Remote
                            </option>

                            <option value="Hybrid">
                                Hybrid
                            </option>

                            <option value="Freelance">
                                Freelance
                            </option>
                        </select>

                        <input
                            type="text"
                            placeholder="Location"
                            value={newJob.location}
                            onChange={(e) =>
                                setNewJob({
                                    ...newJob,
                                    location: e.target.value,
                                })
                            }
                        />

                        <input
                            type="date"
                            value={newJob.follow_up_date}
                            onChange={(e) =>
                                setNewJob({
                                    ...newJob,
                                    follow_up_date: e.target.value,
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Salary"
                            value={newJob.salary}
                            onChange={(e) =>
                                setNewJob({
                                    ...newJob,
                                    salary: e.target.value,
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Source"
                            value={newJob.source}
                            onChange={(e) =>
                                setNewJob({
                                    ...newJob,
                                    source: e.target.value,
                                })
                            }
                        />

                        <input
                            type="url"
                            placeholder="Application Link"
                            value={newJob.application_link}
                            onChange={(e) =>
                                setNewJob({
                                    ...newJob,
                                    application_link: e.target.value,
                                })
                            }
                        />

                        <select 
                            value={newJob.priority}
                            onChange={(e) =>
                                setNewJob({
                                    ...newJob,
                                    priority: e.target.value,
                                })
                            }
                        >
                            <option value="">Select Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>

                        <select 
                            value={newJob.status}
                                onChange={(e) =>
                                    setNewJob({
                                        ...newJob,
                                        status: e.target.value
                                    })
                                }
                            >
                                <option value="">Select Status</option>
                                <option value="applied">Applied</option>
                                <option value="screening">Screening</option>
                                <option value="assesment">Assesment</option>
                                <option value="interview">Interview</option>
                                <option value="offering">Offering</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                        </select>

                        <textarea 
                            placeholder="Next Action"
                            value={newJob.next_action}
                            onChange={(e) =>
                                setNewJob({
                                    ...newJob,
                                    next_action: e.target.value,
                                })
                            }>
                        </textarea>

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
                                    await createJob();
                                    setShowForm(false);
                                }}
                            >
                                Save Job
                            </button>

                        </div>

                    </div>

                </div>
            )}

            
        </div>

        {isModalOpen && (
            <div className="modal-overlay">
                <div className="modal">
                    
                    <h2>Edit Job</h2>

                    <input
                        value={newJob.company_name}
                        onChange={(e) =>
                            setNewJob({ 
                                ...newJob, 
                                company_name: e.target.value })
                        }
                    />

                    <input
                        value={newJob.job_title}
                        onChange={(e) =>
                            setNewJob({ 
                                ...newJob, 
                                job_title: e.target.value })
                        }
                    />

                    <select 
                        value={newJob.employment_type}
                        onChange={(e) =>
                            setNewJob({
                                ...newJob,
                                employment_type: e.target.value,
                            })
                        }
                    >

                        <option value="">
                                Select Employment Type
                            </option>

                            <option value="Permanent">
                                Permanent
                            </option>

                            <option value="Contract">
                                Contract
                            </option>

                            <option value="Internship">
                                Internship
                            </option>

                            <option value="Management Trainee">
                                Management Trainee
                            </option>

                            <option value="Remote">
                                Remote
                            </option>

                            <option value="Hybrid">
                                Hybrid
                            </option>

                            <option value="Freelance">
                                Freelance
                            </option>
                    </select>

                    <input
                            type="text"
                            placeholder="Location"
                            value={newJob.location}
                            onChange={(e) =>
                                setNewJob({
                                    ...newJob,
                                    location: e.target.value,
                                })
                            }
                    />

                    <input
                            type="date"
                            value={newJob.follow_up_date}
                            onChange={(e) =>
                                setNewJob({
                                    ...newJob,
                                    follow_up_date: e.target.value,
                                })
                            }
                    />

                    <input
                        type="text"
                        placeholder="Salary"
                        value={newJob.salary}
                        onChange={(e) =>
                            setNewJob({
                                    ...newJob,
                                    salary: e.target.value,
                                })
                            }
                    />

                    <input
                            type="text"
                            placeholder="Source"
                            value={newJob.source}
                            onChange={(e) =>
                                setNewJob({
                                    ...newJob,
                                    source: e.target.value,
                                })
                            }
                        />


                    <input
                        value={newJob.application_link}
                        onChange={(e) =>
                            setNewJob({ ...newJob, application_link: e.target.value })
                        }
                    />


                    <select 
                            value={newJob.priority}
                            onChange={(e) =>
                                setNewJob({
                                    ...newJob,
                                    priority: e.target.value,
                                })
                            }
                        >
                            <option value="">Select Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                    </select>

                    <select 
                            value={newJob.status}
                                onChange={(e) =>
                                    setNewJob({
                                        ...newJob,
                                        status: e.target.value
                                    })
                                }
                            >
                                <option value="">Select Status</option>
                                <option value="applied">Applied</option>
                                <option value="screening">Screening</option>
                                <option value="assessment">Assesment</option>
                                <option value="interview">Interview</option>
                                <option value="offering">Offering</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                    </select>

                    <textarea 
                            placeholder="Next Action"
                            value={newJob.next_action}
                            onChange={(e) =>
                                setNewJob({
                                    ...newJob,
                                    next_action: e.target.value,
                                })
                            }>
                    </textarea>

                    <div className="modal-actions">

                        <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                        </button>

                        <button 
                            type="button"
                            onClick={async () =>{
                            await updateJob();
                                setIsModalOpen(false);
                            }}
                        >Save</button>
                    </div>
                    
                </div>
            </div>
        )}

    </MainLayout>
);
}



export default Jobs;