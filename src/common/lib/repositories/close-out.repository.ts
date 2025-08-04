import { AxiosInstance } from "axios";
import axiosInstance from "../axios.client";

export interface CloseOut {
  contracts_id: any;
  contract_title: any;
  mda: any;
  contract_term: any;
  contract_scope: any;
  start_date: any;
  end_date: any;
  users_id: any;
  contractors_name: any;
  contractor_company_address: any;
  contractor_phone: any;
  contractor_email: any;
  contractor_representatives: any;
  initial_period: any;
  actual_period: any;
}

interface ICloseOut {
  create: (closeout: CloseOut) => Promise<void>;
  readAll: () => Promise<CloseOut>;
  readById: (id: any) => Promise<CloseOut>;
  readByMda: (mda: any) => Promise<CloseOut>;
  readByReviewer: (id: any) => Promise<CloseOut>;
  readSingle: (id: any) => Promise<CloseOut>;
}

export function CloseOutRepository(axios: AxiosInstance): ICloseOut {
  return {
    create: async (closeout: CloseOut) =>
      await axios.post("/contracts/create_close_out.php", closeout),
    readAll: async () => await axios.get("/contracts/get_close_out.php"),
    readById: async (id: any) =>
      await axios.get(`/contracts/get_close_out.php?users_id=${id}`),
    readSingle: async (id: any) =>
      await axios.get(`/contracts/edit_close_out.php?close_out_id=${id}`),
    readByMda: async (mda: any) =>
      await axios.get(`/contracts/get_close_out.php?mda=${mda}`),
    readByReviewer: async (id: any) =>
      await axios.get(`/contracts/get_close_out.php?reviewer_id=${id}`),
  };
}

export default CloseOutRepository(axiosInstance);
