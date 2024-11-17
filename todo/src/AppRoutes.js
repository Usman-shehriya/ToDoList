import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TaskManagement from './components/TaskManagement/TaskManagement';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Define your routes here */}
            <Route path="/task-management" element={<TaskManagement />} />
        </Routes>
    );
};

export default AppRoutes;
