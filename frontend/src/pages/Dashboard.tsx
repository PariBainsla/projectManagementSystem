import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import ProjectCard from "../components/ProjectCard";
import type { Project } from "../types";


const LIST_PROJECTS = gql`
  query ListProjects {
    projects {
      id
      name
      description
      status
      dueDate
    }
  }
`;

interface ListProjectsData {
  projects: Project[];
}

export default function Dashboard() {
  const { data, loading, error } = useQuery<ListProjectsData>(LIST_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading projects</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {data?.projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

