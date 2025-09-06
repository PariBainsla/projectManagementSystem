import React from "react";
import type { Project } from "../types";

export default function ProjectCard({ project }: { project: Project }) {
  const statusColor =
    project.status === "COMPLETED"
      ? "bg-green-100 text-green-700"
      : project.status === "ACTIVE"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{project.name}</h2>
      <p className="text-gray-600 text-sm mt-1">{project.description}</p>
      <div className="flex justify-between items-center mt-3">
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${statusColor}`}
        >
          {project.status}
        </span>
        {project.dueDate && (
          <span className="text-gray-500 text-xs">Due: {project.dueDate}</span>
        )}
      </div>
    </div>
  );
}

