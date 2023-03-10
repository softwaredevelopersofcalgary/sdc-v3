import { ProjectModel } from "./Project.model";
import ProjectCard from "./ProjectCard/ProjectCard";

interface ProjectCardsProps {
  projects: ProjectModel[] | undefined;
}

export default function ProjectCards({ projects }: ProjectCardsProps) {
  return (
    <div className="mx-auto mt-12 grid w-full gap-5 lg:max-w-none lg:grid-cols-3">
      {projects?.map((project: ProjectModel) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  );
}
