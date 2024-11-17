import axios from 'axios';

// Base URL for your Laravel API
const API_URL = 'http://127.0.0.1:8000/api/students';

// Fetch all students
export const fetchStudents = () => axios.get(API_URL);

// Fetch a student by ID
export const fetchStudentById = (id) => axios.get(`${API_URL}/${id}`);

// Create new student
export const createStudent = (studentData) => axios.post(API_URL, studentData);

// Update a student
export const updateStudent = (id, studentData) => axios.put(`${API_URL}/${id}/edit`, studentData);

// Delete a student
export const deleteStudent = (id) => axios.delete(`${API_URL}/${id}/delete`);
