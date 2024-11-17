import React, { useState } from 'react';
import Bucket from './Bucket';
import './TaskManagement.css'; // Import the CSS file

const TaskManagement = () => {
    const [buckets, setBuckets] = useState([]);

    // Function to add a new bucket
    const addBucket = () => {
        const newBucket = {
            id: Date.now().toString(), // Unique ID based on timestamp
            name: `Bucket ${buckets.length + 1}`,
            tasks: [],
        };
        setBuckets([...buckets, newBucket]); // Update buckets state
    };

    // Function to add a new task to a specific bucket
    const addTask = (taskTitle, bucketId) => {
        const updatedBuckets = buckets.map(bucket => {
            if (bucket.id === bucketId) {
                return {
                    ...bucket,
                    tasks: [...bucket.tasks, { id: Date.now().toString(), title: taskTitle }],
                };
            }
            return bucket; // Return unchanged bucket if ID does not match
        });
        setBuckets(updatedBuckets); // Update buckets state
    };

    // Drag and drop logic
    const handleDragStart = (e, bucketId, taskIndex) => {
        e.dataTransfer.setData('bucketId', bucketId); // Set source bucket ID
        e.dataTransfer.setData('taskIndex', taskIndex); // Set task index
    };

    const handleDrop = (e, targetBucketId) => {
        const sourceBucketId = e.dataTransfer.getData('bucketId');
        const taskIndex = e.dataTransfer.getData('taskIndex');

        // Only move task if it's from a different bucket
        if (sourceBucketId !== targetBucketId) {
            const sourceBucket = buckets.find(bucket => bucket.id === sourceBucketId);
            const targetBucket = buckets.find(bucket => bucket.id === targetBucketId);
            const movedTask = sourceBucket.tasks[parseInt(taskIndex)]; // Ensure index is an integer

            const updatedSourceBucket = {
                ...sourceBucket,
                tasks: sourceBucket.tasks.filter((_, index) => index !== parseInt(taskIndex)), // Remove task from source
            };

            const updatedTargetBucket = {
                ...targetBucket,
                tasks: [...targetBucket.tasks, movedTask], // Add task to target
            };

            // Update buckets state with modified source and target buckets
            setBuckets(buckets.map(bucket => 
                bucket.id === sourceBucketId ? updatedSourceBucket : 
                bucket.id === targetBucketId ? updatedTargetBucket : bucket
            ));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Allow dropping on the target
    };

    return (
        <div className="task-management-container">
            <h1>Task Management</h1>
            <div className="button-container">
                <button onClick={addBucket} className="add-bucket-button">Add Bucket</button>
            </div>
            <div className="buckets-container">
                {buckets.map(bucket => (
                    <div key={bucket.id} className="bucket">
                    <Bucket 
                        key={bucket.id} 
                        bucket={bucket} 
                        addTask={addTask} 
                        handleDragStart={handleDragStart}
                        handleDrop={handleDrop}
                        handleDragOver={handleDragOver}
                    />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskManagement;
