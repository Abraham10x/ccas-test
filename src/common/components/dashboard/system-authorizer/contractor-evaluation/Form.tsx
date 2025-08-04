/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import BaseFormInput from "../../../application/base/form/BaseFormInput";
import { Button, SubmitButton } from "../../../application/base/Button";
import { errorParser, retrieveToken } from "@lib/helper";
import { Toaster } from "react-hot-toast";
import BaseFormSelect from "@components/application/base/form/BaseFormSelect";
import authQueries from "@lib/queries/auth";
import contractorEvalQueries from "@lib/queries/contractor-evaluation";
// import Modal from "@components/application/Modal";
// import { ContractorEvaluation } from "@lib/repositories/contractor-evaluation";
interface IProps {
  next?: any;
  back?: any;
  step: any;
}

const EvaluateContractorForm: FC<IProps> = ({ next, back, step }: IProps) => {
  const userId = retrieveToken("userId");
  const contractTitle = retrieveToken("contractTitle");
  const startDate = retrieveToken("startDate");
  const endDate = retrieveToken("endDate");
  const contractID = retrieveToken("contractID");

  const user = authQueries.getUser(userId);
  const { mutate } = contractorEvalQueries.create();

  const defaultPayload = {
    users_id: userId ?? "",
    evaluated_by: userId ?? "",
    contracts_id: contractID ?? "",
    evaluator_name: "",
    evaluator_phone: "",
    evaluator_designation: "",
    evaluator_email: "",
    contract_title: contractTitle ?? "",
    general_comments: "",
    start_date: startDate ?? "",
    end_date: endDate ?? "",
    proper_oversight: "",
    proper_oversight_comment: "",
    billing_accuracy: "",
    billing_accuracy_comment: "",
    timely_notice: "",
    timely_notice_comment: "",
    knowledge_work: "",
    knowledge_work_comment: "",
    qualified_staff: "",
    qualified_staff_comment: "",
    subcontractors_payment: "",
    subcontractors_payment_comment: "",
    mitigated_change: "",
    mitigated_change_comment: "",
    change_order_proposals: "",
    change_order_proposals_comment: "",
    intial_schedule: "",
    intial_schedule_comment: "",
    schedule_updates: "",
    schedule_updates_comment: "",
    maintained_adherence: "",
    maintained_adherence_comment: "",
    timely_completion: "",
    timely_completion_comment: "",
    directives_response: "",
    directives_response_comment: "",
    cordination: "",
    cordination_comment: "",
    terms_compliance: "",
    terms_compliance_comment: "",
    state_collaboration: "",
    state_collaboration_comment: "",
    work_with_cost: "",
    work_with_cost_comment: "",
    adherence_to_plans: "",
    adherence_to_plans_comment: "",
    safety_requirements: "",
    safety_requirements_comment: "",
    hsse_violations: "",
    hsse_violations_comment: "",
    site_cleanliness: "",
    site_cleanliness_comment: "",
    quality_work: "",
    quality_work_comment: "",
    contractor_provided: "",
    contractor_provided_comment: "",
    reinspection_required: "",
    reinspection_required_comment: "",
    substantial_completion: "",
    substantial_completion_comment: "",
    execution_site: "",
    execution_site_comment: "",
    comminsioning_equipment: "",
    comminsioning_equipment_comment: "",
    project_closed: "",
    project_closed_comment: "",
    contractor_closeout: "",
    contractor_closeout_comment: "",
    compiled_satutory: "",
    compiled_satutory_comment: "",
    labor_violations: "",
    labor_violations_comment: "",
    contract_compliance: "",
    contract_compliance_comment: "",
    set_aside_requirements: "",
    set_aside_requirements_comment: "",
  };

  const schema = Yup.object({
    users_id: Yup.string(),
    evaluated_by: Yup.string(),
    contract_title: Yup.string(),
    contracts_id: Yup.string(),
    evaluator_name: Yup.string(),
    evaluator_phone: Yup.string(),
    evaluator_designation: Yup.string(),
    evaluator_email: Yup.string(),
    general_comments: Yup.string(),
    start_date: Yup.string(),
    end_date: Yup.string(),
    proper_oversight: Yup.string(),
    proper_oversight_comment: Yup.string(),
    billing_accuracy: Yup.string(),
    billing_accuracy_comment: Yup.string(),
    timely_notice: Yup.string(),
    timely_notice_comment: Yup.string(),
    knowledge_work: Yup.string(),
    knowledge_work_comment: Yup.string(),
    qualified_staff: Yup.string(),
    qualified_staff_comment: Yup.string(),
    subcontractors_payment: Yup.string(),
    subcontractors_payment_comment: Yup.string(),
    mitigated_change: Yup.string(),
    mitigated_change_comment: Yup.string(),
    change_order_proposals: Yup.string(),
    change_order_proposals_comment: Yup.string(),
    intial_schedule: Yup.string(),
    intial_schedule_comment: Yup.string(),
    schedule_updates: Yup.string(),
    schedule_updates_comment: Yup.string(),
    maintained_adherence: Yup.string(),
    maintained_adherence_comment: Yup.string(),
    timely_completion: Yup.string(),
    timely_completion_comment: Yup.string(),
    directives_response: Yup.string(),
    directives_response_comment: Yup.string(),
    cordination: Yup.string(),
    cordination_comment: Yup.string(),
    terms_compliance: Yup.string(),
    terms_compliance_comment: Yup.string(),
    state_collaboration: Yup.string(),
    state_collaboration_comment: Yup.string(),
    work_with_cost: Yup.string(),
    work_with_cost_comment: Yup.string(),
    adherence_to_plans: Yup.string(),
    adherence_to_plans_comment: Yup.string(),
    safety_requirements: Yup.string(),
    safety_requirements_comment: Yup.string(),
    hsse_violations: Yup.string(),
    hsse_violations_comment: Yup.string(),
    site_cleanliness: Yup.string(),
    site_cleanliness_comment: Yup.string(),
    quality_work: Yup.string(),
    quality_work_comment: Yup.string(),
    contractor_provided: Yup.string(),
    contractor_provided_comment: Yup.string(),
    reinspection_required: Yup.string(),
    reinspection_required_comment: Yup.string(),
    substantial_completion: Yup.string(),
    substantial_completion_comment: Yup.string(),
    execution_site: Yup.string(),
    execution_site_comment: Yup.string(),
    comminsioning_equipment: Yup.string(),
    comminsioning_equipment_comment: Yup.string(),
    project_closed: Yup.string(),
    project_closed_comment: Yup.string(),
    contractor_closeout: Yup.string(),
    contractor_closeout_comment: Yup.string(),
    compiled_satutory: Yup.string(),
    compiled_satutory_comment: Yup.string(),
    labor_violations: Yup.string(),
    labor_violations_comment: Yup.string(),
    contract_compliance: Yup.string(),
    contract_compliance_comment: Yup.string(),
    set_aside_requirements: Yup.string(),
    set_aside_requirements_comment: Yup.string(),
  });

  const onSubmit = async (values: {
    users_id: any;
    evaluated_by: any;
    contracts_id: any;
    contract_title: any;
    evaluator_name: any;
    evaluator_phone: any;
    evaluator_designation: any;
    evaluator_email: any;
    general_comments: any;
    start_date: any;
    end_date: any;
    proper_oversight: any;
    proper_oversight_comment: any;
    billing_accuracy: any;
    billing_accuracy_comment: any;
    timely_notice: any;
    timely_notice_comment: any;
    knowledge_work: any;
    knowledge_work_comment: any;
    qualified_staff: any;
    qualified_staff_comment: any;
    subcontractors_payment: any;
    subcontractors_payment_comment: any;
    mitigated_change: any;
    mitigated_change_comment: any;
    change_order_proposals: any;
    change_order_proposals_comment: any;
    intial_schedule: any;
    intial_schedule_comment: any;
    schedule_updates: any;
    schedule_updates_comment: any;
    maintained_adherence: any;
    maintained_adherence_comment: any;
    timely_completion: any;
    timely_completion_comment: any;
    directives_response: any;
    directives_response_comment: any;
    cordination: any;
    cordination_comment: any;
    terms_compliance: any;
    terms_compliance_comment: any;
    state_collaboration: any;
    state_collaboration_comment: any;
    work_with_cost: any;
    work_with_cost_comment: any;
    adherence_to_plans: any;
    adherence_to_plans_comment: any;
    safety_requirements: any;
    safety_requirements_comment: any;
    hsse_violations: any;
    hsse_violations_comment: any;
    site_cleanliness: any;
    site_cleanliness_comment: any;
    quality_work: any;
    quality_work_comment: any;
    contractor_provided: any;
    contractor_provided_comment: any;
    reinspection_required: any;
    reinspection_required_comment: any;
    substantial_completion: any;
    substantial_completion_comment: any;
    execution_site: any;
    execution_site_comment: any;
    comminsioning_equipment: any;
    comminsioning_equipment_comment: any;
    project_closed: any;
    project_closed_comment: any;
    contractor_closeout: any;
    contractor_closeout_comment: any;
    compiled_satutory: any;
    compiled_satutory_comment: any;
    labor_violations: any;
    labor_violations_comment: any;
    contract_compliance: any;
    contract_compliance_comment: any;
    set_aside_requirements: any;
    set_aside_requirements_comment: any;
  }) => {
    // handle form submission here
    mutate(values);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {/* <Modal
        label="Add Comment"
        showModal={showModal}
        onClose={() => setShowModal(false)}
      >
        <div className="">
          <Formik
            initialValues={defaultPayload}
            validationSchema={schema}
            onSubmit={async (values, { resetForm }) => {
              addComment(values);
              resetForm();
            }}
          >
            {(formik) => {
              const { handleSubmit, values, errors, touched, handleChange } =
                formik;
              return (
                <div className="px-6 py-4">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-y-2">
                      <BaseFormInput
                        label={`Comment on ${commentOn}`}
                        name={`${commentOn ?? ""}`}
                        value={values[`${commentOn}`]}
                        type="textarea"
                        onChange={handleChange}
                        error={errorParser(errors, touched, `${commentOn}`)}
                      />
                    </div>
                    <div className="flex justify-start items-center gap-x-5 py-5 border-t">
                      <SubmitButton
                        type="button"
                        className="bg-green text-white "
                      >
                        Add Comment
                      </SubmitButton>
                      <Button
                        className="border-[1px] border-outline-gray"
                        onClick={handleModal}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              );
            }}
          </Formik>
        </div>
      </Modal> */}
      <div className="">
        <Formik
          initialValues={defaultPayload}
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
            await onSubmit(values);
            resetForm();
          }}
        >
          {(formik) => {
            const {
              handleSubmit,
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
            } = formik;
            return (
              <div className="py-4">
                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <>
                      <h1 className="font-bold mt-12">Contractor Evaluator</h1>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 mt-6">
                        <BaseFormInput
                          type="text"
                          label="Name of Evaluator"
                          name=""
                          value={user.data?.user_details?.fullname}
                          onChange={handleChange}
                          // error={errorParser(errors, touched, "evaluator_name")}
                          disabled
                        />
                        <BaseFormInput
                          type="text"
                          label="Evaluator Phone Number"
                          name=""
                          value={user.data?.user_details?.phone}
                          onChange={handleChange}
                          // error={errorParser(
                          //   errors,
                          //   touched,
                          //   "evaluator_phone"
                          // )}
                          disabled
                        />
                        <BaseFormInput
                          type="email"
                          label="Evaluator Designation/Position"
                          name=""
                          value={user.data?.user_details?.role}
                          onChange={handleChange}
                          // error={errorParser(
                          //   errors,
                          //   touched,
                          //   "evaluator_position"
                          // )}
                          disabled
                        />
                        <BaseFormInput
                          type="email"
                          label="Evaluator Email Address"
                          name=""
                          value={user.data?.user_details?.email}
                          onChange={handleChange}
                          // error={errorParser(
                          //   errors,
                          //   touched,
                          //   "evaluator_email"
                          // )}
                          disabled
                        />
                        <BaseFormInput
                          type="date"
                          label="Start Date"
                          name="start_date"
                          value={values.start_date}
                          onChange={handleChange}
                          error={errorParser(errors, touched, "start_date")}
                          disabled
                        />
                        <BaseFormInput
                          type="date"
                          label="End Date"
                          name="end_date"
                          value={values.end_date}
                          onChange={handleChange}
                          error={errorParser(errors, touched, "end_date")}
                          disabled
                        />
                        <BaseFormInput
                          type="textarea"
                          label="General Comments"
                          name="general_comments"
                          value={values.general_comments}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "general_comments"
                          )}
                        />
                      </div>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <h1 className="font-bold mt-12">Project Management</h1>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 mt-6">
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Provided proper oversight of the project"
                          name="proper_oversight"
                          value={values.proper_oversight}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "proper_oversight"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on proper oversight`}
                          name="proper_oversight_comment"
                          type="textarea"
                          value={`${values.proper_oversight_comment}`}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "proper_oversight_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Billings were complete and accurate"
                          name="billing_accuracy"
                          value={values.billing_accuracy}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "billing_accuracy"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on billing accuracy`}
                          name="billing_accuracy_comment"
                          type="textarea"
                          value={`${values.billing_accuracy_comment}`}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "billing_accuracy_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Provided timely notice, prior to incurrence, of extra costs"
                          name="timely_notice"
                          value={values.timely_notice}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(errors, touched, "timely_notice")}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on timely notice`}
                          name="timely_notice_comment"
                          type="textarea"
                          value={`${values.timely_notice_comment}`}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "timely_notice_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Knowledge of the Work performed"
                          name="knowledge_work"
                          value={values.knowledge_work}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(errors, touched, "knowledge_work")}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on knowledge work`}
                          name="knowledge_work_comment"
                          type="textarea"
                          value={`${values.knowledge_work_comment}`}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "knowledge_work_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Provided adequate, experienced, qualified staff"
                          name="qualified_staff"
                          value={values.qualified_staff}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "qualified_staff"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on qualified staff`}
                          name="qualified_staff_comment"
                          type="textarea"
                          value={`${values.qualified_staff_comment}`}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "qualified_staff_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Payment was made to subcontractors in accordance with contract terms"
                          name="subcontractors_payment"
                          value={values.subcontractors_payment}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "subcontractors_payment"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on subcontractors payment`}
                          name="subcontractors_payment_comment"
                          type="textarea"
                          value={values.subcontractors_payment_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "subcontractors_payment_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Mitigated Change Order work wherever possible"
                          name="mitigated_change"
                          value={values.mitigated_change}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "mitigated_change"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on mitigated change`}
                          name="mitigated_change_comment"
                          type="textarea"
                          value={values.mitigated_change_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "mitigated_change_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Change Order Proposals submitted were within contract time period and the proposed costs were not excessive"
                          name="change_order_proposals"
                          value={values.change_order_proposals}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "change_order_proposals"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on change order proposals`}
                          name="change_order_proposals_comment"
                          type="textarea"
                          value={values.change_order_proposals_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "change_order_proposals_comment"
                          )}
                        />
                      </div>
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <h1 className="font-bold mt-12">Scheduling</h1>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 mt-6">
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Contractor's initial schedules approved pursuant to contract documents"
                          name="intial_schedule"
                          value={values.intial_schedule}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "intial_schedule"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on initial schedule`}
                          name="intial_schedule_comment"
                          type="textarea"
                          value={values.intial_schedule_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "intial_schedule_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Scheduling updates were proper, adequate, and submitted on time per contract"
                          name="schedule_updates"
                          value={values.schedule_updates}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "schedule_updates"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on schedule updates`}
                          name="schedule_updates_comment"
                          type="textarea"
                          value={values.schedule_updates_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "schedule_updates_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Maintained adherence to all schedules"
                          name="maintained_adherence"
                          value={values.maintained_adherence}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "maintained_adherence"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on maintained adherence`}
                          name="maintained_adherence_comment"
                          type="textarea"
                          value={values.maintained_adherence_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "maintained_adherence_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Project completed on time as defined by the contract"
                          name="timely_completion"
                          value={values.timely_completion}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "timely_completion"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on timely completion`}
                          name="timely_completion_comment"
                          type="textarea"
                          value={values.timely_completion_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "timely_completion_comment"
                          )}
                        />
                      </div>
                    </>
                  )}
                  {step === 4 && (
                    <>
                      <h1 className="font-bold mt-12">Perfomance</h1>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 mt-6">
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Responded to directives in accordance with contract terms"
                          name="directives_response"
                          value={values.directives_response}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "directives_response"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on directives response`}
                          name="directives_response_comment"
                          type="textarea"
                          value={values.directives_response_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "directives_response_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Approval of Coordination/Shop Drawings Comments received prior to starting that work (If applicable)"
                          name="cordination"
                          value={values.cordination}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(errors, touched, "cordination")}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on cordination`}
                          name="cordination_comment"
                          type="textarea"
                          value={values.cordination_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "cordination_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Contractor complied with all contract terms"
                          name="terms_compliance"
                          value={values.terms_compliance}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "terms_compliance"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on terms complaince`}
                          name="terms_compliance_comment"
                          type="textarea"
                          value={values.terms_compliance_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "terms_compliance_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Contractor collaborated with the State and all other parties of interest"
                          name="state_collaboration"
                          value={values.state_collaboration}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "state_collaboration"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on state collaboration`}
                          name="state_collaboration_comment"
                          type="textarea"
                          value={values.state_collaboration_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "state_collaboration_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Ability to work within the contract's alloted costs"
                          name="work_with_cost"
                          value={values.work_with_cost}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(errors, touched, "work_with_cost")}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on contract allocated cost`}
                          name="work_with_cost_comment"
                          type="textarea"
                          value={values.work_with_cost_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "work_with_cost_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Adherence to Plans and Specifications"
                          name="adherence_to_plans"
                          value={values.adherence_to_plans}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "adherence_to_plans"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on plans and specifications`}
                          name="adherence_to_plans_comment"
                          type="textarea"
                          value={values.adherence_to_plans_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "adherence_to_plans_comment"
                          )}
                        />
                      </div>
                    </>
                  )}
                  {step === 5 && (
                    <>
                      <h1 className="font-bold mt-12">Safety</h1>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 mt-6">
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Complied with Safety Requirements in accordance with the contract"
                          name="safety_requirements"
                          value={values.safety_requirements}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "safety_requirements"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on safety requirements`}
                          name="safety_requirements_comment"
                          type="textarea"
                          value={values.safety_requirements_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "safety_requirements_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Had no HSSE violations on this project"
                          name="hsse_violations"
                          value={values.hsse_violations}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "hsse_violations"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on HSSE violations`}
                          name="hsse_violations_comment"
                          type="textarea"
                          value={values.hsse_violations_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "hsse_violations_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Project site cleanliness maintained per contract documents"
                          name="site_cleanliness"
                          value={values.site_cleanliness}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "site_cleanliness"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on site cleanliness`}
                          name="site_cleanliness_comment"
                          type="textarea"
                          value={values.site_cleanliness_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "site_cleanliness_comment"
                          )}
                        />
                      </div>
                    </>
                  )}
                  {step === 6 && (
                    <>
                      <h1 className="font-bold mt-12">Project Operations</h1>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 mt-6">
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Quality of the Work performed"
                          name="quality_work"
                          value={values.quality_work}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(errors, touched, "quality_work")}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on quality of work performed`}
                          name="quality_work_comment"
                          type="textarea"
                          value={values.quality_work_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "quality_work_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Contractor provided adequate materials and equipment to perform the Work"
                          name="contractor_provided"
                          value={values.contractor_provided}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "contractor_provided"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on provided adequate materials`}
                          name="contractor_provided_comment"
                          type="textarea"
                          value={values.contractor_provided_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "contractor_provided_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="No more than one reinspection required to correct unsatisfactory work"
                          name="reinspection_required"
                          value={values.reinspection_required}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "reinspection_required"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on reinspection required`}
                          name="reinspection_required_comment"
                          type="textarea"
                          value={values.reinspection_required_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "reinspection_required_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Substantial Completion granted upon initial inspection"
                          name="substantial_completion"
                          value={values.substantial_completion}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "substantial_completion"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on substantial completion`}
                          name="substantial_completion_comment"
                          type="textarea"
                          value={values.substantial_completion_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "substantial_completion_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Execution of site logistics"
                          name="execution_site"
                          value={values.execution_site}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(errors, touched, "execution_site")}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on execution of site logistics`}
                          name="execution_site_comment"
                          type="textarea"
                          value={values.execution_site_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "execution_site_comment"
                          )}
                        />
                      </div>
                    </>
                  )}
                  {step === 7 && (
                    <>
                      <h1 className="font-bold mt-12">Project Closeout</h1>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 mt-6">
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Commissioning and equipment start-up accomplished pursuant to contract"
                          name="comminsioning_equipment"
                          value={values.comminsioning_equipment}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "comminsioning_equipment"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on commissioning and equipment start-up`}
                          name="comminsioning_equipment_comment"
                          type="textarea"
                          value={values.comminsioning_equipment_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "comminsioning_equipment_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Project closed out in accordance with the contract conditions"
                          name="project_closed"
                          value={values.project_closed}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(errors, touched, "project_closed")}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on project closed`}
                          name="project_closed_comment"
                          type="textarea"
                          value={values.project_closed_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "project_closed_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Contractor's Close-Out Package delivered to the Consultant within the contractually specified time"
                          name="contractor_closeout"
                          value={values.contractor_closeout}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "contractor_closeout"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on contractor closeout`}
                          name="contractor_closeout_comment"
                          type="textarea"
                          value={values.contractor_closeout_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "contractor_closeout_comment"
                          )}
                        />
                      </div>
                    </>
                  )}
                  {step === 8 && (
                    <>
                      <h1 className="font-bold mt-12">Compliance</h1>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 mt-6">
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Complied with statutory and regulatory requirements, including environmental compliance"
                          name="compiled_satutory"
                          value={values.compiled_satutory}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "compiled_satutory"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on compiled statutory`}
                          name="compiled_satutory_comment"
                          type="textarea"
                          value={values.compiled_satutory_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "compiled_satutory_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Had no Labor Law violations on this project"
                          name="labor_violations"
                          value={values.labor_violations}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "labor_violations"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on labor law violations`}
                          name="labor_violations_comment"
                          type="textarea"
                          value={values.labor_violations_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "labor_violations_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Met Contract compliance requirements"
                          name="contract_compliance"
                          value={values.contract_compliance}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "contract_compliance"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on contract compliance`}
                          name="contract_compliance_comment"
                          type="textarea"
                          value={values.contract_compliance_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "contract_compliance_comment"
                          )}
                        />
                        <BaseFormSelect
                          data={[
                            "Exceptional",
                            "Very Good",
                            "Satisfactory",
                            "Marginal",
                            "Unsatisfactory",
                          ]}
                          label="Met Set-aside Requirements"
                          name="set_aside_requirements"
                          value={values.set_aside_requirements}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "set_aside_requirements"
                          )}
                        />
                        <BaseFormInput
                          label={`Reasons for unsatisfactory on set-aside requirements`}
                          name="set_aside_requirements_comment"
                          type="textarea"
                          value={values.set_aside_requirements_comment}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "set_aside_requirements_comment"
                          )}
                        />
                      </div>
                    </>
                  )}
                  <div className="flex flex-row gap-10 mt-10 mb-10 justify-start align-middle w-full">
                    {step <= 7 && (
                      <div className="my-auto">
                        <Button
                          className="relative w-fit flex flex-row justify-center btn-shadow bg-green py-3 px-5 rounded-lg text-white text-sm font-semibold hover:bg-green/80 transition-all"
                          onClick={() => {
                            next();
                          }}
                        >
                          Save & Continue
                        </Button>
                      </div>
                    )}

                    {step === 8 && (
                      <div className="my-auto">
                        <SubmitButton
                          type="submit"
                          className="relative w-fit flex flex-row justify-center btn-shadow bg-green py-3 px-5 rounded-lg text-white text-sm font-semibold hover:bg-green/80 transition-all"
                        >
                          <p className="my-auto">Submit</p>
                        </SubmitButton>
                      </div>
                    )}
                    {step > 1 && (
                      <div className="my-auto">
                        <Button
                          type="submit"
                          className="relative w-fit flex flex-row justify-center border border-gray-500 py-3 px-5 rounded-lg text-black text-sm font-semibold hover:bg-gray-100 transition-all"
                          onClick={back}
                        >
                          <p className="my-auto">Back</p>
                        </Button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default EvaluateContractorForm;
