export interface ProjectModel {
  id: string;
  name: string;
  description: string;
  link?: string | null;
  image?: string;
  eventId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  techs: Tech2[];
  author: Author;
  comments: Comment[];
  _count: Count;
  isMember?: boolean;
  isUserPartOfAnyProject?: boolean;
  members?: Member[];
  tags?: Tag[];
}

export interface Tag {
  id: string;
  name: string;
}

export interface Member {
  id: string;
  name: string;
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
  id: string;
  imgUrl: string;
}

interface Comment {
  id: string;
  comment: string;
  projectId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface User {
  id: string;
  name: string;
  image: string;
  title: string;
  techs: Tech2[];
}
