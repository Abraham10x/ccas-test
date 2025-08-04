import { AxiosInstance } from "axios";
import axiosInstance from "@lib/axios.client";

export interface Resource {
  users_id: string;
  title: string;
  description: string;
  file: string;
}

export interface CreateResource {
  users_id: string;
  title: string;
  description: string;
  file: string;
}

interface ITrainingResourceRepository {
  createResource: (template: CreateResource) => Promise<void>;
  getResource: () => Promise<Resource>;
  getSingleResource: (id: any) => Promise<Resource>;
  editResource: (template: CreateResource) => Promise<void>;
  deleteResource: (id: any) => Promise<Resource>;
}

export function TrainingResourceRepository(
  axios: AxiosInstance
): ITrainingResourceRepository {
  return {
    createResource: async (resource: CreateResource) =>
      await axios.post("/training/create_training_resources.php", resource),
    getResource: async () =>
      await axios.get("/training/get_all_training_resources.php"),
    getSingleResource: async (id: any) =>
      await axios.post(`/training/get_training_resource.php?id=${id}`),
    editResource: async (resource: CreateResource) =>
      await axios.post("/training/edit_training_resources.php", resource),
    deleteResource: async (id: any) =>
      await axios.post(`/training/delete_training_resources.php?i=${id}`),
  };
}

export default TrainingResourceRepository(axiosInstance);
