import { AxiosInstance } from "axios";
import axiosInstance from "../axios.client";

export interface Activity {
  users_id: string;
  mda: string;
}

interface IActivity {
  getAllActivityLog: () => Promise<void>;
  getActivity: (payload: Activity) => Promise<void>;
}

export function ActivityRepository(axios: AxiosInstance): IActivity {
  return {
    getAllActivityLog: async () => await axios.get("/reports/audit_trail.php"),
    getActivity: async (payload: Activity) =>
      await axios.post(`/reports/audit_trail.php`, payload),
  };
}

export default ActivityRepository(axiosInstance);
