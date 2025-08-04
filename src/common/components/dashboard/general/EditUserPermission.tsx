/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { SubmitButton } from "@components/application/base/Button";
import { errorParser } from "@lib/helper";
import BaseFormCheckBox from "@components/application/base/form/BaseFormCheckBox";
import authQueries from "@lib/queries/auth";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import BaseFormInput from "@components/application/base/form/BaseFormInput";

const EditUserPermission = () => {
  const { mutate } = authQueries.editPermissions();
  const [permissions, setPermissions] = useState<any>();

  const router = useRouter();
  const query = router.query;
  const uid = query.pid;

  useEffect(() => {
    const timer = setTimeout(() => {
      getUserPermission();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getUserPermission = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/get_user_permission.php?user_id=${uid}`;
    const response = await axios.get(url);
    const data = response?.data?.user_details;
    setPermissions(data);
  };

  const defaultPayload = {
    users_id: Number(uid) ?? "",
    role_title: permissions?.title ?? "",
    usermanagement: permissions?.usermanagement ?? false,
    request_new_user: permissions?.request_new_user ?? false,
    early_notifications: permissions?.early_notifications ?? false,
    early_notifications_write: permissions?.early_notifications_write ?? false,
    early_notifications_approve:
      permissions?.early_notifications_approve ?? false,
    upload_contracts: permissions?.upload_contracts ?? false,
    view_contracts: permissions?.view_contracts ?? false,
    contract_approve: permissions?.contract_approve ?? false,
    monitoring_stage_write: permissions?.monitoring_stage_write ?? false,
    monitoring_stage_approve: permissions?.monitoring_stage_approve ?? false,
    view_monitoring_stage: permissions?.view_monitoring_stage ?? false,
    legal_adviser_auth: permissions?.legal_adviser_auth ?? false,
    forms_management: permissions?.forms_management ?? false,
    close_out_write: permissions?.close_out_write ?? false,
    close_out_read: permissions?.close_out_read ?? false,
    close_out_approve: permissions?.close_out_approve ?? false,
  };

  const schema = Yup.object({
    users_id: Yup.number(),
    role_title: Yup.string().required("Required"),
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
    users_id: any;
    role_title: string;
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
  };

  return (
    <div className="px-5 sm:px-10 mt-5 sm:mt-10">
      <div className="my-5">
        <>
          <Toaster position="top-right" reverseOrder={false} />
          <div>
            <Formik
              enableReinitialize
              initialValues={defaultPayload}
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
                  <div className="py-4">
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1">
                        {/* <div className="flex flex-col"> */}
                        <BaseFormInput
                          label="Role Title"
                          name="title"
                          value={values.role_title}
                          onChange={formik.handleChange}
                          error={errorParser(errors, touched, "title")}
                          disabled
                        />
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
                        {/* </div> */}
                      </div>
                      <div className="flex flex-col sm:flex-row justify-start gap-5 py-5 border-t">
                        <SubmitButton
                          type="submit"
                          className="bg-green text-white "
                        >
                          Update Permissions
                        </SubmitButton>
                      </div>
                    </form>
                  </div>
                );
              }}
            </Formik>
          </div>
        </>
      </div>
    </div>
  );
};

export default EditUserPermission;
