import { Tech } from "../TechTagRow/TechTag/tech.model";

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
  image?: string;
  eventId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  techs: Tech[];
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
