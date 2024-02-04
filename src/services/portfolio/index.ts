import { AxiosResponse } from "axios";
import { Api } from "../api";

export const RegisterProjects = async (
  formData: FormData,
): Promise<AxiosResponse> => {
  return await Api.post("projects", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

};


