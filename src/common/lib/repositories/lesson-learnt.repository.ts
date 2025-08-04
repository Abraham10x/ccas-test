import { AxiosInstance } from "axios";
import axiosInstance from "@lib/axios.client";

export interface LessonLearnt {
  contracts_title: any;
  users_id: any;
  scope_of_work: string;
  location: any;
  community_issues: string;
  cost_control: any;
  key_risks: any;
  tendering_exercises: any;
  mda_management: any;
}

export interface ILessonLearnt {
  create: (data: LessonLearnt) => Promise<void>;
  readAll: () => Promise<LessonLearnt>;
  readSingle: (id: any) => Promise<LessonLearnt>;
  update: (id: any) => Promise<void>;
  delete: (id: any, sessionId: any) => Promise<void>;
}

export function LessonLearntRepository(axios: AxiosInstance): ILessonLearnt {
  return {
    create: async (data: LessonLearnt) =>
      await axios.post("/contracts/create_lessons_learnt.php", data),
    readAll: async () => await axios.get(`/contracts/get_all_lessons.php`),
    readSingle: async (id: any) =>
      await axios.get(`/contracts/get_single_lesson.php?lesson_id=${id}`),
    update: async (id: any) => await axios.post(``),
    delete: async (id: any, sessionId: any) =>
      await axios.post("/contracts/delete_lesson.php"),
  };
}

export default LessonLearntRepository(axiosInstance);
