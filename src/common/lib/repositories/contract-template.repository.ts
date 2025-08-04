import { AxiosInstance } from "axios";
import axiosInstance from "@lib/axios.client";

export interface Template {
  title: string;
  description: string;
  file: string;
};

export interface CreateTemplate {
  title: string;
  description: string;
  file: string;
};

interface IContractTemplateRepository {
    createTemplate: (template: CreateTemplate) => Promise<void>;
    getTemplate: () => Promise<Template>;
    getSingleTemplate: (id: any) => Promise<Template>;
    editTemplate: (template: CreateTemplate) => Promise<void>;
};

export function ContractTemplateRepository(axios: AxiosInstance): IContractTemplateRepository {
    return {
      createTemplate: async (template: CreateTemplate) =>
        await axios.post("/contracts/create_contract_template.php", template),
      getTemplate: async () =>
        await axios.get("/contracts/get_all_contract_templates.php"),
      getSingleTemplate: async (id: any) =>
        await axios.post(
          `/contracts/get_contract_template.php?template_id=${id}`
        ),
      editTemplate: async (template: CreateTemplate) =>
        await axios.post("/contracts/edit_contract_template.php", template),
    };
};

export default ContractTemplateRepository(axiosInstance);
