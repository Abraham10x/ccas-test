import { AxiosInstance } from "axios";
import axiosInstance from "../axios.client";

export interface RequestUser {
  fullname: string;
  email: string;
  mda: string;
  legal_title: string;
  requested_by: number;
  role: any;
}
export interface UpdateStatus {
  request_id: number;
  approval_status: string;
}

interface IApprove {
  handleUserRequest: (req: RequestUser) => Promise<void>;
  readMdaRequest: (mda: any) => Promise<void>;
  readAllRequest: () => Promise<void>;
  handleStatus: (payload: UpdateStatus) => Promise<void>;
}

export function RequestUserRepository(axios: AxiosInstance): IApprove {
  return {
    handleUserRequest: async (req: RequestUser) =>
      await axios.post("/users/request_user.php", req),
    readMdaRequest: async (mda: any) =>
      await axios.get(`/users/get_all_request_user.php?mda=${mda}`),
    readAllRequest: async () =>
      await axios.get(`/users/get_all_request_user.php`),
    handleStatus: async (payload: UpdateStatus) =>
      await axios.post("users/approve_user_request.php", payload),
  };
}

export default RequestUserRepository(axiosInstance);
