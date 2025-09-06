// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProjectDetail from "./pages/ProjectDetail";
import TaskBoard from "./components/TaskBoard";
import CommentBox from "./components/CommentBox";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Simple Navbar */}
        <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Project Manager</h1>
          <div className="space-x-4">
            <a href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</a>
            <a href="/task-board" className="text-gray-700 hover:text-blue-600">Task Board</a>
          </div>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/task-board" element={<TaskBoard tasks={[]} />} />
          <Route path="/comments" element={<CommentBox />} />
        </Routes>
      </div>
    </Router>
  );
}


