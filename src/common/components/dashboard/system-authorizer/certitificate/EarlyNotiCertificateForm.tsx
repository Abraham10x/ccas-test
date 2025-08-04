/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import BaseFormInput from "@components/application/base/form/BaseFormInput";
import { Button, SubmitButton } from "@components/application/base/Button";
import certificateQueries from "@lib/queries/certificate-print";
import { errorParser, retrieveToken } from "@lib/helper";
import Modal from "@components/application/Modal";
interface IProps {
  showModal?: boolean;
  setShowModal: any;
  user: any;
}

const EarlyNotiCertificateForm: FC<IProps> = ({
  showModal,
  setShowModal,
  user,
}: IProps) => {
  const earlyID = retrieveToken("earlyID");

  const { mutate } = certificateQueries.createEarlyCertificate();

  const defaultPayload = {
    signature: user.data?.user_details?.fullname ?? "",
    name_of_approver: "",
    early_id: earlyID ?? "",
  };

  const onSubmit = async (values: {
    signature: string;
    name_of_approver: string;
    early_id: number;
  }) => {
    // handle form submission here
    mutate(values);
    setShowModal(false);
  };

  const schema = Yup.object({
    signature: Yup.string(),
    name_of_approver: Yup.string().required("Required"),
    early_id: Yup.number().required("Required"),
  });

  return (
    <Modal
      label="eFCAS APPROVAL TO PROCEED TO FEC"
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
                      <BaseFormInput
                        type="text"
                        label="Name of Approver"
                        name="name_of_approver"
                        value={values.name_of_approver}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "name_of_approver")}
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
      </div>
    </Modal>
  );
};

export default EarlyNotiCertificateForm;
