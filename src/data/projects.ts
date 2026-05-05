export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  year: string;
};

export const projects: Project[] = [];
