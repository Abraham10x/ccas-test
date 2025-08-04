/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "@components/application/Modal";
import BaseFormInput, {
  LinearProgressWithLabel,
} from "../../../application/base/form/BaseFormInput";
import { SubmitButton } from "../../../application/base/Button";
import { errorParser } from "@lib/helper";
import { Toaster } from "react-hot-toast";
import useUpload from "@lib/hooks/useUpload";
import Box from "@mui/material/Box";
import requestQueries from "@lib/queries/requests";

interface IProps {
  id?: any;
  status?: any;
  stage?: any;
  showModal: any;
}

const UploadCopyModal: FC<IProps> = ({
  id,
  status,
  stage,
  showModal,
}: IProps) => {
  const { data, uploaded, upload, progress, uploadFile } = useUpload();
  const [attach, setAttach] = useState<any>();
  const { mutate } = requestQueries.handleCopyUpload();

  const defaultPayload = {
    notifications_id: id,
    status: status,
    contract_stage: stage,
    final_comment: "",
    signed_copy: attach ?? "",
  };

  const schema = Yup.object({
    final_comment: Yup.string().required("Required"),
    signed_copy: Yup.string(),
  });

  const onSubmit = async (values: {
    notifications_id: number;
    status: string;
    contract_stage: string;
    final_comment: string;
    signed_copy: any;
  }) => {
    // handle form submission here
    values.signed_copy = defaultPayload.signed_copy;
    mutate(values);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Modal label="Upload Signed Copy" showModal={showModal}>
        <div className="">
          <Formik
            // enableReinitialize
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
                <div className="px-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-2 mt-5 w-full">
                      <BaseFormInput
                        type="text"
                        label="Final Comment"
                        name="final_comment"
                        value={values.final_comment}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "final_comment")}
                      />
                      <BaseFormInput
                        type="file"
                        label="Signed Copy"
                        id="signed_copy"
                        name="signed_copy"
                        value={""}
                        isUploaded={
                          data?.message === "success" &&
                          data?.file_url &&
                          uploaded === 1 ? (
                            <p style={{ color: "green" }}>Uploaded! ✅</p>
                          ) : (
                            ""
                          )
                        }
                        progressValue={
                          upload === 1 && progress ? (
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
                            setAttach(fileData?.file_url);
                          }
                        }}
                      />
                    </div>
                    <div className="flex justify-start flex-col sm:flex-row gap-x-5 gap-y-3 py-5 mt-5 border-t">
                      <SubmitButton
                        type="submit"
                        className="bg-green text-white "
                      >
                        Submit
                      </SubmitButton>
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

export default UploadCopyModal;
