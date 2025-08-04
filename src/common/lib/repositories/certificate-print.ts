import { AxiosInstance } from "axios";
import axiosInstance from "../axios.client";

export interface Certificate {
  post_award: string;
  risk_management: string;
  draft_contract: string;
  issuance_condition: string;
  signature: string;
  fmoj_ds: string;
  done_by: string;
  done_by_name: string;
  contracts_id: number;
}
export interface KickoffCertificate {
  signature: string;
  name_of_approver: string;
  kick_off: number;
}
export interface EarlyCertificate {
  signature: string;
  name_of_approver: string;
  early_id: number;
}

export interface ReuploadCertificate {
  form_id: number;
  uploaded_copy: string;
  contract_stage: string;
}

interface ICertificate {
  createCertificate: (payload: Certificate) => Promise<void>;
  reuploadCertificate: (payload: ReuploadCertificate) => Promise<void>;
  getCertificate: (id: number, by: string) => Promise<Certificate>;
  createKicoffCertificate: (payload: KickoffCertificate) => Promise<void>;
  getKickoffCertificate: (id: number) => Promise<KickoffCertificate>;
  createEarlyCertificate: (payload: EarlyCertificate) => Promise<void>;
  getEarlyCertificate: (id: number) => Promise<EarlyCertificate>;
}

export function CertificateRepository(axios: AxiosInstance): ICertificate {
  return {
    createCertificate: async (payload: Certificate) =>
      await axios.post("/contracts/create_contract_print.php", payload),
    reuploadCertificate: async (payload: ReuploadCertificate) =>
      await axios.post("/contracts/reupload_certificate.php", payload),
    getCertificate: async (id: number, by: string) =>
      await axios.get(
        `/contracts/get_contract_print.php?contracts_id=${id}&done_by=${by}`
      ),
    createKicoffCertificate: async (payload: KickoffCertificate) =>
      await axios.post("/contracts/create_kick_off_print.php", payload),
    getKickoffCertificate: async (id: number) =>
      await axios.get(`/contracts/get_kick_off_print.php?kick_off_id=${id}`),
    createEarlyCertificate: async (payload: EarlyCertificate) =>
      await axios.post(
        "/contracts/create_early_notification_print.php",
        payload
      ),
    getEarlyCertificate: async (id: number) =>
      await axios.get(
        `/contracts/get_early_notifications_print.php?early_id=${id}`
      ),
  };
}

export default CertificateRepository(axiosInstance);
