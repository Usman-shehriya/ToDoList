import React, { useState, useEffect } from 'react';  
import TaskManagement from './TaskManagement/TaskManagement'; 
import UserManagement from './UserManagement/UserManagement';
import './ToDoList.css';
import { useNavigate } from 'react-router-dom'; 

function ToDoList() {
  const [tasks, setTasks] = useState([]); 
  const [newTask, setNewTask] = useState(""); 
  const [draggedTaskIndex, setDraggedTaskIndex] = useState(null); // For drag and drop
  const [currentComponent, setCurrentComponent] = useState(''); // Track which component to show
  const navigate = useNavigate(); 

  // Authentication check
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate("/");
    }
  }, [navigate]);

  // Handle task input change
  function handleInputChange(event) {
    setNewTask(event.target.value); 
  }

  // Add task to list
  function addTask() {
    if (newTask.trim() !== "") { 
      setTasks((t) => [...t, newTask]); 
      setNewTask(""); 
    }
  }

  // Delete task from list
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index); 
    setTasks(updatedTasks); 
  }

  // Move task up
  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      const temp = updatedTasks[index - 1];
      updatedTasks[index - 1] = updatedTasks[index];
      updatedTasks[index] = temp;
      setTasks(updatedTasks);
    }
  }

  // Move task down
  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      const temp = updatedTasks[index + 1];
      updatedTasks[index + 1] = updatedTasks[index];
      updatedTasks[index] = temp;
      setTasks(updatedTasks);
    }
  }

  // Drag events
  function handleDragStart(index) {
    setDraggedTaskIndex(index); // Set dragged task index
  }

  function handleDragOver(event) {
    event.preventDefault(); // Prevent default to allow drop
  }

  function handleDrop(index) {
    const updatedTasks = [...tasks];
    const [draggedTask] = updatedTasks.splice(draggedTaskIndex, 1); // Remove dragged task
    updatedTasks.splice(index, 0, draggedTask); // Insert at the new position
    setTasks(updatedTasks);
    setDraggedTaskIndex(null); // Reset dragged task index
  }

  // Set to load Task Management component
  const loadTaskManagement = () => {
    setCurrentComponent('task'); // Set to 'task' to show Task Management
  };

  // Set to load User Management component
  const loadUserManagement = () => {
    setCurrentComponent('user'); // Set to 'user' to show User Management
  };

  // Conditional rendering based on the selected component
  return (
    <div className="to-do-list">
      {currentComponent === 'task' && <TaskManagement />}
      {currentComponent === 'user' && <UserManagement />}
      
      {!currentComponent && (
        <>
          <h1>To-Do List</h1>
          <div className='input-container'>
            <input
              className='task-input'
              type='text'
              placeholder='Add Task Here...' 
              value={newTask}
              onChange={handleInputChange} 
            />
            <button className='add-button' onClick={addTask}>
              Add
            </button>
            <button className='task-button' onClick={loadTaskManagement}>
              Task Management
            </button>
            <button className='user-button' onClick={loadUserManagement}>
              User Management
            </button>
          </div>
          <ol>
            {tasks.map((task, index) => (
              <li 
                className='task-item' 
                key={index}
                draggable 
                onDragStart={() => handleDragStart(index)} 
                onDragOver={handleDragOver} 
                onDrop={() => handleDrop(index)}
              >
                <span className='ol-text'>{task}</span> 
                <button className='move-button' onClick={() => moveTaskUp(index)}>
                  Move Up
                </button>
                <button className='move-button' onClick={() => moveTaskDown(index)}>
                  Move Down
                </button>
                <button className='delete-button' onClick={() => deleteTask(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

export default ToDoList;
