import { AxiosInstance } from "axios";
import axiosInstance from "../axios.client";

export interface Iuser {
  id: string;
  fullName: any;
  job_title: any;
  mda: any;
  department: any;
  specialization: any;
  role: any;
  email: any;
  phone: any;
  home_address: any;
  office_address: any;
  staff_no: any;
  profile_pic: any;
  training_status: any;
  createdAt: string;
  updatedAt: string;
  permissions: null;
}
export interface UserRegister {
  fullname: any;
  job_title: any;
  mda: any;
  department: any;
  specialization: any;
  role: any;
  email: any;
  phone: any;
  home_address: any;
  office_address: any;
  staff_no: any;
  profile_pic: any;
  training_status: any;
}

export interface EditUser {
  users_id: any;
  fullname: string;
  email: string;
  phone: string;
  mda: string;
  job_title: string;
  staff_no: string;
  office_address: string;
  home_address: string;
  specialization: string;
  department: string;
  training_status: string;
  role: number;
  profile_pic: any;
}

export interface UserLogin {
  email: string;
  passkey: string;
}

export interface UserProfile {
  status: string;
  data: {
    user: Iuser;
  };
}

export interface LoginResponse {
  status: string;
  token: string;
}

export interface ForgotPassword {
  email: string;
}

export interface ResetPassword {
  email: string;
  token: string;
  new_password: string;
}

export interface Staistics {
  users: number;
  contracts: number;
  training: number;
  contract_template: number;
  lessons_learnt: number;
}

export interface Logout {
  session_id: string;
}

export interface CreateUser {
  request_id: number;
  email: string;
}

export interface CreateMda {
  mda_code: string;
  title: string;
}
export interface ChangePassword {
  users_id: string;
  old_password: string;
  new_password: string;
}

export interface EditPermissions {
  users_id: any;
  role_title: string;
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

interface IUserRepository {
  register: (user: UserRegister) => Promise<void>;
  login: (user: UserLogin) => Promise<any>;
  getUser: (userId: number) => Promise<UserProfile>;
  getAllUsers: () => Promise<UserProfile>;
  refresh: (token: { token: string }) => Promise<void>;
  activeAccount: (token: { token: string }) => Promise<void>;
  forgotPassword: (email: ForgotPassword) => Promise<void>;
  resetPassword: (resetPassword: ResetPassword) => Promise<void>;
  changePassword: (changePassword: ChangePassword) => Promise<void>;
  logout: (sessionId: Logout) => Promise<void>;
  statistics: () => Promise<Staistics>;
  editUser: (user: EditUser) => Promise<void>;
  createUser: (payload: CreateUser) => Promise<void>;
  createNewMda: (payload: CreateMda) => Promise<void>;
  editPermissions: (payload: EditPermissions) => Promise<void>;
}

export function AuthRepository(axios: AxiosInstance): IUserRepository {
  return {
    register: async (user: UserRegister) =>
      await axios.post("/users/create_user.php", user),
    login: async (user: UserLogin) =>
      await axios.post("/users/login.php", user),
    getUser: async (userId: number) =>
      (await axios.get(`/users/get_user.php?user_id=${userId}`)).data,
    getAllUsers: async () => await axios.get("/users/get_all_users.php"),
    refresh: async (token: { token: string }) =>
      await axios.post("/auth/refresh", token),
    activeAccount: async (token: { token: string }) =>
      await axios.post("/auth/activate-account", token),
    forgotPassword: async (email: ForgotPassword) =>
      await axios.post("/users/request_forget_password_token.php", email),
    resetPassword: async (resetPassword: ResetPassword) =>
      await axios.post("/users/validate_reset_password.php", resetPassword),
    changePassword: async (changePassword: ChangePassword) =>
      await axios.post("/users/change_password.php", changePassword),
    logout: async (sessionId: Logout) =>
      await axios.post(`/users/signout.php`, sessionId),
    statistics: async () =>
      await axios.get(
        "/reports/get_statictics_by_user.php?user_type=super_admin&mda="
      ),
    editUser: async (user: EditUser) =>
      await axios.post("/users/edit_user.php", user),
    createUser: async (payload: CreateUser) =>
      await axios.post("/users/certify_user.php"),
    createNewMda: async (payload: CreateMda) =>
      await axios.post("/process/create_mda.php", payload),
    editPermissions: async (payload: EditPermissions) =>
      await axios.post("/users/edit_user_permission.php", payload),
  };
}

export default AuthRepository(axiosInstance);
