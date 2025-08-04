/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "@components/application/Modal";
import BaseFormInput from "../../../application/base/form/BaseFormInput";
import { Button, SubmitButton } from "../../../application/base/Button";
import { errorParser } from "@lib/helper";
import BaseFormCheckBox from "@components/application/base/form/BaseFormCheckBox";
import roleQueries from "@lib/queries/role";
import { Toaster } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";

interface IProps {
  id?: any;
}

const defaultPayload = {
  title: "",
  usermanagement: false,
  request_new_user: false,
  early_notifications: false,
  early_notifications_write: false,
  early_notifications_approve: false,
  upload_contracts: false,
  view_contracts: false,
  contract_approve: false,
  monitoring_stage_write: false,
  monitoring_stage_approve: false,
  view_monitoring_stage: false,
  legal_adviser_auth: false,
  forms_management: false,
  close_out_write: false,
  close_out_read: false,
  close_out_approve: false,
};

const AddRoleModal: FC<IProps> = ({ id }: IProps) => {
  const { mutate } = roleQueries.createRole();
  const [payload] = useState(defaultPayload);
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  function camelize(text: string) {
    return text.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize the first letter of each word
  }

  const schema = Yup.object({
    title: Yup.string().required("Required"),
    usermanagement: Yup.boolean(),
    request_new_user: Yup.boolean(),
    early_notifications: Yup.boolean(),
    early_notifications_write: Yup.boolean(),
    early_notifications_approve: Yup.boolean(),
    upload_contracts: Yup.boolean(),
    view_contracts: Yup.boolean(),
    contract_approve: Yup.boolean(),
    monitoring_stage_write: Yup.boolean(),
    monitoring_stage_approve: Yup.boolean(),
    view_monitoring_stage: Yup.boolean(),
    legal_adviser_auth: Yup.boolean(),
    forms_management: Yup.boolean(),
    close_out_write: Yup.boolean(),
    close_out_read: Yup.boolean(),
    close_out_approve: Yup.boolean(),
  });

  const onSubmit = async (values: {
    title: string;
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
  }) => {
    // handle form submission here
    mutate(values);
    handleModal();
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Button
        className="bg-green w-fit text-white flex items-center gap-x-2 sm:gap-x-4"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <IoMdAdd className="h-5 w-5" />
        <p>Add Role</p>
      </Button>
      <Modal
        label="Add a Role"
        showModal={showModal}
        onClose={() => setShowModal(false)}
      >
        <div>
          <Formik
            enableReinitialize
            initialValues={payload}
            validationSchema={schema}
            onSubmit={async (values, { resetForm }) => {
              await onSubmit(values);
              resetForm();
            }}
          >
            {(formik) => {
              const { handleSubmit, values, errors, touched, handleChange } =
                formik;
              return (
                <div className="px-6 py-4">
                  <form onSubmit={handleSubmit}>
                    <div
                      className="grid grid-cols-1 gap-y-6 overflow-y-scroll"
                      style={{ height: "500px" }}
                    >
                      <BaseFormInput
                        label="Role Title"
                        name="title"
                        value={values.title}
                        onChange={(e: any) => {
                          const copyE = { ...e };
                          copyE.target.value = camelize(copyE.target.value);
                          handleChange(e);
                        }}
                        error={errorParser(errors, touched, "title")}
                      />
                      <div className="flex flex-col">
                        <BaseFormCheckBox
                          label="User Management"
                          name="usermanagement"
                          value={values.usermanagement}
                          onChange={handleChange}
                          checked={values.usermanagement}
                        />
                        <BaseFormCheckBox
                          label="Request User"
                          name="request_new_user"
                          value={values.request_new_user}
                          onChange={handleChange}
                          checked={values.request_new_user}
                        />
                        <BaseFormCheckBox
                          label="Early Notification"
                          name="early_notifications"
                          value={values.early_notifications}
                          onChange={handleChange}
                          checked={values.early_notifications}
                        />
                        <BaseFormCheckBox
                          label="Early Notification Write"
                          name="early_notifications_write"
                          value={values.early_notifications_write}
                          onChange={handleChange}
                          checked={values.early_notifications_write}
                        />
                        <BaseFormCheckBox
                          label="Early Notification Approve"
                          name="early_notifications_approve"
                          value={values.early_notifications_approve}
                          onChange={handleChange}
                          checked={values.early_notifications_approve}
                        />
                        <BaseFormCheckBox
                          label="Upload Contracts"
                          name="upload_contracts"
                          value={values.upload_contracts}
                          onChange={handleChange}
                          checked={values.upload_contracts}
                        />
                        <BaseFormCheckBox
                          label="View Contracts"
                          name="view_contracts"
                          value={values.view_contracts}
                          onChange={handleChange}
                          checked={values.view_contracts}
                        />
                        <BaseFormCheckBox
                          label="Approve Contract"
                          name="contract_approve"
                          value={values.contract_approve}
                          onChange={handleChange}
                          checked={values.contract_approve}
                        />
                        <BaseFormCheckBox
                          label="Monitoring stage Write"
                          name="monitoring_stage_write"
                          value={values.monitoring_stage_write}
                          onChange={handleChange}
                          checked={values.monitoring_stage_write}
                        />
                        <BaseFormCheckBox
                          label="Monitoring stage Approve"
                          name="monitoring_stage_approve"
                          value={values.monitoring_stage_approve}
                          onChange={handleChange}
                          checked={values.monitoring_stage_approve}
                        />
                        <BaseFormCheckBox
                          label="View monitoring stage form"
                          name="view_monitoring_stage"
                          value={values.view_monitoring_stage}
                          onChange={handleChange}
                          checked={values.view_monitoring_stage}
                        />
                        <BaseFormCheckBox
                          label="Legal adviser auth"
                          name="legal_adviser_auth"
                          value={values.legal_adviser_auth}
                          onChange={handleChange}
                          checked={values.legal_adviser_auth}
                        />
                        <BaseFormCheckBox
                          label="Forms management"
                          name="forms_management"
                          value={values.forms_management}
                          onChange={handleChange}
                          checked={values.forms_management}
                        />
                        <BaseFormCheckBox
                          label="Close Out Write"
                          name="close_out_write"
                          value={values.close_out_write}
                          onChange={handleChange}
                          checked={values.close_out_write}
                        />
                        <BaseFormCheckBox
                          label="Close Out Read"
                          name="close_out_read"
                          value={values.close_out_read}
                          onChange={handleChange}
                          checked={values.close_out_read}
                        />
                        <BaseFormCheckBox
                          label="Close Out Approve"
                          name="close_out_approve"
                          value={values.close_out_approve}
                          onChange={handleChange}
                          checked={values.close_out_approve}
                        />
                      </div>
                    </div>
                    <div className="flex justify-start items-center gap-x-5 py-5 border-t">
                      <SubmitButton
                        data-hs-overlay={`#${id}`}
                        type="submit"
                        className="bg-green text-white "
                      >
                        Add Role
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
      </Modal>
    </>
  );
};

export default AddRoleModal;
