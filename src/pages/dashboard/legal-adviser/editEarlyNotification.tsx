/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import BaseFormInput, {
  LinearProgressWithLabel,
} from "@components/application/base/form/BaseFormInput";
import { Button, SubmitButton } from "@components/application/base/Button";
import earlyQueries from "@lib/queries/early-notification";
import AdviserMenu from "../../../common/lib/dashboard/menu/legal.adviser.menu.json";
import { errorParser, retrieveToken } from "@lib/helper";
import useUpload from "@lib/hooks/useUpload";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import Dashboard from "@components/layouts/Dashboard";
import Seo from "@components/application/Seo";
import Header from "@components/dashboard/Header";
import toast from "react-hot-toast";

const EditNotificationForm: FC = () => {
  const [isAddendum, setIsAddendum] = useState(false);
  const { data, uploaded, upload, progress, uploadFile } = useUpload();
  const [attach, setAttach] = useState<any>();
  const [attach1, setAttach1] = useState<any>();
  const [attach2, setAttach2] = useState<any>();
  const [attach3, setAttach3] = useState<any>();
  const userId = retrieveToken("userId");
  const mdas = retrieveToken("mda");
  const eID = retrieveToken("eID");

  const earlyDetails = earlyQueries.readSingle(eID);
  const earlyData = earlyDetails?.data?.data;
  const router = useRouter();

  const { mutate } = earlyQueries.update();

  const defaultPayload = {
    notifications_id: eID ?? "",
    users_id: Number(userId),
    mda: mdas,
    title: earlyData?.title ?? "",
    analog: earlyData?.analog ?? isAddendum ?? "",
    details: earlyData?.details ?? "",
    lesson: earlyData?.lesson ?? "",
    contract_value: earlyData?.contract_value ?? "",
    funding_source: earlyData?.funding_source ?? "",
    user_department: earlyData?.user_department ?? "",
    proposed_contract: earlyData?.proposed_contract ?? "",
    file: attach ?? earlyData?.file,
    need_assessment: attach1 ?? earlyData?.need_assessment,
    feasibility_study: attach2 ?? earlyData?.feasibility_study,
    appropriation_document: attach3 ?? earlyData?.appropriation_document,
  };

  const handleAnalog = (e: any) => {
    if (e.target.value === "Addendum") {
      setIsAddendum(true);
    } else {
      setIsAddendum(false);
    }
  };

  const onSubmit = async (values: {
    notifications_id: any;
    users_id: number;
    mda: string;
    title: any;
    analog: any;
    details: any;
    lesson: any;
    file: any;
    contract_value: string;
    funding_source: string;
    user_department: string;
    proposed_contract: string;
    need_assessment: any;
    feasibility_study: any;
    appropriation_document: any;
  }) => {
    // handle form submission here
    values.file = defaultPayload.file;
    values.need_assessment = defaultPayload.need_assessment;
    values.feasibility_study = defaultPayload.feasibility_study;
    values.appropriation_document = defaultPayload.appropriation_document;

    mutate(values);
    setTimeout(() => {
      router.back();
    }, 2000);
  };

  const schema = Yup.object({
    notifications_id: Yup.number(),
    users_id: Yup.number(),
    mda: Yup.string(),
    title: Yup.string().required("Required"),
    analogue: Yup.string(),
    details: Yup.string(),
    lesson: Yup.string(),
    file: Yup.string(),
    contract_value: Yup.number().required("Required"),
    funding_source: Yup.string().required("Required"),
    user_department: Yup.string().required("Required"),
    proposed_contract: Yup.string().required("Required"),
    need_assessment: Yup.string(),
    feasibility_study: Yup.string(),
    appropriation_document: Yup.string(),
  });

  return (
    <Dashboard navMenu={AdviserMenu}>
      <Seo templateTitle="Edit Early Notifications" />
      <Header />
      <div className="px-5 sm:px-10 mt-5 sm:mt-10">
        <div className="flex flex-col sm:flex-row gap-5 justify-between my-5 py-5">
          <div>
            <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
              Edit Early Notifications
            </h1>
            <p className="text-sm sm:text-base font-medium text-tx-light-dark">
              Kindly view and/or fill in the early notification form
            </p>
          </div>
          <Button
            onClick={() => {
              router.back();
            }}
            className="bg-green text-white flex items-center gap-x-4 btn-shadow"
          >
            <p>Back</p>
          </Button>
        </div>
        <div className="mt-8">
          <Formik
            enableReinitialize
            initialValues={defaultPayload}
            validationSchema={schema}
            onSubmit={async (values, { resetForm }) => {
              if (defaultPayload.need_assessment) {
                await onSubmit(values);
                resetForm();
              } else {
                toast.error("Kindly fill needs assestment first!");
              }
            }}
          >
            {(formik) => {
              const { handleSubmit, values, touched, errors, handleChange } =
                formik;
              return (
                <div>
                  <div className="overflow-y-auto pb-6 w-full lg:w-4/5">
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                        <BaseFormInput
                          type="text"
                          label="Proposed Contract Title"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                          error={errorParser(errors, touched, "title")}
                        />
                        <label className="mt-4 text-sm block font-bold text-gray-700">
                          Addendum/Novation
                          <select
                            name="analog"
                            style={{ height: "40px" }}
                            className="block w-full rounded-md border-[1px] py-3 px-4 text-sm text-gray-600 bg-gray-100"
                            onChange={(e) => {
                              handleChange(e);
                              handleAnalog(e);
                            }}
                            value={values.analog}
                          >
                            <option>Please select</option>
                            <option value="Addendum">Addendum</option>
                            <option value="Novation">Novation</option>
                            <option value="None">None</option>
                          </select>
                        </label>
                        {/* <BaseFormSelect
                            data={["Yes", "No"]}
                            label="Analogue Contract"
                            name="AnalogueContract"
                            value={values.analogueContract}
                            onChange={handleChange}
                            // error={}
                          /> */}
                        {/* {isAddendum ? (
                            <>
                              <BaseFormInput
                                type="text"
                                label="Lesson Learnt"
                                name="lesson"
                                value={values.lesson}
                                onChange={handleChange}
                                error={errorParser(errors, touched, "lesson")}
                              />
                            </>
                          ) : (
                            ""
                          )} */}
                        <BaseFormInput
                          type="text"
                          label="Proposed Contract Details"
                          name="details"
                          value={values.details}
                          onChange={handleChange}
                          error={errorParser(errors, touched, "details")}
                        />
                        <BaseFormInput
                          type="text"
                          label="Proposed Contract Value"
                          name="contract_value"
                          value={values.contract_value}
                          onChange={handleChange}
                          error={errorParser(errors, touched, "contract_value")}
                        />
                        {/* <div className="w-full mt-3">
                            <label
                              htmlFor="hs-validation-name-error"
                              className="text-sm my-1 block font-bold  text-gray-700"
                            >
                              Contract Value
                            </label>
                            <NumericFormat
                              displayType="input"
                              value={values.contract_value}
                              thousandSeparator={true}
                              customInput={BaseFormInput}
                              prefix={"N"}
                              onValueChange={(e: any) => {
                                // handleChange(e)
                                handleContractValueInput(e)
                              }}
                              className="block w-full rounded-md border-[1px] py-3 px-4 text-sm text-gray-600 bg-gray-100"
                            />
                          </div> */}

                        <BaseFormInput
                          type="text"
                          label="Funding Source"
                          name="funding_source"
                          value={values.funding_source}
                          onChange={handleChange}
                          error={errorParser(errors, touched, "funding_source")}
                        />
                        <BaseFormInput
                          type="text"
                          label="User Department"
                          name="user_department"
                          value={values.user_department}
                          onChange={handleChange}
                          error={errorParser(
                            errors,
                            touched,
                            "user_department"
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 mt-12">
                        <BaseFormInput
                          type="file"
                          label="Needs Assessment/Analysis"
                          id="need_assessment"
                          name="need_assessment"
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
                          label="Feasibility Study"
                          id="feasibility_study"
                          name="feasibility_study"
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
                          label="Appropriation Document"
                          id="appropriation_document"
                          name="appropriation_document"
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
                          label="Other file"
                          id="file"
                          name="file"
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
                              setAttach(fileData.file_url);
                            }
                          }}
                        />
                      </div>

                      <div className="flex justify-start items-center gap-x-5 py-5 border-t">
                        <SubmitButton
                          type="submit"
                          className="bg-green text-white"
                        >
                          Update Form
                        </SubmitButton>
                        <Button
                          className="border-[1px] border-outline-gray"
                          onClick={() => {
                            router.back();
                          }}
                        >
                          Back
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    </Dashboard>
  );
};

export default EditNotificationForm;
