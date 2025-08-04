import { AxiosInstance } from "axios";
import axiosInstance from "@lib/axios.client";

export interface EarlyNotification {
  users_id: number;
  mda: string;
  title: string;
  analog: string;
  file: any;
  details: string;
  lesson: string;
  contract_value: string;
  funding_source: string;
  user_department: string;
  proposed_contract: string;
  need_assessment: any;
  feasibility_study: any;
  appropriation_document: any;
  uploaded_copy: any;
}

export interface CreateEarlyNotification {
  users_id: number;
  mda: string;
  title: string;
  analog: string;
  file: any;
  details: string;
  lesson: string;
  contract_value: string;
  funding_source: string;
  user_department: string;
  proposed_contract: string;
  need_assessment: any;
  feasibility_study: any;
  appropriation_document: any;
}

export interface EditEarlyNotification {
  notifications_id: any;
  users_id: number;
  mda?: string;
  title?: string;
  analog?: string;
  file?: any;
  details?: string;
  lesson?: string;
  contract_value?: string;
  funding_source?: string;
  user_department?: string;
  proposed_contract?: string;
  need_assessment?: any;
  feasibility_study?: any;
  appropriation_document?: any;
  uploaded_copy?: any;
}

interface IEarlyNotification {
  create: (data: CreateEarlyNotification) => Promise<void>;
  readAll: () => Promise<EarlyNotification>;
  readAllByMda: (mda: any) => Promise<EarlyNotification>;
  readAllByUserId: (id: any) => Promise<EarlyNotification>;
  readSingle: (id: any) => Promise<EarlyNotification>;
  readByReviewer: (id: any) => Promise<EarlyNotification>;
  update: (payload: EditEarlyNotification) => Promise<void>;
}

export function EarlyNotificationRepository(
  axios: AxiosInstance
): IEarlyNotification {
  return {
    create: async (data: CreateEarlyNotification) =>
      await axios.post("/contracts/create_early_notifications.php", data),
    readAll: async () =>
      await axios.get(`/contracts/get_all_early_notifications.php`),
    readAllByMda: async (mda: any) =>
      await axios.get(`/contracts/get_all_early_notifications.php?mda=${mda}`),
    readAllByUserId: async (id: any) =>
      await axios.get(
        `/contracts/get_all_early_notifications.php?users_id=${id}`
      ),
    readSingle: async (id: any) =>
      await axios.get(
        `/contracts/get_single_early_notification.php?notification_id=${id}`
      ),
    readByReviewer: async (id: any) =>
      await axios.get(
        `/contracts/get_all_early_notifications.php?reviewer_id=${id}`
      ),
    update: async (payload: EditEarlyNotification) =>
      await axios.post(`/contracts/edit_early_notifications.php`, payload),
  };
}

export default EarlyNotificationRepository(axiosInstance);
