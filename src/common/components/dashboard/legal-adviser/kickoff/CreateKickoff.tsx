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
import contractRegQueries from "@lib/queries/contract-reg";
import kickoffQueries from "@lib/queries/kickoff";
import useUpload from "@lib/hooks/useUpload";
import Box from "@mui/material/Box";
import BaseFormSelectSearch from "@components/application/base/form/BaseFormSelectSearch";
interface IProps {
  id?: any;
}

const CreateKickoff: FC<IProps> = ({ id }: IProps) => {
  // const [payload] = useState(defaultPayload);
  const [showModal, setShowModal] = useState(false);
  const { data, uploaded, upload, progress, uploadFile } = useUpload();
  const [attach, setAttach] = useState<any>();
  const [attach1, setAttach1] = useState<any>();
  const [attach2, setAttach2] = useState<any>();
  const [attach3, setAttach3] = useState<any>();
  const [attach4, setAttach4] = useState<any>();
  const { mutate } = kickoffQueries.create();
  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  const userId = retrieveToken("userId");
  const userType = retrieveToken("userType");
  const mda = retrieveToken("mda");
  const response = contractRegQueries.readByUserId(userId);

  const contracts =
    response?.data?.data?.contracts === undefined
      ? []
      : response?.data?.data?.contracts;

  // splits contract title and its ID into separate arrays
  const getContractTitles = () => {
    const contractArray: any[] = [];
    contracts.forEach((item: any) => {
      contractArray.push({ id: item.id, title: item.title });
    });
    return { contractArray };
  };

  const { contractArray } = getContractTitles();

  // merge both contract titles and its ID from separate array into one single object as key: value pairs
  const arrangeValue = () => {
    const optionArr: any[] = [];
    contractArray.map((data) =>
      optionArr.push({ value: data.id, label: data.title })
    );
    return optionArr;
  };

  const optionArr = arrangeValue();

  // use the contract title value from select field to get its ID from the key: value object above
  // const pushTitle = (e: any) => {
  //   const ID = mergedObject[e.target.value];
  //   setContractID(ID);
  // };

  const defaultPayload = {
    users_id: userId,
    contracts_id: attach ?? "",
    mda: mda ?? "",
    final_risk_management_plan: attach1 ?? "",
    final_post_award_plan: attach2 ?? "",
    signed_contract_document: attach3 ?? "",
    other_documents: attach4 ?? "",
    // fec_extract: attach3 ?? "",
    // nitda: attach4 ?? "",
  };

  const schema = Yup.object({
    contracts_id: Yup.string(),
    mda: Yup.string().required("Required"),
    final_risk_management_plan: Yup.string(),
    final_post_award_plan: Yup.string(),
    signed_contract_document: Yup.string(),
    other_documents: Yup.string(),
    // fec_extract: Yup.string().required("Required"),
    // nitda: Yup.string(),
  });

  const onSubmit = async (values: {
    users_id: any;
    contracts_id: any;
    mda: string;
    final_risk_management_plan: any;
    final_post_award_plan: any;
    signed_contract_document: any;
    other_documents: any;
    // fec_extract: any;
    // nitda: any;
  }) => {
    // handle form submission here
    values.final_risk_management_plan =
      defaultPayload.final_risk_management_plan;
    values.final_post_award_plan = defaultPayload.final_post_award_plan;
    values.signed_contract_document = defaultPayload.signed_contract_document;
    values.other_documents = defaultPayload.other_documents;
    // values.fec_extract = defaultPayload.fec_extract;
    // values.nitda = defaultPayload.nitda;
    mutate(values);
    handleModal();
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      {userType === "Legal Adviser" || userType === "Procurement" ? (
        <Button
          className="bg-green text-white flex flex-row my-auto gap-x-2 w-fit sm:gap-x-4 py-5"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <IoMdAdd className="h-5 w-5" />
          <p>Create Kickoff</p>
        </Button>
      ) : (
        ""
      )}

      <Modal
        label="Create Kickoff"
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
                setFieldValue,
              } = formik;
              return (
                <div className="px-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-5">
                      <BaseFormSelectSearch
                        instanceId={"select-contract"}
                        placeholder="Select Contract"
                        label="Contract"
                        options={optionArr}
                        value={values.contracts_id}
                        onBlur={handleBlur}
                        onChange={(value: any) => {
                          setFieldValue("contracts_id", value.value);
                          setAttach(value.value);
                        }}
                        error={errorParser(errors, touched, "contracts_id")}
                      />
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
                        label="Other Document"
                        id="other_documents"
                        name="other_documents"
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
                        data-hs-overlay={`#${id}`}
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
