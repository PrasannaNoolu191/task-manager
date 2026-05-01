import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Dashboard from "../pages/dashboard/dashboard";

import Tasks from "../pages/tasks/tasks-list";
import MainLayout from "../components/layout/main-layout";
import EditUserDetails from "../pages/auth/edit-user-details";
import PrivateRoute from "./private-route";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default route → Login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/edit-profile" element={<EditUserDetails />} />
        </Route>
      </Route>
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* <Route path="/tasks" element={<TasksList />} /> */}
    </Routes>
  );
};

export default AppRoutes;
