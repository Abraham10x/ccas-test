import { AxiosInstance } from "axios";
import axiosInstance from "../axios.client";

export interface EarlyRequest {
  id: any;
  status: any;
  users_id: any;
}

export interface ContractRequest {
  id: any;
  status: any;
  users_id: any;
}

export interface KickoffRequest {
  id: number;
  users_id: number;
  status: string;
}

export interface UploadCopyDocument {
  notifications_id: number;
  signed_copy: any;
  final_comment: string;
  status: string;
  contract_stage: string;
}

interface IApprove {
  handleEarlyReq: (req: EarlyRequest) => Promise<void>;
  handleContractReq: (req: ContractRequest) => Promise<void>;
  handleKickoffReq: (req: KickoffRequest) => Promise<void>;
  handleUploadReq: (req: UploadCopyDocument) => Promise<void>;
}

export function RequestRepository(axios: AxiosInstance): IApprove {
  return {
    handleEarlyReq: async (req: EarlyRequest) =>
      await axios.post("/contracts/approve_early_notifications.php", req),
    handleContractReq: async (req: ContractRequest) =>
      await axios.post("/contracts/approve_contract_registration.php", req),
    handleKickoffReq: async (req: KickoffRequest) =>
      await axios.post("/contracts/approve_kick_off.php", req),
    handleUploadReq: async (req: UploadCopyDocument) =>
      await axios.post("contracts/upload_signed_copy.php", req),
  };
}

export default RequestRepository(axiosInstance);
