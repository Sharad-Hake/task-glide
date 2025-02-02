import React, {useState, useEffect} from "react";
import "../TodoApp.css";
const AllTaskList = ({ title, tasks, completeTask, deleteTask }) => {
    const [filterStatus, setFilterStatus] = useState("All");
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    useEffect(() => {
        console.log(tasks);
        setFilteredTasks(tasks);
    }, [tasks]);
    const handleFilterChange = (status) => {
        if (status === "All") {
            setFilterStatus('All')
            setFilteredTasks(tasks);
        }
        else {
            setFilterStatus(status);
            const filteredData = tasks.filter(task => task.status === status);
            setFilteredTasks(filteredData);
        }

    }
    return (
        <div className="all-list">
            <header > <h3>{title}</h3>
                <div>
                    <select value={filterStatus} className="select" onChange={(e) => handleFilterChange(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </header>


            <ul>
                {filteredTasks.length === 0 ? <p className="no-data">No tasks</p> : filteredTasks.map((task) => (
                    <li className={task.status === "Completed" ? "completed" : ""}
                        key={task.id}
                    >
                        <div className="task-content">
                        <span className="title">{task.text}</span>
                        <div style={{width:'100%'}}>
                        <span className="desc">{task.desc}</span>
                        </div>
                        </div>
                        <div className="status-Container">
                        <span className="status">{task.status}</span>
                        <div className="actions">
                            {task.status === "Pending" && (
                                <button className="complete-btn" onClick={() => completeTask(task.id)}>✓</button>
                            )}
                            <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑</button>
                        </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};
export default AllTaskList;