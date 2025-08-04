import { AxiosInstance } from "axios";
import axiosInstance from "../axios.client";

export interface Milestone {
  performance_indicator: any;
  milestone: any;
  due_date: any;
  mda: any;
  contracts_id: any;
  users_id: any;
}

export interface CompleteMilestone {
  id: any;
  performance_indicator: any;
  evidence: any;
  users_id: any;
  performance_comment: any;
}

interface IMilestone {
  create: (milestone: Milestone) => Promise<void>;
  readByContractId: (id: any) => Promise<Milestone>;
  readSingle: (id: any) => Promise<Milestone>;
  readByMda: (mda: any) => Promise<Milestone>;
  update: (id: any) => Promise<CompleteMilestone>;
}

export function MonitoringRepository(axios: AxiosInstance): IMilestone {
  return {
    create: async (milestone: Milestone) =>
      await axios.post("/contracts/create_monitoring_stage.php", milestone),
    readByContractId: async (id: any) =>
      await axios.get(
        `/contracts/get_all_monitoring_stage.php?contracts_id=${id}`
      ),
    readSingle: async (id: any) =>
      await axios.get(
        `/contracts/get_single_contract_status.php?statud_id=${id}`
      ),
    readByMda: async (mda: any) =>
      await axios.get(`/contracts/get_all_monitoring_stage.php?mda=${mda}`),
    update: async (milestone: CompleteMilestone) =>
      await axios.post("/contracts/complete_monitoring_stage.php", milestone),
  };
}

export default MonitoringRepository(axiosInstance);
