import React, { useEffect, useState } from "react";
import "./TodoApp.css";
import AllTaskList from "./lists/AllTaskList";
import TaskList from "./lists/TaskList";
const TodoApp = () => {
    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    });
    const [taskInput, setTaskInput] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [activeCard, setActiveCard] = useState(null);

    const handleInputChange = (e) => {
        setTaskInput(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setTaskDescription(e.target.value);
    };

    const addTask = () => {
        if (taskInput.trim() !== "") {
            const newTask = {
                id: Date.now(),
                text: taskInput,
                desc: taskDescription,
                status: "Pending"
            };
            let newTaskArray = [...tasks, newTask];
            setTasks([...tasks, newTask]);
            localStorage.setItem("tasks", JSON.stringify(newTaskArray));
            setTaskInput("");
            setTaskDescription('');
        }
    };

    const completeTask = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status: "Completed" } : task
        ));

    };
    // useEffect(() => {

    // }, [tasks])

    const deleteTask = (taskId) => {
        let newTasksArray = tasks.filter(task => task.id !== taskId);
        setTasks(newTasksArray);
        localStorage.setItem("tasks", JSON.stringify(newTasksArray));
    };

    const onDrop = (status, position) => {
        if (!activeCard) return;
        console.log(`${activeCard} will be droped in ${status} at posiotion ${position}`)
        // Find task by ID
        const taskToMove = tasks.find(task => task.id === activeCard);
        if (!taskToMove) return;

        // Remove from original list
        let updatedTasks = tasks.filter(task => task.id !== activeCard);

        // Insert at the new position with updated status
        updatedTasks.splice(position, 0, { ...taskToMove, status });
        setTasks(updatedTasks);
        setActiveCard(null);
    };

    return (
        <div className="todo-container">
            <h2>Task Glide</h2>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={taskInput}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Enter description..."
                    value={taskDescription}
                    onChange={handleDescriptionChange}
                />
                <button onClick={addTask}>Add Task</button>
            </div>

            <div className="task-columns">
                <AllTaskList title="All Tasks" tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} />
                <TaskList
                    status="Pending"
                    title="Pending Tasks"
                    tasks={tasks.filter(task => task.status === "Pending")}
                    completeTask={completeTask}
                    deleteTask={deleteTask}
                    setActiveCard={setActiveCard}
                    onDrop={onDrop}
                />
                <TaskList
                    status="Completed"
                    title="Completed Tasks"
                    tasks={tasks.filter(task => task.status === "Completed")}
                    completeTask={completeTask}
                    deleteTask={deleteTask}
                    setActiveCard={setActiveCard}
                    onDrop={onDrop}
                />
            </div>
        </div>
    );
};
export default TodoApp;

