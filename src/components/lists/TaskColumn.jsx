import React from "react";
import '../TodoApp.css';
const TaskColumn = ({ task, completeTask, deleteTask, setActiveCard }) => (
    <li
        draggable={true}
        className={task.status === "Completed" ? "completed" : ""}
        onDragStart={() => setActiveCard(task.id)}
        onDragEnd={() => setActiveCard(null)}
    >
        <div className="task-content">
            <span className="title">{task.text}</span>
            <div style={{ width: '100%' }}>
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
);
export default TaskColumn;