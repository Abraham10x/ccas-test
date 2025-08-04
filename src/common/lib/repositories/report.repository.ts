
import { AxiosInstance } from "axios";
import axiosInstance from "../axios.client";

export interface Report {
  form_type: any;
  from_date: any;
  to_date: any;
}

interface IReport {
  create: (payload: Report) => Promise<void>;
}

export function ReportRepository(axios: AxiosInstance): IReport {
  return {
    create: async (payload: Report) =>
      await axios.post("/reports/get_reports.php", payload),
  };
}

export default ReportRepository(axiosInstance);
