/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import BaseFormInput, {
  LinearProgressWithLabel,
} from "@components/application/base/form/BaseFormInput";
import { Button, SubmitButton } from "@components/application/base/Button";
import earlyQueries from "@lib/queries/early-notification";
import contractRegQueries from "@lib/queries/contract-reg";
import {
  errorParser,
  formatNumberWithCommas,
  parseFormattedNumber,
  retrieveToken,
} from "@lib/helper";
import useUpload from "@lib/hooks/useUpload";
import { Box } from "@mui/material";
import BaseFormSelectSearch from "@components/application/base/form/BaseFormSelectSearch";
import toast from "react-hot-toast";
// import { NumericFormat } from "react-number-format";
interface IProps {
  id?: any;
}

const NotificationForm: FC<IProps> = ({ id }: IProps) => {
  const [isAddendum, setIsAddendum] = useState(false);
  const { data, uploaded, upload, progress, uploadFile } = useUpload();
  const [attach, setAttach] = useState<any>();
  const [attach1, setAttach1] = useState<any>();
  const [attach2, setAttach2] = useState<any>();
  const [attach3, setAttach3] = useState<any>();
  const [contractId, setContractId] = useState();
  const userId = retrieveToken("userId");
  const mdas = retrieveToken("mda");

  const { mutate } = earlyQueries.create();

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

  const defaultPayload = {
    users_id: Number(userId),
    contract_id: contractId ?? "",
    title: "",
    mda: mdas,
    analog: "",
    details: "",
    lesson: "",
    file: attach ?? "",
    contract_value: "",
    funding_source: "",
    user_department: "",
    proposed_contract: "",
    need_assessment: attach1 ?? "",
    feasibility_study: attach2 ?? "",
    appropriation_document: attach3 ?? "",
  };

  const handleAnalog = (e: any) => {
    if (e.target.value === "Addendum") {
      setIsAddendum(true);
    } else {
      setIsAddendum(false);
    }
  };

  const onSubmit = async (
    values: {
      users_id: number;
      contract_id: string;
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
    },
    resetForm: any
  ) => {
    // handle form submission here
    values.file = defaultPayload.file;
    values.need_assessment = defaultPayload.need_assessment;
    values.feasibility_study = defaultPayload.feasibility_study;
    values.appropriation_document = defaultPayload.appropriation_document;
    mutate(values);

    // handleModal()
    resetForm();
  };

  const schema = Yup.object({
    users_id: Yup.number(),
    contract_id: Yup.string(),
    mda: Yup.string(),
    title: Yup.string(),
    analogue: Yup.string(),
    details: Yup.string().required("Required"),
    lesson: Yup.string(),
    file: Yup.string(),
    contract_value: Yup.number().required("Required"),
    funding_source: Yup.string().required("Required"),
    user_department: Yup.string().required("Required"),
    proposed_contract: Yup.string(),
    need_assessment: Yup.string(),
    feasibility_study: Yup.string(),
    appropriation_document: Yup.string(),
  });

  return (
    <div
      id={id}
      className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
    >
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-3xl lg:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center justify-center">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl py-3 w-full">
          <div className="flex justify-between items-center py-3 px-4 sm:px-10 border-b">
            <h3 className="font-bold text-gray-900 text-xl">
              Add Notification Form
            </h3>
            <button
              type="button"
              className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm"
              data-hs-overlay={`#${id}`}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3.5 h-3.5"
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div>
            <Formik
              // enableReinitialize
              initialValues={defaultPayload}
              validationSchema={schema}
              onSubmit={async (values, { resetForm }) => {
                if (defaultPayload.need_assessment) {
                  await onSubmit(values, resetForm);
                } else {
                  toast.error("Kindly fill needs assestment first!");
                }
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
                  setFieldValue,
                } = formik;
                return (
                  <div>
                    <div className="p-4 overflow-y-auto pb-6 px-4 sm:px-10 w-full">
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                          {isAddendum ? (
                            <BaseFormSelectSearch
                              instanceId={"select-contract"}
                              placeholder="Select Contract"
                              label="Proposed Contract Title"
                              options={optionArr}
                              value={values.contract_id}
                              onBlur={handleBlur}
                              onChange={(value: any) => {
                                setFieldValue("contract_id", value.value);
                                setContractId(value.value);
                              }}
                              error={errorParser(
                                errors,
                                touched,
                                "contract_id"
                              )}
                            />
                          ) : (
                            <BaseFormInput
                              type="text"
                              label="Proposed Contract Title"
                              name="title"
                              value={values.title}
                              onChange={handleChange}
                              error={errorParser(errors, touched, "title")}
                            />
                          )}
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
                            value={formatNumberWithCommas(
                              values.contract_value
                            )}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const inputValue = e.target.value;

                              // Store the formatted display value
                              formatNumberWithCommas(inputValue);

                              // For internal form state, store the numeric value
                              // Only do this if we have a valid number
                              const numericValue =
                                parseFormattedNumber(inputValue);
                              if (
                                !isNaN(numericValue) ||
                                inputValue === "" ||
                                inputValue.endsWith(".")
                              ) {
                                setFieldValue(
                                  "contract_value",
                                  inputValue.endsWith(".")
                                    ? inputValue.replace(/,/g, "")
                                    : numericValue
                                );
                              }
                            }}
                            onBlur={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              // On blur, ensure the value is properly formatted (optional)
                              const value = parseFormattedNumber(
                                e.target.value
                              );
                              setFieldValue("contract_value", value);
                              handleBlur(e);
                            }}
                            error={errorParser(
                              errors,
                              touched,
                              "contract_value"
                            )}
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
                            error={errorParser(
                              errors,
                              touched,
                              "funding_source"
                            )}
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
                          {/* <BaseFormInput
                            type="text"
                            label="Contract Scope"
                            name="proposed_contract"
                            value={values.proposed_contract}
                            onChange={handleChange}
                            error={errorParser(
                              errors,
                              touched,
                              "proposed_contract"
                            )}
                          /> */}
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
                                setAttach1(fileData?.file_url);
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
                                setAttach2(fileData?.file_url);
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
                                setAttach3(fileData?.file_url);
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
                                setAttach(fileData?.file_url);
                              }
                            }}
                          />
                        </div>

                        <div className="flex justify-start items-center gap-x-5 py-5 border-t">
                          <SubmitButton
                            data-hs-overlay={`#${id}`}
                            type="submit"
                            className="py-3 px-8 inline-flex justify-center font-semibold items-center gap-2 rounded-md border border-transparent bg-green text-white hover:bg-green focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 transition-all text-sm btn-shadow"
                          >
                            Add Form
                          </SubmitButton>
                          <Button
                            type="button"
                            className="hs-dropdown-toggle py-3 px-8 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
                            dataOverlay={`#${id}`}
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
        </div>
      </div>
    </div>
  );
};

export default NotificationForm;
