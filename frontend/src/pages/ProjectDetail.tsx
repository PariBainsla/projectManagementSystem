// src/pages/ProjectDetail.tsx
import React from "react";
import { ApolloProvider, useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom"; 
import type { Project, Task } from "../types";
import TaskBoard from "../components/TaskBoard";

const GET_PROJECT_DETAIL = gql`
  query GetProjectDetail($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      dueDate
      tasks {
        id
        title
        description
        status
        assigneeEmail
        dueDate
      }
    }
  }
`;

interface ProjectDetailData {
  project: Project & { tasks: Task[] };
}

interface ProjectDetailVars {
  id: string;
}

const ProjectDetail: React.FC = () => {
  // ✅ grab id from the route
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery<ProjectDetailData, ProjectDetailVars>(
    GET_PROJECT_DETAIL,
    {
      variables: { id: id! }, // "!" since id will exist if route is correct
    }
  );

  if (loading) return <p>Loading project details...</p>;
  if (error) return <p>Error loading project</p>;
  if (!data?.project) return <p>Project not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{data.project.name}</h1>
      <p className="text-gray-600 mt-2">{data.project.description}</p>
      <p className="mt-1 text-sm text-gray-500">Status: {data.project.status}</p>
      {data.project.dueDate && (
        <p className="mt-1 text-sm text-gray-500">Due: {data.project.dueDate}</p>
      )}

      <div className="mt-6">
        <TaskBoard tasks={data.project.tasks} />
      </div>
    </div>
  );
};

export default ProjectDetail;
