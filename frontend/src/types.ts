export interface Project {
  id: string;
  name: string;
  description: string; // required, keep consistent with ProjectCard props
  status: "ACTIVE" | "COMPLETED" | "ON_HOLD";
  dueDate?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE"; // ✅ matches backend schema
  assigneeEmail?: string;
  dueDate?: string;
}
