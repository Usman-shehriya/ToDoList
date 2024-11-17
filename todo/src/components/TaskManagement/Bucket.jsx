import React, { useState } from 'react';
import TaskInput from './TaskInput';
import './Bucket.css'; 

const Bucket = ({ bucket, addTask, handleDragStart, handleDrop, handleDragOver }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(bucket.name);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleSave = () => {
        if (newName.trim()) {
            bucket.name = newName; // Update the bucket name
            setIsEditing(false);
        }
    };

    return (
        <div 
            className="bucket-container"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, bucket.id)}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'} 
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
        >
            {isEditing ? (
                <input 
                    type="text" 
                    value={newName} 
                    onChange={handleNameChange} 
                    onBlur={handleSave} 
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()} // Save on Enter
                    className="bucket-name-input"
                />
            ) : (
                <button onClick={handleEditClick} className="bucket-name">
                    {bucket.name}
                </button>
            )}
            {bucket.tasks.map((task, taskIndex) => (
                <div 
                    key={task.id} 
                    draggable 
                    onDragStart={(e) => handleDragStart(e, bucket.id, taskIndex)} 
                    onDragEnd={(e) => e.preventDefault()} // Prevent default behavior to ensure proper drag
                    className="task-item"
                >
                    {task.title}
                </div>
            ))}
            <TaskInput addTask={addTask} bucketId={bucket.id} />
        </div>
    );
};

export default Bucket;
