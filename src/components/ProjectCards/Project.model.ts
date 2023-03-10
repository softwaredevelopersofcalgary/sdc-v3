export interface ProjectModel {
  id: string;
  name: string;
  description: string;
  link?: string;
  image?: string;
  eventId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  techs: Tech2[];
  author: Author;
  _count: Count;
}

interface Count {
  likes: number;
}

interface Author {
  id: string;
  email: string;
  name: string;
}

export interface Tech2 {
  id: string;
  projectId: string;
  masterTechId: string;
  tech: Tech;
}

export interface Tech {
  label: string;
}
