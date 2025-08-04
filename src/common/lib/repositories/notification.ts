/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { AxiosInstance } from "axios";
import axiosInstance from "../axios.client";

export interface GetNotification {
  user_type: string;
  users_id: number;
  mda?: string;
}
export interface Update {
  id: number;
}

interface INotification {
  getNotify: (parms: GetNotification) => Promise<void>;
  updateNotify: (payload: Update) => Promise<Comment>;
}

export function NotificationRepository(axios: AxiosInstance): INotification {
  return {
    getNotify: async (parms: GetNotification) =>
      await axios.post(
        `/reports/get_notifications.php?user_type=${parms.user_type}&users_id=${
          parms.users_id
        }${parms.mda != null ? `&mda=${parms.mda}` : ""}`
      ),
    updateNotify: async (payload: Update) =>
      await axios.post(`/reports/read_notification.php`, payload),
  };
}

export default NotificationRepository(axiosInstance);
