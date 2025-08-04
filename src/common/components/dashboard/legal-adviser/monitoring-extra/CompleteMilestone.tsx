/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "@components/application/Modal";
import BaseFormInput, {
  LinearProgressWithLabel,
} from "../../../application/base/form/BaseFormInput";
import { Button, SubmitButton } from "../../../application/base/Button";
import { errorParser, retrieveToken } from "@lib/helper";
// import superAdminQueries from "@lib/queries/superadmin";
import { Toaster } from "react-hot-toast";
import monitorQueries from "@lib/queries/monitoring";
import useUpload from "@lib/hooks/useUpload";
// import { useRouter } from "next/router";
import { Box } from "@mui/material";
interface IProps {
  id: any;
  show: any;
  setShow: any;
}

const CompleteMilestone: FC<IProps> = ({ id, show, setShow }: IProps) => {
  // const [payload] = useState(defaultPayload);
  // const [showModal, setShowModal] = useState(show);

  // const router = useRouter();
  const userId = retrieveToken("userId");
  const { mutate } = monitorQueries.update();
  const [attach, setAttach] = useState<any>();
  const { data, uploaded, upload, progress, uploadFile } = useUpload();

  // const handleModal = () => {
  //   setShowModal(() => !showModal)
  // };

  const defaultPayload = {
    // eslint-disable-next-line object-shorthand
    id: id,
    performance_indicator: "Completed",
    users_id: Number(userId),
    evidence: attach?.file_url ?? "",
    performance_comment: "",
  };

  const schema = Yup.object({
    id: Yup.string(),
    performance_indicator: Yup.string(),
    users_id: Yup.number(),
    evidence: Yup.string(),
    performance_comment: Yup.string().required("Required"),
  });

  const onSubmit = async (values: {
    id: any;
    performance_indicator: string;
    users_id: any;
    evidence: any;
    performance_comment: any;
  }) => {
    // handle form submission here
    values.evidence = defaultPayload.evidence;
    mutate(values);
    setShow(false);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Modal
        label="Comment on KPI"
        showModal={show}
        onClose={() => {
          setShow(false);
        }}
      >
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
              const { handleSubmit, values, errors, touched, handleChange } =
                formik;
              return (
                <div className="px-6 py-4">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-y-2">
                      <BaseFormInput
                        label="Comments on performance"
                        name="performance_comment"
                        type="textarea"
                        value={values.performance_comment}
                        onChange={handleChange}
                        error={errorParser(
                          errors,
                          touched,
                          "performance_comment"
                        )}
                      />
                      <BaseFormInput
                        label="Reports/evidence-based"
                        name="evidence"
                        type="file"
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
                          if (event.currentTarget.files) {
                            // setFile(event.currentTarget.files[0]);
                            // eslint-disable-next-line @typescript-eslint/no-floating-promises
                            const fileData = await uploadFile(event, 1);
                            setAttach(fileData);
                          }
                        }}
                        error={errorParser(errors, touched, "evidence")}
                      />
                    </div>
                    <div className="flex justify-start items-center gap-x-5 py-5 border-t">
                      <SubmitButton
                        type="submit"
                        className="bg-green text-white "
                      >
                        Add Comment
                      </SubmitButton>
                      <Button
                        className="border-[1px] border-outline-gray"
                        onClick={() => {
                          setShow(false);
                        }}
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

export default CompleteMilestone;
