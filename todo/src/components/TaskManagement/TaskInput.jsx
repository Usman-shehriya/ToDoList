import React, { useState } from 'react';
import './TaskInput.css'; // Import the CSS file

const TaskInput = ({ addTask, bucketId }) => {
    const [task, setTask] = useState("");

    const handleAddTask = () => {
        if (task.trim()) {
            addTask(task, bucketId);
            setTask("");
        }
    };

    return (
        <div className="task-input-container">
            <input 
                type="text" 
                placeholder="New Task" 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
                className="task-input-field"
            />
            <button 
                onClick={handleAddTask} 
                className="add-task-btn"
            >
                Add Task
            </button>
        </div>
    );
};

export default TaskInput;
