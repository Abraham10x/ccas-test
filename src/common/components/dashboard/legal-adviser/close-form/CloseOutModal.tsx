/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "@components/application/Modal";
import BaseFormInput from "../../../application/base/form/BaseFormInput";
import { Button, SubmitButton } from "../../../application/base/Button";
import {
  errorParser,
  formatNumberWithCommas,
  retrieveToken,
} from "@lib/helper";
import { Toaster } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import BaseFormSelect from "@components/application/base/form/BaseFormSelect";
import contractRegQueries from "@lib/queries/contract-reg";
import closeoutQueries from "@lib/queries/close-out";
import axios from "axios";
interface IProps {
  id?: any;
}

const userId = retrieveToken("userId");
const mda = retrieveToken("mda");

const CloseOutModal: FC<IProps> = ({ id }: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const [contractID, setContractID] = useState<string>();
  const [contractDetails, setContractDetails] = useState<any>();
  const { mutate } = closeoutQueries.create();

  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  const getContractDetails = async (contractID: any) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/get_registered_contract.php?id=${contractID}`;
    const response = await axios.get(url);
    setContractDetails(response?.data?.contract_details);
    return response;
  };

  const response = contractRegQueries.readByUserId(userId);

  const contracts =
    response?.data?.data?.contracts === undefined
      ? []
      : response?.data?.data?.contracts;

  // splits contract title and its ID into separate arrays
  const getContractTitles = () => {
    const titleArray: string[] = [];
    const idArray: string[] = [];
    contracts.forEach((item: any) => {
      // if (item.status ===- 'Approved') {
      titleArray.push(item.title);
      idArray.push(item.id);
      // }
    });
    return { titleArray, idArray };
  };

  const { titleArray, idArray } = getContractTitles();

  // merge both contract titles and its ID from separate array into one single object as key: value pairs
  const mergeArraysToObject = () => {
    const obj = titleArray.reduce((acc: any, key: any, index: number) => {
      acc[key] = idArray[index];
      return acc;
    }, {});

    return obj;
  };

  const mergedObject = mergeArraysToObject();

  // use the contract title value from select field to get its ID from the key: value object above
  const pushTitle = (e: any) => {
    const ID = mergedObject[e.target.value];
    setContractID(ID);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getContractDetails(ID);
  };

  const defaultPayload = {
    users_id: userId,
    contracts_id: contractID ?? "",
    contract_title: "",
    mda: mda ?? "",
    contract_term: "",
    contract_scope: contractDetails?.scope ?? "",
    start_date: "",
    end_date: "",
    contractors_name: contractDetails?.ct_name ?? "",
    contractor_company_address: contractDetails?.ct_office_address ?? "",
    contractor_phone: contractDetails?.ct_phone ?? "",
    contractor_email: contractDetails?.ct_email ?? "",
    contractor_representatives: contractDetails?.ct_rep1_name ?? "",
    initial_period: contractDetails?.duration ?? "",
    actual_period: "",
    initial_amount: contractDetails?.amount_mtb ?? "",
    actual_amount: "",
  };

  const schema = Yup.object({
    users_id: Yup.number(),
    contracts_id: Yup.string(),
    contract_title: Yup.string(),
    mda: Yup.string(),
    contract_term: Yup.string(),
    contract_scope: Yup.string(),
    start_date: Yup.string(),
    end_date: Yup.string(),
    contractors_name: Yup.string(),
    contractor_company_address: Yup.string(),
    contractor_phone: Yup.string(),
    contractor_email: Yup.string(),
    contractor_representatives: Yup.string(),
    initial_period: Yup.string(),
    actual_period: Yup.string(),
    initial_amount: Yup.string(),
    actual_amount: Yup.string(),
  });

  const onSubmit = async (values: {
    contracts_id: any;
    contract_title: any;
    mda: any;
    contract_term: any;
    contract_scope: any;
    start_date: any;
    end_date: any;
    users_id: any;
    contractors_name: any;
    contractor_company_address: any;
    contractor_phone: any;
    contractor_email: any;
    contractor_representatives: any;
    initial_period: any;
    actual_period: any;
    initial_amount: any;
    actual_amount: any;
  }) => {
    // handle form submission here
    mutate(values);
    handleModal();
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Button
        className="bg-green text-white flex items-center gap-x-4"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <IoMdAdd className="h-5 w-5" />
        <p>Add Close-out</p>
      </Button>
      <Modal
        label="Add Close-out Remarks"
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
                <div className="px-6 py-4">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 sm:mt-5">
                      <div className="flex flex-col gap-1">
                        <BaseFormSelect
                          data={titleArray}
                          label="Select contract"
                          name="contract_title"
                          value={values.contract_title}
                          onBlur={handleBlur}
                          onChange={(e: any) => {
                            handleChange(e);
                            pushTitle(e);
                          }}
                          error={errorParser(
                            errors,
                            touched,
                            "contracts_title"
                          )}
                        />
                      </div>
                      <BaseFormInput
                        type="text"
                        label="Contract Scope"
                        name="contract_scope"
                        value={values.contract_scope}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "contract_scope")}
                        disabled
                      />
                      <BaseFormInput
                        type="date"
                        label="Start Date"
                        name="start_date"
                        value={values.start_date}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "start_date")}
                      />
                      <BaseFormInput
                        type="date"
                        label="End Date"
                        name="end_date"
                        value={values.end_date}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "end_date")}
                      />
                      <BaseFormInput
                        type="text"
                        label="Contractors Name"
                        name="contractors_name"
                        value={values.contractors_name}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "contractors_name")}
                        disabled
                      />
                      <BaseFormInput
                        type="text"
                        label="Contractors Company Address"
                        name="contractor_company_address"
                        value={values.contractor_company_address}
                        onChange={handleChange}
                        error={errorParser(
                          errors,
                          touched,
                          "contractor_company_address"
                        )}
                        disabled
                      />
                      <BaseFormInput
                        type="text"
                        label="Contractor Phone"
                        name="contractor_phone"
                        value={values.contractor_phone}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "contractor_phone")}
                        disabled
                      />
                      <BaseFormInput
                        type="text"
                        label="Contractors Email"
                        name="contractor_email"
                        value={values.contractor_email}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "contractor_email")}
                        disabled
                      />
                      <BaseFormInput
                        type="text"
                        label="Contractors Representative"
                        name="contractor_representatives"
                        value={values.contractor_representatives}
                        onChange={handleChange}
                        error={errorParser(
                          errors,
                          touched,
                          "contractor_representatives"
                        )}
                        disabled
                      />
                      <BaseFormInput
                        type="text"
                        label="Initial Duration"
                        name="initial_period"
                        value={values.initial_period}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "initial_period")}
                        disabled
                      />
                      <BaseFormInput
                        type="text"
                        label="Actual Duration"
                        name="actual_period"
                        value={values.actual_period}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "actual_period")}
                      />
                      <BaseFormInput
                        type="text"
                        label="Initial Amount"
                        name="initial_amount"
                        value={formatNumberWithCommas(values.initial_amount)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          // Update with raw numeric value (keeping decimal point)
                          const numericValue = e.target.value.replace(/,/g, "");
                          setFieldValue("initial_amount", numericValue);
                        }}
                        onBlur={handleBlur}
                        error={errorParser(errors, touched, "initial_amount")}
                      />
                      <BaseFormInput
                        type="text"
                        label="Actual Amount"
                        name="actual_amount"
                        value={formatNumberWithCommas(values.actual_amount)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          // Update with raw numeric value (keeping decimal point)
                          const numericValue = e.target.value.replace(/,/g, "");
                          setFieldValue("actual_amount", numericValue);
                        }}
                        onBlur={handleBlur}
                        error={errorParser(errors, touched, "actual_amount")}
                      />
                    </div>
                    <div className="flex justify-start items-center gap-x-5 py-5 border-t">
                      <SubmitButton
                        data-hs-overlay={`#${id}`}
                        type="submit"
                        className="bg-green text-white "
                      >
                        Save
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

export default CloseOutModal;
