import { AxiosInstance } from "axios";
import axiosInstance from "../axios.client";

export interface ContractorEvaluation {
  users_id: string;
  evaluated_by: string;
  contracts_id: string;
  contract_title: string;
  evaluator_name: any;
  evaluator_phone: any;
  evaluator_designation: any;
  evaluator_email: any;
  general_comments: string;
  start_date: string;
  end_date: string;
  proper_oversight: string;
  proper_oversight_comment: string;
  billing_accuracy: string;
  billing_accuracy_comment: string;
  timely_notice: string;
  timely_notice_comment: string;
  knowledge_work: string;
  knowledge_work_comment: string;
  qualified_staff: string;
  qualified_staff_comment: string;
  subcontractors_payment: string;
  subcontractors_payment_comment: string;
  mitigated_change: string;
  mitigated_change_comment: string;
  change_order_proposals: string;
  change_order_proposals_comment: string;
  intial_schedule: string;
  intial_schedule_comment: string;
  schedule_updates: string;
  schedule_updates_comment: string;
  maintained_adherence: string;
  maintained_adherence_comment: string;
  timely_completion: string;
  timely_completion_comment: string;
  directives_response: string;
  directives_response_comment: string;
  cordination: string;
  cordination_comment: string;
  terms_compliance: string;
  terms_compliance_comment: string;
  state_collaboration: string;
  state_collaboration_comment: string;
  work_with_cost: string;
  work_with_cost_comment: string;
  adherence_to_plans: string;
  adherence_to_plans_comment: string;
  safety_requirements: string;
  safety_requirements_comment: string;
  hsse_violations: string;
  hsse_violations_comment: string;
  site_cleanliness: string;
  site_cleanliness_comment: string;
  quality_work: string;
  quality_work_comment: string;
  contractor_provided: string;
  contractor_provided_comment: string;
  reinspection_required: string;
  reinspection_required_comment: string;
  substantial_completion: string;
  substantial_completion_comment: string;
  execution_site: string;
  execution_site_comment: string;
  comminsioning_equipment: string;
  comminsioning_equipment_comment: string;
  project_closed: string;
  project_closed_comment: string;
  contractor_closeout: string;
  contractor_closeout_comment: string;
  compiled_satutory: string;
  compiled_satutory_comment: string;
  labor_violations: string;
  labor_violations_comment: string;
  contract_compliance: string;
  contract_compliance_comment: string;
  set_aside_requirements: string;
  set_aside_requirements_comment: string;
}

interface IContractorEval {
  create: (payload: ContractorEvaluation) => Promise<void>;
  read: (title: any) => Promise<ContractorEvaluation>;
}

export function ContractorEvaluationRepository(axios: AxiosInstance): IContractorEval {
  return {
    create: async (payload: ContractorEvaluation) =>
      await axios.post("/contracts/contractors_evaluation.php", payload),
    read: async (id: any) =>
      await axios.get(`/contracts/get_contract_evaluation.php?contracts_id=${id}`),
  };
}

export default ContractorEvaluationRepository(axiosInstance);
