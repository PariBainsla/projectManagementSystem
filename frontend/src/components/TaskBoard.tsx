// src/components/TaskBoard.tsx
import React, { useState } from "react";
import type { Task } from "../types";
import CommentBox from "./CommentBox";

interface TaskBoardProps {
  tasks?: Task[];
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks = [] }) => {
  // Group tasks by status
  const todoTasks = tasks.filter((t) => t.status === "TODO");
  const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS");
  const doneTasks = tasks.filter((t) => t.status === "DONE");

  // Track which task's comments are visible
  const [openComments, setOpenComments] = useState<string | null>(null);

  const renderTasks = (list: Task[]) => (
    <ul className="space-y-2">
      {list.map((task) => (
        <li
          key={task.id}
          className="p-3 bg-white rounded-lg shadow"
        >
          <div className="flex justify-between">
            <div>
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-700">
              {task.status}
            </span>
          </div>

          {/* Toggle comments */}
          <button
            onClick={() =>
              setOpenComments(openComments === task.id ? null : task.id)
            }
            className="text-xs text-indigo-600 mt-2 underline"
          >
            {openComments === task.id ? "Hide Comments" : "Show Comments"}
          </button>

          {openComments === task.id && (
            <div className="mt-3">
              <CommentBox />
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Task Board</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TODO */}
        <div>
          <h3 className="text-md font-semibold mb-2">To Do</h3>
          {todoTasks.length > 0 ? renderTasks(todoTasks) : <p>No tasks</p>}
        </div>

        {/* In Progress */}
        <div>
          <h3 className="text-md font-semibold mb-2">In Progress</h3>
          {inProgressTasks.length > 0 ? renderTasks(inProgressTasks) : <p>No tasks</p>}
        </div>

        {/* Done */}
        <div>
          <h3 className="text-md font-semibold mb-2">Done</h3>
          {doneTasks.length > 0 ? renderTasks(doneTasks) : <p>No tasks</p>}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
