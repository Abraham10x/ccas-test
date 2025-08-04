import { AxiosInstance } from "axios";
import axiosInstance from "@lib/axios.client";

export interface Kickoff {
  contracts_id: number;
  mda: string;
  final_risk_management_plan: any;
  final_post_award_plan: any;
  signed_contract_document: any;
  uploaded_copy: any;
  other_documents: any;
  // fec_extract: any;
  // nitda: any;
  // fcas_generated_certification: any;
}

export interface CreateKickoff {
  contracts_id: number;
  mda: string;
  final_risk_management_plan: any;
  final_post_award_plan: any;
  signed_contract_document: any;
  other_documents: any;
  // fec_extract: any;
  // nitda: any;
  // fcas_generated_certification: any;
}

export interface EditKickoff {
  id: number;
  contracts_id: number;
  mda?: string;
  final_risk_management_plan?: any;
  final_post_award_plan?: any;
  signed_contract_document?: any;
  uploaded_copy?: any;
  other_documents?: any;
  // fec_extract: any;
  // nitda: any;
  // fcas_generated_certification: any;
}

interface IKickoff {
  create: (data: CreateKickoff) => Promise<void>;
  readAll: () => Promise<Kickoff>;
  readAllByMda: (mda: any) => Promise<Kickoff>;
  readAllByUserId: (id: any) => Promise<Kickoff>;
  readSingle: (id: any) => Promise<Kickoff>;
  readByReviewer: (id: any) => Promise<Kickoff>;
  update: (payload: EditKickoff) => Promise<void>;
}

export function KickoffRepository(axios: AxiosInstance): IKickoff {
  return {
    create: async (data: CreateKickoff) =>
      await axios.post("/contracts/create_kick_off.php", data),
    readAll: async () =>
      await axios.get(`/contracts/get_all_registered_contract_kickoff.php`),
    readAllByMda: async (mda: any) =>
      await axios.get(
        `/contracts/get_all_registered_contract_kickoff.php?mda=${mda}`
      ),
    readAllByUserId: async (id: any) =>
      await axios.get(
        `/contracts/get_all_registered_contract_kickoff.php?users_id=${id}`
      ),
    readSingle: async (id: any) =>
      await axios.get(`contracts/get_kick_off_single.php?contracts_id=${id}`),
    readByReviewer: async (id: any) =>
      await axios.get(
        `/contracts/get_all_registered_contract_kickoff.php?reviewer_id=${id}`
      ),
    update: async (payload: EditKickoff) =>
      await axios.post(`/contracts/edit_kick_off.php`, payload),
  };
}

export default KickoffRepository(axiosInstance);
