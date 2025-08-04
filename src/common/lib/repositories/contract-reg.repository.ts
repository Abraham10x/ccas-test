import { AxiosInstance } from "axios";
import axiosInstance from "../axios.client";

export interface ContractReg {
  users_id: any;
  early_notifications_id: any;
  title: any;
  bpp: any;
  typology: any;
  contractor_type: any;
  amount_mtb: any;
  mda: any;
  vat: any;
  withholding_tax: any;
  advance_payment: any;
  scope: any;
  duration: any;
  location: any;
  mdax1_name: any;
  mdax1_phone: any;
  mdax1_email: any;
  mdax1_position: any;
  mdax1_department: any;
  mdax2_name: any;
  mdax2_phone: any;
  mdax2_email: any;
  mdax2_position: any;
  mdax2_department: any;
  mda_lfp_name: any;
  mda_lfp_phone: any;
  mda_lfp_email: any;
  mda_lfp_position: any;
  mda_lfp_department: any;
  ct_type: any;
  ct_name: any;
  ct_cac_reg_number: any;
  ct_web: any;
  ct_office_address: any;
  ct_phone: any;
  ct_email: any;
  ct_taxid: any;
  ct_project_office: any;
  ct_rep_name: any;
  ct_rep_address: any;
  ct_rep_phone: any;
  ct_rep_email: any;
  ct_rep_nin: any;
  ct_rep1_name: any;
  ct_rep1_address: any;
  ct_rep1_phone: any;
  ct_rep1_email: any;
  ct_rep1_nin: any;
  ct_rep1_position: any;
  ct_rep2_name: any;
  ct_rep2_address: any;
  ct_rep2_phone: any;
  ct_rep2_email: any;
  ct_rep2_nin: any;
  ct_rep2_position: any;
  draft_contract_upload: any;
  draft_pacap_upload: any;
  draft_rmp_upload: any;
  cac_reg_upload: any;
  ni_rep_upload: any;
  ni_rep1_upload: any;
  other_uploads: any;
  bpp_no_objection: any;
  letter_of_award: any;
  nitda: any;
  letter_of_acceptance: any;
  icrc: any;
  // fec_extract: any;
}

export interface EditContractReg {
  id: any;
  status: any;
  mda: any;
  users_id: any;
  early_notifications_id: any;
  title: any;
  bpp: any;
  typology: any;
  contractor_type: any;
  amount_mtb: any;
  vat: any;
  withholding_tax: any;
  advance_payment: any;
  scope: any;
  duration: any;
  location: any;
  mdax1_name: any;
  mdax1_phone: any;
  mdax1_email: any;
  mdax1_position: any;
  mdax1_department: any;
  mdax2_name: any;
  mdax2_phone: any;
  mdax2_email: any;
  mdax2_position: any;
  mdax2_department: any;
  mda_lfp_name: any;
  mda_lfp_phone: any;
  mda_lfp_email: any;
  mda_lfp_position: any;
  mda_lfp_department: any;
  ct_type: any;
  ct_name: any;
  ct_cac_reg_number: any;
  ct_web: any;
  ct_office_address: any;
  ct_phone: any;
  ct_email: any;
  ct_taxid: any;
  ct_project_office: any;
  ct_rep_name: any;
  ct_rep_address: any;
  ct_rep_phone: any;
  ct_rep_email: any;
  ct_rep_nin: any;
  ct_rep1_name: any;
  ct_rep1_address: any;
  ct_rep1_phone: any;
  ct_rep1_email: any;
  ct_rep1_nin: any;
  ct_rep1_position: any;
  ct_rep2_name: any;
  ct_rep2_address: any;
  ct_rep2_phone: any;
  ct_rep2_email: any;
  ct_rep2_nin: any;
  ct_rep2_position: any;
  draft_contract_upload: any;
  draft_pacap_upload: any;
  draft_rmp_upload: any;
  cac_reg_upload: any;
  ni_rep_upload: any;
  ni_rep1_upload: any;
  other_uploads: any;
  bpp_no_objection: any;
  letter_of_award: any;
  nitda: any;
  letter_of_acceptance: any;
  icrc: any;
  // fec_extract: any;
}

export interface BPP {
  title: string;
}

export interface Typology {
  title: string;
}
interface IContractReg {
  create: (contract: ContractReg) => Promise<void>;
  readAll: () => Promise<ContractReg>;
  readSingle: (id: any) => Promise<ContractReg>;
  readByUserId: (id: any) => Promise<ContractReg>;
  readByReviewer: (id: any) => Promise<ContractReg>;
  readByMda: (mda: any) => Promise<ContractReg>;
  update: (payload: any) => Promise<EditContractReg>;
  readBpp: () => Promise<BPP>;
  readTypology: (id: any) => Promise<Typology>;
}

export function ContractRegRepository(axios: AxiosInstance): IContractReg {
  return {
    create: async (contract: ContractReg) =>
      await axios.post("/contracts/create_register_contract.php", contract),
    readAll: async () =>
      await axios.get("/contracts/get_all_registered_contract.php"),
    readSingle: async (id: any) =>
      await axios.get(`/contracts/get_registered_contract.php?id=${id}`),
    readByUserId: async (id: any) =>
      await axios.get(
        `/contracts/get_all_registered_contract.php?users_id=${id}`
      ),
    readByMda: async (mda: any) =>
      await axios.get(`/contracts/get_all_registered_contract.php?mda=${mda}`),
    readByReviewer: async (id: any) =>
      await axios.get(
        `/contracts/get_all_registered_contract.php?reviewer_id=${id}`
      ),
    update: async (payload: EditContractReg) =>
      await axios.post("/contracts/edit_registered_contract.php", payload),
    readBpp: async () => await axios.get("/contracts/get_bpp.php"),
    readTypology: async (id: any) =>
      await axios.get(`/contracts/get_topology.php?bpp_id=${id}`),
  };
}

export default ContractRegRepository(axiosInstance);
