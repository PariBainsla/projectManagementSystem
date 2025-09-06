// src/graphql/mutations.ts
import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!, $description: String, $status: String!, $dueDate: Date) {
    createProject(name: $name, description: $description, status: $status, dueDate: $dueDate) {
      id
      name
      status
      description
      dueDate
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($projectId: ID!, $title: String!, $description: String, $status: String!, $assigneeEmail: String) {
    createTask(projectId: $projectId, title: $title, description: $description, status: $status, assigneeEmail: $assigneeEmail) {
      id
      title
      status
      assigneeEmail
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($taskId: ID!, $content: String!) {
    addComment(taskId: $taskId, content: $content) {
      id
      content
      authorEmail
      timestamp
    }
  }
`;
