/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import BaseFormInput, {
  LinearProgressWithLabel,
} from "@components/application/base/form/BaseFormInput";
import { Button, SubmitButton } from "@components/application/base/Button";
import { Box } from "@mui/material";
import Modal from "@components/application/Modal";
import certificateQueries from "@lib/queries/certificate-print";
import useUpload from "@lib/hooks/useUpload";
import toast from "react-hot-toast";
interface IProps {
  showModal?: boolean;
  setShowModal: any;
  ID: number;
  stage: string;
}

const SignedCertificateForm: FC<IProps> = ({
  showModal,
  setShowModal,
  ID,
  stage,
}: IProps) => {
  const { data, uploaded, upload, progress, uploadFile } = useUpload();
  const [attach, setAttach] = useState<any>();

  const { mutate } = certificateQueries.reuploadCertificate();

  const defaultPayload = {
    form_id: ID,
    uploaded_copy: attach ?? "",
    contract_stage: stage,
  };

  const onSubmit = async (values: {
    form_id: number;
    uploaded_copy: any;
    contract_stage: string;
  }) => {
    // handle form submission here
    values.uploaded_copy = defaultPayload.uploaded_copy;
    mutate(values);
    setShowModal(false);
  };

  const schema = Yup.object({
    uploaded_copy: Yup.string(),
  });

  return (
    <Modal
      label="Upload Signed eFCAS Certificate"
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
            if (values.uploaded_copy) {
              await onSubmit(values);
              resetForm();
            } else {
              toast.error("Kindly upload eFCAS certificate first!");
            }
          }}
        >
          {(formik) => {
            const { handleSubmit } = formik;
            return (
              <div>
                <div className="p-4 overflow-y-auto pb-6 px-4 w-full">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-x-6">
                      <BaseFormInput
                        type="file"
                        label="Signed eFCAS Certificate"
                        id="uploaded_copy"
                        name="uploaded_copy"
                        value={""}
                        isUploaded={
                          data?.message === "success" &&
                          data?.file_url !== null &&
                          uploaded === 1 ? (
                            <p style={{ color: "green" }}>Uploaded! ✅</p>
                          ) : (
                            ""
                          )
                        }
                        progressValue={
                          upload === 1 ? (
                            <Box sx={{ width: "100%" }}>
                              <LinearProgressWithLabel
                                color="success"
                                value={progress}
                              />
                            </Box>
                          ) : (
                            <></>
                          )
                        }
                        onChange={async (
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          if (event.currentTarget.files != null) {
                            // setFile(event.currentTarget.files[0]);
                            // eslint-disable-next-line @typescript-eslint/no-floating-promises
                            const fileData = await uploadFile(event, 1);
                            setAttach(fileData.file_url);
                          }
                        }}
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

export default SignedCertificateForm;
