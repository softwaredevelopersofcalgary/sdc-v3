import { type Project } from "@prisma/client";
import { useSession } from "next-auth/react";
import ProjectCard from "./ProjectCard/ProjectCard";

interface ProjectCardsProps {
  projects: Project[] | undefined;
}

export default function ProjectCards({ projects }: ProjectCardsProps) {
  const { data } = useSession();

  return (
    <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      {projects?.map((project: Project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  );
}
