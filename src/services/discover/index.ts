
import { Api } from "../api";
import { ProjectData } from "./types";

export const ListAllProjects = async (tag?: string): Promise<ProjectData[]> => {
  let url = 'projects';
  
  if (tag) {
    url += `?search=${tag}`;
  }
  const response = await Api.get(url);
  return response.data;
};

