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
import { Toaster } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import kickoffQueries from "@lib/queries/kickoff";
import useUpload from "@lib/hooks/useUpload";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
interface IProps {
  id?: any;
}

const CreateKickoff: FC<IProps> = ({ id }: IProps) => {
  // const [payload] = useState(defaultPayload);
  const [showModal, setShowModal] = useState(false);
  const { data, uploaded, upload, progress, uploadFile } = useUpload();
  const [attach1, setAttach1] = useState<any>();
  const [attach2, setAttach2] = useState<any>();
  const [attach3, setAttach3] = useState<any>();
  const [attach4, setAttach4] = useState<any>();
  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  const kickoffId = retrieveToken("kickoffId");
  const userType = retrieveToken("userType");
  const userId = retrieveToken("userId");
  const router = useRouter();

  const kickoffDetails = kickoffQueries.readSingle(kickoffId);
  const kickoff = kickoffDetails?.data?.data;
  const { mutate } = kickoffQueries.update();

  const defaultPayload = {
    id: kickoff?.id ?? "",
    users_id: userId,
    contracts_id: kickoff?.contracts_id ?? "",
    mda: kickoff?.mda ?? "",
    final_risk_management_plan: attach1 ?? kickoff?.final_risk_management_plan,
    final_post_award_plan: attach2 ?? kickoff?.final_post_award_plan,
    signed_contract_document: attach3 ?? kickoff?.signed_contract_document,
    other_documents: attach4 ?? kickoff?.other_documents,
    // fec_extract: attach3 ?? kickoff?.fec_extract,
    // nitda: attach4 ?? kickoff?.nitda,
  };

  const schema = Yup.object({
    contracts_id: Yup.string(),
    mda: Yup.string(),
  });

  const onSubmit = async (values: {
    id: any;
    users_id: any;
    contracts_id: number;
    mda: string;
    final_risk_management_plan: any;
    final_post_award_plan: any;
    signed_contract_document: any;
    other_documents: any;
    // fec_extract: any;
    // nitda: any;
  }) => {
    // handle form submission here
    mutate(values);
    handleModal();
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      {(userType === "Legal Adviser" || userType === "Procurement") &&
      kickoff?.status === "Reject" ? (
        <Button
          className="bg-green text-white flex flex-row my-auto gap-x-2 w-fit sm:gap-x-4 py-5"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <IoMdAdd className="h-5 w-5" />
          <p>Edit Kickoff</p>
        </Button>
      ) : (
        ""
      )}

      <Modal
        label="Edit Kickoff"
        showModal={showModal}
        onClose={() => setShowModal(false)}
      >
        <div className="">
          <Formik
            enableReinitialize
            initialValues={defaultPayload}
            validationSchema={schema}
            onSubmit={async (values, { resetForm }) => {
              await onSubmit(values);
              resetForm();
              setTimeout(() => {
                router.reload();
              }, 3000);
            }}
          >
            {(formik) => {
              const { handleSubmit, values, errors, touched, handleChange } =
                formik;
              return (
                <div className="px-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-5">
                      <BaseFormInput
                        type="text"
                        label="MDA"
                        disabled={true}
                        name="mda"
                        value={values.mda}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "mda")}
                      />
                      <BaseFormInput
                        type="file"
                        label="Final Risk Management Plan"
                        id="final_risk_management_plan"
                        name="final_risk_management_plan"
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
                            setAttach1(fileData.file_url);
                          }
                        }}
                      />
                      <BaseFormInput
                        type="file"
                        label="Final Post Award Plan"
                        id="final_post_award_plan"
                        name="final_post_award_plan"
                        value={""}
                        isUploaded={
                          data?.message === "success" &&
                          data?.file_url !== null &&
                          uploaded === 2 ? (
                            <p style={{ color: "green" }}>Uploaded! ✅</p>
                          ) : (
                            ""
                          )
                        }
                        progressValue={
                          upload === 2 ? (
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
                            const fileData = await uploadFile(event, 2);
                            setAttach2(fileData.file_url);
                          }
                        }}
                      />
                      <BaseFormInput
                        type="file"
                        label="Signed Contract Document"
                        id="signed_contract_document"
                        name="signed_contract_document"
                        value={""}
                        isUploaded={
                          data?.message === "success" &&
                          data?.file_url !== null &&
                          uploaded === 3 ? (
                            <p style={{ color: "green" }}>Uploaded! ✅</p>
                          ) : (
                            ""
                          )
                        }
                        progressValue={
                          upload === 3 ? (
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
                            const fileData = await uploadFile(event, 3);
                            setAttach3(fileData.file_url);
                          }
                        }}
                      />
                      <BaseFormInput
                        type="file"
                        label="Other Documents"
                        id="other_documentss"
                        name="other_documentss"
                        value={""}
                        isUploaded={
                          data?.message === "success" &&
                          data?.file_url !== null &&
                          uploaded === 4 ? (
                            <p style={{ color: "green" }}>Uploaded! ✅</p>
                          ) : (
                            ""
                          )
                        }
                        progressValue={
                          upload === 4 ? (
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
                            const fileData = await uploadFile(event, 4);
                            setAttach4(fileData.file_url);
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

export default CreateKickoff;
