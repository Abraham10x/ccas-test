/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import BaseFormInput from "@components/application/base/form/BaseFormInput";
import { Button, SubmitButton } from "@components/application/base/Button";
import certificateQueries from "@lib/queries/certificate-print";
import { errorParser, retrieveToken } from "@lib/helper";
import Modal from "@components/application/Modal";
import BaseFormSelect from "@components/application/base/form/BaseFormSelect";
import GetReviewerData from "./GetReviewerData";
interface IProps {
  showModal?: boolean;
  setShowModal: any;
  user: any;
}

const AuthorizerCertificateForm: FC<IProps> = ({
  showModal,
  setShowModal,
  user,
}: IProps) => {
  const contractID = retrieveToken("contractID");
  const response = certificateQueries.getCertificate(contractID, "Reviewer");
  const data = response?.data?.data === undefined ? {} : response?.data?.data;

  const { mutate } = certificateQueries.createCertificate();

  const defaultPayload = {
    post_award: "",
    risk_management: "",
    draft_contract: "",
    issuance_condition: "",
    signature: user.data?.user_details?.fullname ?? "",
    fmoj_ds: "",
    approver_name: "",
    done_by: "Authorizer",
    done_by_name: user.data?.user_details?.fullname ?? "",
    contracts_id: contractID ?? "",
  };

  const onSubmit = async (values: {
    post_award: string;
    risk_management: string;
    draft_contract: string;
    issuance_condition: string;
    signature: string;
    fmoj_ds: string;
    done_by: string;
    approver_name: string;
    done_by_name: string;
    contracts_id: number;
  }) => {
    // handle form submission here
    mutate(values);
    setShowModal(false);
  };

  const schema = Yup.object({
    post_award: Yup.string().required("Required"),
    risk_management: Yup.string().required("Required"),
    draft_contract: Yup.string().required("Required"),
    issuance_condition: Yup.string(),
    signature: Yup.string(),
    fmoj_ds: Yup.string().required("Required"),
    done_by: Yup.string().required("Required"),
    approver_name: Yup.string().required("Required"),
    done_by_name: Yup.string(),
    contracts_id: Yup.number().required("Required"),
  });

  return (
    <Modal
      label="FCAS Unique Contract Identifier Go-Ahead"
      showModal={showModal}
      onClose={() => {
        setShowModal(false);
      }}
    >
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
            const {
              handleSubmit,
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
            } = formik;
            return (
              <div>
                <div className="p-4 overflow-y-auto pb-6 px-4 w-full">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                      <BaseFormSelect
                        data={["YES", "NO"]}
                        label="Post-Award Contract Implementation plan satisfactory"
                        name="post_award"
                        value={values.post_award}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "post_award")}
                      />
                      <BaseFormSelect
                        data={[
                          "A. that it is adequate to protect the interests of the Government",
                          "B. that it will be adequate if the changes and conditions listed below are effected",
                          "C. The outline contract presents too many sources of exposure to the interests of Government and should not proceed until the conditions below are addressed ",
                        ]}
                        label="FMOJ-DS having reviewed the draft contract"
                        name="fmoj_ds"
                        value={values.fmoj_ds}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "fmoj_ds")}
                      />
                      <BaseFormSelect
                        data={["YES", "NO"]}
                        label="Risks Management satisfactory?"
                        name="risk_management"
                        value={values.risk_management}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "risk_management")}
                      />
                      <BaseFormSelect
                        data={["YES", "NO"]}
                        label="Draft Contract based on FCAS approved"
                        name="draft_contract"
                        value={values.draft_contract}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "draft_contract")}
                      />
                      <BaseFormInput
                        type="text"
                        onBlur={handleBlur}
                        label="CONDITION FOR ISSUANCE(if any):"
                        name="issuance_condition"
                        value={values.issuance_condition}
                        onChange={handleChange}
                        error={errorParser(
                          errors,
                          touched,
                          "issuance_condition"
                        )}
                      />
                      <BaseFormInput
                        type="text"
                        label="Name of Approver"
                        name="approver_name"
                        value={values.approver_name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "approver_name")}
                      />
                      <BaseFormInput
                        disabled={true}
                        type="text"
                        label="Name of FMOJ Authorizer"
                        name="signature"
                        value={values.signature}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "signature")}
                      />
                    </div>
                    <div className="flex justify-start items-center gap-x-5 pt-5 border-t mt-5">
                      <SubmitButton
                        type="submit"
                        className="bg-green text-white"
                      >
                        Submit
                      </SubmitButton>
                      <Button
                        className="border-[1px] border-outline-gray"
                        onClick={() => {
                          setShowModal(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            );
          }}
        </Formik>
        <GetReviewerData data={data} />
      </div>
    </Modal>
  );
};

export default AuthorizerCertificateForm;
