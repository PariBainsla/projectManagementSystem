// src/graphql/queries.ts
import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      description
      status
      dueDate
    }
  }
`;

export const GET_PROJECT_DETAIL = gql`
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
