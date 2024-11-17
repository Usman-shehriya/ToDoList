import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignupForm';
import ToDoList from '../components/ToDoList';
import { PrivateRoute } from './protectedRoute';

const AppRoutes = () => {
  const isLogin = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLogin ? <Navigate to="/ToDoList" /> : <LoginForm />} />
        <Route path="/signupform" element={isLogin ? <Navigate to="/ToDoList" /> : <SignUpForm />} />
        <Route path="/ToDoList" element=
        {<PrivateRoute isAuthentication={isLogin} Component={ToDoList} />} 
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
