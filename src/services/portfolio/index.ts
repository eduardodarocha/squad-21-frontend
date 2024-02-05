import { AxiosResponse } from "axios";
import { Api } from "../api";
import { ProjectData } from "./types";

export const RegisterProjects = async (
  formData: FormData,
): Promise<AxiosResponse> => {
  return await Api.post("projects", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

};

export const ListProjects = async (tag?: string): Promise<ProjectData[]> => {
  let url = 'projects/by-user';
  
  if (tag) {
    url += `?search=${tag}`;
  }
  const response = await Api.get(url);
  return response.data;
};

export const ListSingleProject = async (id: string): Promise<ProjectData> => {
  const response = await Api.get(`projects/by-project/${id}`);
  return response.data;
};

export const DeleteProject = async (id: string): Promise<AxiosResponse> => {
  const response = await Api.delete(`projects/${id}`);
  return response.data;
};
