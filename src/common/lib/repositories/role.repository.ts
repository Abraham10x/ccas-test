import { AxiosInstance } from "axios";
import axiosInstance from "@lib/axios.client";

export interface IRole {
  id: string;
  title: string;
  usermanagement: boolean;
  request_new_user: boolean;
  early_notifications: boolean;
  early_notifications_write: boolean;
  early_notifications_approve: boolean;
  upload_contracts: boolean;
  view_contracts: boolean;
  contract_approve: boolean;
  monitoring_stage_write: boolean;
  monitoring_stage_approve: boolean;
  view_monitoring_stage: boolean;
  legal_adviser_auth: boolean;
  forms_management: boolean;
  close_out_write: boolean;
  close_out_read: boolean;
  close_out_approve: boolean;
}

export interface Role {
  id: number;
  title: string;
}

export interface CreateRole {
  title: string;
  usermanagement: boolean;
  request_new_user: boolean;
  early_notifications: boolean;
  early_notifications_write: boolean;
  early_notifications_approve: boolean;
  upload_contracts: boolean;
  view_contracts: boolean;
  contract_approve: boolean;
  monitoring_stage_write: boolean;
  monitoring_stage_approve: boolean;
  view_monitoring_stage: boolean;
  legal_adviser_auth: boolean;
  forms_management: boolean;
  close_out_write: boolean;
  close_out_read: boolean;
  close_out_approve: boolean;
}

interface IRoleRepository {
  createRole: (role: CreateRole) => Promise<void>;
  getRole: () => Promise<IRole>;
  getReviewer: () => Promise<IRole>;
  getMda: () => Promise<void>;
  getSingleRole: (id: any) => Promise<IRole>;
  editRole: (role: CreateRole) => Promise<void>;
}

export function RoleRepository(axios: AxiosInstance): IRoleRepository {
  return {
    createRole: async (role: CreateRole) =>
      await axios.post("/users/create_roles.php", role),
    getRole: async () => await axios.get("/users/get_roles.php?role="),
    getMda: async () => await axios.get("/contracts/get_all_mdas.php"),
    getReviewer: async () =>
      await axios.get("/users/get_users_roles.php?role=reviewer"),
    editRole: async (role: CreateRole) =>
      await axios.post("/users/edit_roles.php", role),
    getSingleRole: async (id: any) =>
      await axios.get(`/users/get_single_role.php?role_id=${id}`),
  };
}

export default RoleRepository(axiosInstance);
