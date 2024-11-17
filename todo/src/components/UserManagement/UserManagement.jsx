import React, { useState } from 'react';
import axios from 'axios'; // Axios to make API requests

function UserManagement() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API request to save data in Laravel
    axios.post('http://localhost:8000/api/students', formData)
      .then(response => {
        console.log('User data saved successfully:', response.data);
        alert('User added successfully!');
      })
      .catch(error => {
        console.error('There was an error saving the user data!', error);
      });
  };

  return (
    <div>
      <h2>User Management</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        
        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        
        <label>Course:</label>
        <input type="text" name="course" value={formData.course} onChange={handleChange} required />
        
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default UserManagement;
