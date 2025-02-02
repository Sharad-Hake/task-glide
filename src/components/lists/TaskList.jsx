import React from "react";
import TaskColumn from "./TaskColumn";
import DropArea from "./DropArea";
import '../TodoApp.css';
const TaskList = ({ title, tasks, completeTask, deleteTask, setActiveCard, onDrop, status }) => {
    return (
        <div className="task-section">
            <header>
            <h3>{title}</h3>
            </header>
            <ul>
                <DropArea status={status} index={0} onDrop={(status, index) => onDrop(status, 0)} />
                {tasks.length === 0 ? <p>No tasks</p> : tasks.map((task, index) => (
                    <React.Fragment key={task.id}>
                        <TaskColumn task={task} completeTask={completeTask} deleteTask={deleteTask} setActiveCard={setActiveCard} />
                        <DropArea status={status} index={index + 1} onDrop={(status, index) => onDrop(status, index + 1)} />
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
};
export default TaskList;