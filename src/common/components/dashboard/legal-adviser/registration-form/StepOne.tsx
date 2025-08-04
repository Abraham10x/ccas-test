/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { FC, useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import BaseFormInput, {
  LinearProgressWithLabel,
} from "../../../application/base/form/BaseFormInput";
import BaseFormSelect from "../../../application/base/form/BaseFormSelect";
import { Button, SubmitButton } from "../../../application/base/Button";
import {
  errorParser,
  storeToken,
  retrieveToken,
  formatNumberWithCommas,
} from "@lib/helper";
import contractRegQueries from "@lib/queries/contract-reg";
// import earlyQueries from "@lib/queries/early-notification";
import axios from "axios";
import useUpload from "@lib/hooks/useUpload";
import { toast } from "react-hot-toast";
import { Box } from "@mui/material";
interface IProps {
  next?: any;
  back?: any;
  step: any;
}

// retrieve data from localstorage
const contractRegData = retrieveToken("contract_reg_form");
const userId = retrieveToken("userId");
const userType = retrieveToken("userType");
const mda = retrieveToken("mda");

const StepOne: FC<IProps> = ({ next, back, step }: IProps) => {
  const { mutate } = contractRegQueries.create();
  // const earlyByMda = earlyQueries.readAllByUserId(userId);

  const [inputValueObject] = useState<any>({});
  const [notifications, setNotifications] = useState<any>([]);
  const [bppArray, setBppArray] = useState<any[]>([]);
  const [typologyTitle, setTypologyTitle] = useState<any[]>([]);
  const [attach1, setAttach1] = useState<any>();
  const [attach2, setAttach2] = useState<any>();
  const [attach3, setAttach3] = useState<any>();
  const [attach4, setAttach4] = useState<any>();
  const [attach5, setAttach5] = useState<any>();
  const [attach6, setAttach6] = useState<any>();
  const [attach7, setAttach7] = useState<any>();
  const [attach8, setAttach8] = useState<any>();
  const [attach9, setAttach9] = useState<any>();
  const [attach10, setAttach10] = useState<any>();
  const [attach11, setAttach11] = useState<any>();
  const [attach12, setAttach12] = useState<any>();
  const [attach13, setAttach13] = useState<any>();
  const [event, setEvent] = useState();

  const { data, uploaded, upload, progress, uploadFile } = useUpload();

  useEffect(() => {
    const getContract = async () => {
      const url =
        userType === "Procurement"
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/get_all_early_notifications_approve.php?mda=${mda}`
          : `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/get_all_early_notifications_approve.php?users_id=${userId}`;
      const res = await axios.get(url);
      setNotifications(res?.data?.notifications);
    };

    getContract();
  }, []);

  // splits contract title and its ID into separate arrays
  const getContractTitles = () => {
    const titleArray: string[] = [];
    const idArray: string[] = [];
    notifications.forEach((item: any) => {
      if (item.status === "Approved") {
        titleArray.push(item.request_form);
        idArray.push(item.id);
      }
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
    // setEvent(e.target.value);
    const title = e.target.value;
    const ID = mergedObject[title];
    setEvent(ID);
    // storeToken("earlyIDD", ID);
    return ID;
    // storeToken("earlyIDD", ID);
    // const earlyIDD = retrieveToken("earlyIDD");
  };

  // const earlyID = Object.values(mergedObject)[0];
  // const eID = event ?? earlyID;

  // puts every name and value from input field into an object as key: value pairs
  const pushData = (e: any) => {
    inputValueObject[e.target.name] = e.target.value;
  };

  // store the input name and value from input fields as key: value pairs to localStorage
  const handleSaveToLocal = () => {
    storeToken("contract_reg_form", inputValueObject);
  };

  // fetch bpp data from API on page load then store in state variable
  useEffect(() => {
    const getBppData = async () => {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/get_bpp.php`
      );
      setBppArray(data?.data?.bpp);
    };
    getBppData();
  }, []);

  // split BPP categories and its corresponding ID into separate arrays
  const getBpp = () => {
    const bppCategories: string[] = [];
    const bppId: string[] = [];
    bppArray.forEach((item: any) => {
      bppCategories.push(item.title);
      bppId.push(item.id);
    });
    return { bppCategories, bppId };
  };

  const { bppCategories, bppId } = getBpp();

  // merge both separate array values as key: value pairs object
  const mergeBppToID = () => {
    const obj = bppCategories.reduce((acc: any, key: any, index: number) => {
      acc[key] = bppId[index];
      return acc;
    }, {});

    return obj;
  };

  const mergedBppID = mergeBppToID();

  // onSelect BPP category, get BPP ID from bpp input field then pass the ID to get its typology from API
  const pushTypology = (e: any) => {
    const ID = mergedBppID[e.target.value];
    // setBppID(ID);
    getTypologyData(ID);
  };

  // fetch typology from API endpoint
  const getTypologyData = async (id: any) => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/get_topology.php?bpp_id=${id}`
    );

    const response = data?.data?.topology;
    const typologyTitle: string[] = [];
    const typologyID: string[] = [];
    response.forEach((item: any) => {
      typologyTitle.push(item.title);
      typologyID.push(item.id);
    });
    setTypologyTitle(typologyTitle);
  };

  // const validateEmail = (value: any) => {
  //   let error;
  //   if (!value) {
  //     error = "Required";
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
  //     error = "Invalid email address";
  //   }
  //   return error;
  // }

  // const validateNIN = (value: any) => {
  //   let error;
  //   if (!value) {
  //     error = 'NIN is required';
  //   } else if (value.length > 9 && value.length < 10) {
  //     error = 'NIN cannot be less or more than 10 digits'
  //   }
  //   return error;
  // }

  // const earlyID = Object.values(mergedObject)[0];
  // let earlyIDD = retrieveToken("earlyIDD")

  // if data exists in localStorage, else set to empty
  const defaultPayload = {
    users_id: userId,
    early_notifications_id: event ?? "",
    title: contractRegData?.title ?? "",
    bpp: contractRegData?.bpp ?? "",
    typology: contractRegData?.typology ?? "",
    contractor_type: contractRegData?.contractor_type ?? "",
    amount_mtb: contractRegData?.amount_mtb ?? "",
    vat: contractRegData?.vat ?? "",
    mda,
    withholding_tax: contractRegData?.withholding_tax ?? "",
    advance_payment: contractRegData?.advance_payment ?? "",
    scope: contractRegData?.scope ?? "",
    duration: contractRegData?.duration ?? "",
    location: contractRegData?.location ?? "",
    mdax1_name: contractRegData?.mdax1_name ?? "",
    mdax1_phone: contractRegData?.mdax1_phone ?? "",
    mdax1_email: contractRegData?.mdax1_email ?? "",
    mdax1_position: contractRegData?.mdax1_position ?? "",
    mdax1_department: contractRegData?.mdax1_department ?? "",
    mdax2_name: contractRegData?.mdax2_name ?? "",
    mdax2_phone: contractRegData?.mdax2_phone ?? "",
    mdax2_email: contractRegData?.mdax2_email ?? "",
    mdax2_position: contractRegData?.mdax2_position ?? "",
    mdax2_department: contractRegData?.mdax2_department ?? "",
    mda_lfp_name: contractRegData?.mda_lfp_name ?? "",
    mda_lfp_phone: contractRegData?.mda_lfp_phone ?? "",
    mda_lfp_email: contractRegData?.mda_lfp_email ?? "",
    mda_lfp_position: contractRegData?.mda_lfp_position ?? "",
    mda_lfp_department: contractRegData?.mda_lfp_department ?? "",
    ct_type: contractRegData?.ct_type ?? "",
    ct_name: contractRegData?.ct_name ?? "",
    ct_cac_reg_number: contractRegData?.ct_cac_reg_number ?? "",
    ct_web: contractRegData?.ct_web ?? "",
    ct_office_address: contractRegData?.ct_office_address ?? "",
    ct_phone: contractRegData?.ct_phone ?? "",
    ct_email: contractRegData?.ct_email ?? "",
    ct_taxid: contractRegData?.ct_taxid ?? "",
    ct_project_office: contractRegData?.ct_project_office ?? "",
    ct_rep_name: contractRegData?.ct_rep_name ?? "",
    ct_rep_address: contractRegData?.ct_rep_address ?? "",
    ct_rep_phone: contractRegData?.ct_rep_phone ?? "",
    ct_rep_email: contractRegData?.ct_rep_email ?? "",
    ct_rep_nin: contractRegData?.ct_rep_nin ?? "",
    ct_rep1_name: contractRegData?.ct_rep1_name ?? "",
    ct_rep1_address: contractRegData?.ct_rep1_address ?? "",
    ct_rep1_phone: contractRegData?.ct_rep1_phone ?? "",
    ct_rep1_email: contractRegData?.ct_rep1_email ?? "",
    ct_rep1_nin: contractRegData?.ct_rep1_nin ?? "",
    ct_rep1_position: contractRegData?.ct_rep1_position ?? "",
    ct_rep2_name: contractRegData?.ct_rep2_name ?? "",
    ct_rep2_address: contractRegData?.ct_rep2_address ?? "",
    ct_rep2_phone: contractRegData?.ct_rep2_phone ?? "",
    ct_rep2_email: contractRegData?.ct_rep2_email ?? "",
    ct_rep2_nin: contractRegData?.ct_rep2_nin ?? "",
    ct_rep2_position: contractRegData?.ct_rep2_position ?? "",
    bpp_no_objection: attach1?.file_url ?? "",
    letter_of_award: attach2?.file_url ?? "",
    draft_contract_upload: attach3?.file_url ?? "",
    draft_pacap_upload: attach4?.file_url ?? "",
    draft_rmp_upload: attach5?.file_url ?? "",
    cac_reg_upload: attach6?.file_url ?? "",
    ni_rep_upload: attach7?.file_url ?? "",
    ni_rep1_upload: attach8?.file_url ?? "",
    nitda: attach9?.file_url ?? "",
    letter_of_acceptance: attach10?.file_url ?? "",
    icrc: attach11?.file_url ?? "",
    fec_extract: attach12?.file_url ?? "",
    other_uploads: attach13?.file_url ?? "",
    // acceptance: attach4?.file_url ?? "",
  };

  // const handleOnChange = (e) => {
  //   const name = e.target.name
  //   const dd = (payload.name = e.target.value);
  //   setPayload(() => payload[name] = e.target.value)
  // }

  const schema = Yup.object({
    users_id: Yup.number(),
    early_notifications_id: Yup.string(),
    title: Yup.string().ensure().required("Required"),
    bpp: Yup.string().ensure(),
    typology: Yup.string(),
    contractor_type: Yup.string(),
    mda: Yup.string(),
    amount_mtb: Yup.string().required("Required"),
    vat: Yup.string().required("Required"),
    withholding_tax: Yup.string(),
    advance_payment: Yup.string().ensure().required("Required"),
    scope: Yup.string().required("Required"),
    duration: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    mdax1_name: Yup.string().required("Required"),
    mdax1_phone: Yup.string(),
    mdax1_email: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    mdax1_position: Yup.string().required("Required"),
    mdax1_department: Yup.string(),
    mdax2_name: Yup.string().required("Required"),
    mdax2_phone: Yup.string(),
    mdax2_email: Yup.string()
      .email("Invalid email address")
      .required("Required!"),
    mdax2_position: Yup.string().required("Required!"),
    mdax2_department: Yup.string(),
    mda_lfp_name: Yup.string().required("Required!"),
    mda_lfp_phone: Yup.string().required("Required!"),
    mda_lfp_email: Yup.string()
      .email("Invalid email address")
      .required("Required!"),
    mda_lfp_position: Yup.string().required("Required!"),
    mda_lfp_department: Yup.string(),
    ct_type: Yup.string().required("Required!"),
    ct_name: Yup.string().required("Required!"),
    ct_cac_reg_number: Yup.string().required("Required!"),
    ct_web: Yup.string(),
    ct_office_address: Yup.string().required("Required!"),
    ct_phone: Yup.string().required("Required!"),
    ct_email: Yup.string().email("Invalid email address").required("Required!"),
    ct_taxid: Yup.string().required("Required!"),
    ct_project_office: Yup.string().required("Required!"),
    ct_rep_name: Yup.string().required("Required!"),
    ct_rep_address: Yup.string().required("Required!"),
    ct_rep_phone: Yup.string().required("Required!"),
    ct_rep_email: Yup.string()
      .email("Invalid email address")
      .required("Required!"),
    ct_rep_nin: Yup.number(),
    // .max(10).required("NIN should be 10 digits"),
    ct_rep1_name: Yup.string().required("Required!"),
    ct_rep1_address: Yup.string().required("Required!"),
    ct_rep1_phone: Yup.string().required("Required!"),
    ct_rep1_email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    ct_rep1_nin: Yup.string(),
    // .max(10).required("NIN should be 10 digits"),
    ct_rep1_position: Yup.string().required("Required!"),
    ct_rep2_name: Yup.string().required("Required!"),
    ct_rep2_address: Yup.string().required("Required!"),
    ct_rep2_phone: Yup.string().required("Required!"),
    ct_rep2_email: Yup.string()
      .email("Invalid email address")
      .required("Required!"),
    ct_rep2_nin: Yup.string(),
    // .max(10).required("NIN should be 10 digits"),
    ct_rep2_position: Yup.string().required("Required!"),
    draft_contract_upload: Yup.string(),
    draft_pacap_upload: Yup.string(),
    draft_rmp_upload: Yup.string(),
    cac_reg_upload: Yup.string(),
    ni_rep_upload: Yup.string(),
    ni_rep1_upload: Yup.string(),
    other_uploads: Yup.string(),
    bpp_no_objection: Yup.string(),
    letter_of_award: Yup.string(),
    letter_of_acceptance: Yup.string(),
    icrc: Yup.string(),
    nitda: Yup.string(),
    fec_extract: Yup.string(),
  });

  const onSubmit = async (values: {
    users_id: number;
    early_notifications_id: any;
    title: string;
    bpp: string;
    typology: string;
    mda: string;
    contractor_type: string;
    amount_mtb: string;
    vat: string;
    withholding_tax: string;
    advance_payment: string;
    scope: string;
    duration: string;
    location: string;
    mdax1_name: string;
    mdax1_phone: string;
    mdax1_email: string;
    mdax1_position: string;
    mdax1_department: string;
    mdax2_name: string;
    mdax2_phone: string;
    mdax2_email: string;
    mdax2_position: string;
    mdax2_department: string;
    mda_lfp_name: string;
    mda_lfp_phone: string;
    mda_lfp_email: string;
    mda_lfp_position: string;
    mda_lfp_department: string;
    ct_type: string;
    ct_name: string;
    ct_cac_reg_number: string;
    ct_web: string;
    ct_office_address: string;
    ct_phone: string;
    ct_email: string;
    ct_taxid: string;
    ct_project_office: string;
    ct_rep_name: string;
    ct_rep_address: string;
    ct_rep_phone: string;
    ct_rep_email: string;
    ct_rep_nin: string;
    ct_rep1_name: string;
    ct_rep1_address: string;
    ct_rep1_phone: string;
    ct_rep1_email: string;
    ct_rep1_nin: string;
    ct_rep1_position: string;
    ct_rep2_name: string;
    ct_rep2_address: string;
    ct_rep2_phone: string;
    ct_rep2_email: string;
    ct_rep2_nin: string;
    ct_rep2_position: string;
    draft_contract_upload: any;
    draft_pacap_upload: any;
    draft_rmp_upload: any;
    cac_reg_upload: any;
    ni_rep_upload: any;
    ni_rep1_upload: any;
    other_uploads: any;
    bpp_no_objection: any;
    letter_of_award: any;
    icrc: any;
    letter_of_acceptance: any;
    nitda: any;
    fec_extract: any;
  }) => {
    values.early_notifications_id = defaultPayload.early_notifications_id;
    values.draft_contract_upload = defaultPayload.draft_contract_upload;
    values.draft_pacap_upload = defaultPayload.draft_pacap_upload;
    values.draft_rmp_upload = defaultPayload.draft_rmp_upload;
    values.cac_reg_upload = defaultPayload.cac_reg_upload;
    values.ni_rep_upload = defaultPayload.ni_rep_upload;
    values.ni_rep1_upload = defaultPayload.ni_rep1_upload;
    values.other_uploads = defaultPayload.other_uploads;
    values.bpp_no_objection = defaultPayload.bpp_no_objection;
    values.letter_of_award = defaultPayload.letter_of_award;
    values.letter_of_acceptance = defaultPayload.letter_of_acceptance;
    values.icrc = defaultPayload.icrc;
    values.nitda = defaultPayload.nitda;
    values.fec_extract = defaultPayload.fec_extract;
    // handle form submission here
    mutate(values);
  };

  return (
    <div>
      <Formik
        initialValues={defaultPayload}
        validationSchema={schema}
        onSubmit={async (values, { resetForm }) => {
          if (
            defaultPayload.draft_contract_upload &&
            defaultPayload.draft_pacap_upload &&
            defaultPayload.draft_rmp_upload &&
            defaultPayload.cac_reg_upload &&
            defaultPayload.ni_rep_upload &&
            defaultPayload.ni_rep1_upload &&
            defaultPayload.letter_of_award &&
            defaultPayload.letter_of_acceptance &&
            defaultPayload.fec_extract
          ) {
            await onSubmit(values);
            resetForm();
            storeToken("contract_reg_form", {});
          } else {
            toast.error("Kindly fill the compulsory fields first!");
          }
        }}
      >
        {(formik) => {
          const {
            handleSubmit,
            values,
            errors,
            touched,
            setFieldTouched,
            handleChange,
            handleBlur,
            setFieldValue,
          } = formik;
          return (
            <div>
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <>
                    {/* <div className="flex flex-col gap-4 mt-12"> */}
                    <h1 className="font-bold mt-12">
                      Contract (All fields are compulsory except Withholding
                      Tax)
                    </h1>
                    {/* </div> */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 mt-6">
                      <BaseFormSelect
                        data={titleArray}
                        placeholder=""
                        label="Contract Title *"
                        name="title"
                        value={values.title}
                        onBlur={setFieldTouched}
                        onChange={(e: any) => {
                          setFieldValue("title", e.target.value);
                          pushData(e);
                          pushTitle(e);
                        }}
                        error={errorParser(errors, touched, "title")}
                        touched={touched.title}
                      />
                      {/* <label className="mt-5 text-sm block font-bold text-gray-700">
                      Contract Title
                      <select
                        name="role"
                        style={{ height: "35px" }}
                        className="block w-full rounded-md border-[1px] py-3 px-4 text-sm text-gray-600 bg-gray-100"
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                          pushTitle(e);
                        }}
                        value={values.title}
                      >
                        <option>Select Title</option>
                        {titleArray.map((title, index) => {
                            return <option key={index} value={title}>
                              {title}
                            </option>
                          }
                        )}
                      </select>
                    </label> */}
                      <BaseFormSelect
                        data={bppCategories}
                        placeholder=""
                        onBlur={setFieldTouched}
                        label="FCAS Typology 1"
                        name="bpp"
                        value={values.bpp}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue("bpp", e.target.value);
                          pushData(e);
                          pushTypology(e);
                          // pushTitle(e)
                        }}
                        error={errorParser(errors, touched, "bpp")}
                        touched={touched.bpp}
                      />
                      <BaseFormSelect
                        data={typologyTitle}
                        placeholder=""
                        label="FCAS Typology 2"
                        name="typology"
                        value={values.typology}
                        onBlur={setFieldTouched}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue("typology", e.target.value);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "typology")}
                        touched={touched.typology}
                      />
                      <BaseFormInput
                        type="text"
                        placeholder=""
                        label="Other Contract Type"
                        name="contractor_type"
                        value={values.contractor_type}
                        onBlur={handleBlur}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue("contractor_type", e.target.value);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "contractor_type")}
                      />
                      <BaseFormInput
                        type="text"
                        placeholder=""
                        label="Approved amount by FEC/NPC/MTB *"
                        name="amount_mtb"
                        value={formatNumberWithCommas(values.amount_mtb)}
                        onBlur={handleBlur}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          // Update with raw numeric value (keeping decimal point)
                          const numericValue = e.target.value.replace(/,/g, "");
                          setFieldValue("amount_mtb", numericValue);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "amount_mtb")}
                      />
                      <BaseFormInput
                        type="text"
                        label="VAT *"
                        placeholder=""
                        name="vat"
                        value={formatNumberWithCommas(values.vat)}
                        onBlur={handleBlur}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const numericValue = e.target.value.replace(/,/g, "");
                          setFieldValue("vat", numericValue);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "vat")}
                      />
                      <BaseFormInput
                        type="text"
                        label="Withholding Tax (If Applicable)"
                        placeholder=""
                        name="withholding_tax"
                        value={formatNumberWithCommas(values.withholding_tax)}
                        onBlur={handleBlur}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          // Update with raw numeric value (keeping decimal point)
                          const numericValue = e.target.value.replace(/,/g, "");
                          setFieldValue("withholding_tax", numericValue);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "withholding_tax")}
                      />
                      <BaseFormSelect
                        data={["Yes", "No"]}
                        label="Advance Payment *"
                        placeholder=""
                        name="advance_payment"
                        value={values.advance_payment}
                        onBlur={setFieldTouched}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "advance_payment")}
                        touched={touched.advance_payment}
                      />
                      <BaseFormInput
                        type="text"
                        label="Headline Scope *"
                        placeholder=""
                        name="scope"
                        value={values.scope}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "scope")}
                      />
                      <BaseFormInput
                        type="text"
                        name="duration"
                        label="Contract Duration *"
                        value={values.duration}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "duration")}
                      />
                      <BaseFormInput
                        type="text"
                        name="location"
                        label="Contract Location *"
                        value={values.location}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "location")}
                      />
                    </div>
                  </>
                )}
                {step === 2 && (
                  <div>
                    <h1 className="font-bold mt-12">
                      Contract Sponsor (This is the contract point person in the
                      originating MDA who is primarily responsible for the
                      project execution and implementation)
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 mt-12">
                      <BaseFormInput
                        type="text"
                        name="mdax1_name"
                        label="Accounting Officer Name *"
                        value={values.mdax1_name}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "mdax1_name")}
                      />
                      <BaseFormInput
                        type="text"
                        name="mdax1_phone"
                        label="Accounting Officer Phone number"
                        value={values.mdax1_phone}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "mdax1_phone")}
                      />
                      <BaseFormInput
                        type="email"
                        name="mdax1_email"
                        label="Accounting Officer Email Address *"
                        value={values.mdax1_email}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "mdax1_email")}
                      />
                      <BaseFormInput
                        type="text"
                        name="mdax1_position"
                        label="Accounting Officer Position/Department *"
                        value={values.mdax1_position}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "mdax1_position")}
                      />
                    </div>
                    <div className="flex flex-col gap-4 mt-12">
                      <p className="font-bold text-base">
                        Contract Administrator
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 mt-4">
                      <BaseFormInput
                        type="text"
                        name="mdax2_name"
                        label=" Director User Department Name *"
                        value={values.mdax2_name}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "mdax2_name")}
                      />
                      <BaseFormInput
                        type="text"
                        name="mdax2_phone"
                        label="Director User Department Phone number *"
                        value={values.mdax2_phone}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "mdax2_phone")}
                      />
                      <BaseFormInput
                        type="email"
                        name="mdax2_email"
                        label="Director User Department Email Address *"
                        value={values.mdax2_email}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "mdax2_email")}
                      />
                      <BaseFormInput
                        type="text"
                        name="mdax2_position"
                        label="Director User Department Position/Department *"
                        value={values.mdax2_position}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "mdax2_position")}
                      />
                    </div>
                    <div className="flex flex-col gap-4 mt-12">
                      <p className="font-bold text-base">Legal Focal Person</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6">
                      <BaseFormInput
                        type="text"
                        name="mda_lfp_name"
                        label="Legal Adviser Name *"
                        value={values.mda_lfp_name}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "mda_lfp_name")}
                      />
                      <BaseFormInput
                        type="text"
                        name="mda_lfp_phone"
                        label="Legal Adviser Phone number *"
                        value={values.mda_lfp_phone}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "mda_lfp_phone")}
                      />
                      <BaseFormInput
                        type="email"
                        name="mda_lfp_email"
                        label="Legal Adviser Email Address *"
                        value={values.mda_lfp_email}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "mda_lfp_email")}
                      />
                      <BaseFormInput
                        type="text"
                        name="mda_lfp_position"
                        label="Legal Adviser Position/Department *"
                        value={values.mda_lfp_position}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "mda_lfp_position")}
                      />
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <>
                    <h1 className="font-bold mt-12">
                      Contractor Details (All fields are compulsory except
                      website)
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 mt-12">
                      <BaseFormSelect
                        data={["Limited Liability", "J.V", "S.P.V", "Others"]}
                        name="ct_type"
                        label="Contractor Type *"
                        value={values.ct_type}
                        onBlur={setFieldTouched}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_type")}
                        touched={touched.ct_type}
                      />
                      <BaseFormInput
                        type="text"
                        name="ct_name"
                        label="Contractor Name *"
                        value={values.ct_name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "ct_name")}
                      />
                      <BaseFormInput
                        type="text"
                        name="ct_cac_reg_number"
                        label="CAC Registration Number *"
                        value={values.ct_cac_reg_number}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(
                          errors,
                          touched,
                          "ct_cac_reg_number"
                        )}
                      />
                      <BaseFormInput
                        type="text"
                        name="ct_web"
                        label="Website"
                        value={values.ct_web}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_web")}
                      />
                      <BaseFormInput
                        type="text"
                        name="ct_office_address"
                        label="Office Address *"
                        value={values.ct_office_address}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(
                          errors,
                          touched,
                          "ct_office_address"
                        )}
                      />
                      <BaseFormInput
                        type="text"
                        name="ct_phone"
                        label="Phone Number *"
                        value={values.ct_phone}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_phone")}
                      />
                      <BaseFormInput
                        type="email"
                        name="ct_email"
                        label="Email Address *"
                        value={values.ct_email}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_email")}
                      />
                      <BaseFormInput
                        type="text"
                        name="ct_taxid"
                        label="Tax Identification Number *"
                        value={values.ct_taxid}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_taxid")}
                      />
                      <BaseFormInput
                        type="text"
                        name="ct_project_office"
                        label="Project Office Details *"
                        value={values.ct_project_office}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(
                          errors,
                          touched,
                          "ct_project_office"
                        )}
                      />
                      <BaseFormInput
                        type="text"
                        name="ct_rep_name"
                        label="Name of MD/CEO *"
                        value={values.ct_rep_name}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_rep_name")}
                      />
                      <BaseFormInput
                        type="text"
                        name="ct_rep_address"
                        label="CEO Address *"
                        value={values.ct_rep_address}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_rep_address")}
                      />
                      <BaseFormInput
                        type="text"
                        name="ct_rep_phone"
                        label="Phone Number *"
                        value={values.ct_rep_phone}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_rep_phone")}
                      />
                      <BaseFormInput
                        type="email"
                        name="ct_rep_email"
                        label="Email Address *"
                        value={values.ct_rep_email}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_rep_email")}
                      />
                    </div>
                  </>
                )}
                {step === 4 && (
                  <div>
                    <h1 className="font-bold mt-12">
                      Contractor Team (Minimum of 2 Representatives in addition
                      to CEO; one must include the key personnel on the contract
                      i.e., Project Director/ Manager) (Add representative
                      function)
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 mt-12">
                      <BaseFormInput
                        type="text"
                        name="ct_rep1_name"
                        label="Name *"
                        value={values.ct_rep1_name}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_rep1_name")}
                      />
                      <BaseFormInput
                        type="text"
                        name="ct_rep1_address"
                        label="Address *"
                        value={values.ct_rep1_address}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_rep1_address")}
                      />
                      <BaseFormInput
                        type="text"
                        name="ct_rep1_phone"
                        label="Phone Number *"
                        value={values.ct_rep1_phone}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_rep1_phone")}
                      />
                      <BaseFormInput
                        type="email"
                        name="ct_rep1_email"
                        label="Email Address *"
                        value={values.ct_rep1_email}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_rep1_email")}
                      />
                      {/* <BaseFormInput
                        type="text"
                        name="ct_rep1_nin"
                        label="NIN"
                        value={values.ct_rep1_nin}
                        onChange={(e: any) => {
                           
handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_rep1_nin")}
                      /> */}
                      <BaseFormInput
                        type="text"
                        name="ct_rep1_position"
                        label="Position *"
                        value={values.ct_rep1_position}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_rep1_position")}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 mt-12">
                      <BaseFormInput
                        type="text"
                        name="ct_rep2_name"
                        label="Name *"
                        value={values.ct_rep2_name}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_rep2_name")}
                      />
                      <BaseFormInput
                        type="text"
                        name="ct_rep2_address"
                        label="Address *"
                        value={values.ct_rep2_address}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_rep2_address")}
                      />
                      <BaseFormInput
                        type="text"
                        name="ct_rep2_phone"
                        label="Phone Number *"
                        value={values.ct_rep2_phone}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_rep2_phone")}
                      />
                      <BaseFormInput
                        type="email"
                        name="ct_rep2_email"
                        label="Email Address *"
                        value={values.ct_rep2_email}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_rep2_email")}
                      />
                      <BaseFormInput
                        type="text"
                        name="ct_rep2_position"
                        label="Position *"
                        value={values.ct_rep2_position}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushData(e);
                        }}
                        error={errorParser(errors, touched, "ct_rep2_position")}
                      />
                    </div>
                  </div>
                )}
                {step === 5 && (
                  <>
                    <h1 className="font-bold mt-12">
                      Uploads (these are all mandatory)
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 mt-12">
                      <BaseFormInput
                        type="file"
                        id="bpp_no_objection"
                        name="bpp_no_objection"
                        label="BPP NO Objection"
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
                          if (event?.currentTarget?.files != null) {
                            // eslint-disable-next-line @typescript-eslint/no-floating-promises
                            const fileData = await uploadFile(event, 1);
                            setAttach1(fileData);
                          }
                        }}
                        error={errorParser(errors, touched, "bpp_no_objection")}
                      />

                      <BaseFormInput
                        type="file"
                        id="letter_of_award"
                        name="letter_of_award"
                        label="Letter of Award *"
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
                          if (event?.currentTarget?.files != null) {
                            // eslint-disable-next-line @typescript-eslint/no-floating-promises
                            const fileData = await uploadFile(event, 2);
                            setAttach2(fileData);
                          }
                        }}
                        error={errorParser(
                          errors,
                          touched,
                          "letter_of_award *"
                        )}
                      />

                      <BaseFormInput
                        type="file"
                        id="draft_contract_upload"
                        name="draft_contract_upload"
                        label="Draft Contracts *"
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
                          if (event?.currentTarget?.files != null) {
                            // eslint-disable-next-line @typescript-eslint/no-floating-promises
                            const fileData = await uploadFile(event, 3);
                            setAttach3(fileData);
                          }
                        }}
                        error={errorParser(
                          errors,
                          touched,
                          "draft_contract_upload"
                        )}
                      />

                      <BaseFormInput
                        type="file"
                        id="draft_pacap_upload"
                        name="draft_pacap_upload"
                        label="Draft Post-Award Contract Administration Plan *"
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
                            setAttach4(fileData);
                          }
                        }}
                        error={errorParser(
                          errors,
                          touched,
                          "draft_pacap_upload"
                        )}
                      />

                      <BaseFormInput
                        type="file"
                        id="draft_rmp_upload"
                        name="draft_rmp_upload"
                        label="Draft Risk Management Plan *"
                        value={""}
                        isUploaded={
                          data?.message === "success" &&
                          data?.file_url !== null &&
                          uploaded === 5 ? (
                            <p style={{ color: "green" }}>Uploaded! ✅</p>
                          ) : (
                            ""
                          )
                        }
                        progressValue={
                          upload === 5 ? (
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
                            const fileData = await uploadFile(event, 5);
                            setAttach5(fileData);
                          }
                        }}
                        error={errorParser(errors, touched, "draft_rmp_upload")}
                      />
                      <BaseFormInput
                        type="file"
                        id="cac_reg_upload"
                        name="cac_reg_upload"
                        label="Due Diligence Report *"
                        value={""}
                        isUploaded={
                          data?.message === "success" &&
                          data?.file_url !== null &&
                          uploaded === 6 ? (
                            <p style={{ color: "green" }}>Uploaded! ✅</p>
                          ) : (
                            ""
                          )
                        }
                        progressValue={
                          upload === 6 ? (
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
                            const fileData = await uploadFile(event, 6);
                            setAttach6(fileData);
                          }
                        }}
                        error={errorParser(errors, touched, "cac_reg_upload")}
                      />
                      <BaseFormInput
                        type="file"
                        id="ni_rep_upload"
                        name="ni_rep_upload"
                        label="Means of National Identification of MD/CEO *"
                        value={""}
                        isUploaded={
                          data?.message === "success" &&
                          data?.file_url !== null &&
                          uploaded === 7 ? (
                            <p style={{ color: "green" }}>Uploaded! ✅</p>
                          ) : (
                            ""
                          )
                        }
                        progressValue={
                          upload === 7 ? (
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
                            const fileData = await uploadFile(event, 7);
                            setAttach7(fileData);
                          }
                        }}
                        error={errorParser(errors, touched, "ni_rep_upload")}
                      />
                      <BaseFormInput
                        type="file"
                        id="ni_rep1_upload"
                        name="ni_rep1_upload"
                        label="Means of National Identification of Contractor Team *"
                        value={""}
                        isUploaded={
                          data?.message === "success" &&
                          data?.file_url !== null &&
                          uploaded === 8 ? (
                            <p style={{ color: "green" }}>Uploaded! ✅</p>
                          ) : (
                            ""
                          )
                        }
                        progressValue={
                          upload === 8 ? (
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
                            const fileData = await uploadFile(event, 8);
                            setAttach8(fileData);
                          }
                        }}
                        error={errorParser(errors, touched, "ni_rep1_upload")}
                      />
                      <BaseFormInput
                        type="file"
                        id="nitda"
                        name="nitda"
                        label="NITDA Certificate"
                        value={""}
                        isUploaded={
                          data?.message === "success" &&
                          data?.file_url !== null &&
                          uploaded === 9 ? (
                            <p style={{ color: "green" }}>Uploaded! ✅</p>
                          ) : (
                            ""
                          )
                        }
                        progressValue={
                          upload === 9 ? (
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
                            const fileData = await uploadFile(event, 9);
                            setAttach9(fileData);
                          }
                        }}
                        error={errorParser(errors, touched, "nitda")}
                      />
                      <BaseFormInput
                        type="file"
                        id="letter_of_acceptance"
                        name="letter_of_acceptance"
                        label="Letter Of Acceptance *"
                        value={""}
                        isUploaded={
                          data?.message === "success" &&
                          data?.file_url !== null &&
                          uploaded === 10 ? (
                            <p style={{ color: "green" }}>Uploaded! ✅</p>
                          ) : (
                            ""
                          )
                        }
                        progressValue={
                          upload === 10 ? (
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
                            const fileData = await uploadFile(event, 10);
                            setAttach10(fileData);
                          }
                        }}
                        error={errorParser(
                          errors,
                          touched,
                          "letter_of_acceptance"
                        )}
                      />
                      <BaseFormInput
                        type="file"
                        id="icrc"
                        name="icrc"
                        label="ICRC compliance"
                        value={""}
                        isUploaded={
                          data?.message === "success" &&
                          data?.file_url !== null &&
                          uploaded === 11 ? (
                            <p style={{ color: "green" }}>Uploaded! ✅</p>
                          ) : (
                            ""
                          )
                        }
                        progressValue={
                          upload === 11 ? (
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
                            const fileData = await uploadFile(event, 11);
                            setAttach11(fileData);
                          }
                        }}
                        error={errorParser(errors, touched, "icrc")}
                      />
                      <BaseFormInput
                        type="file"
                        id="fec_extract"
                        name="fec_extract"
                        label="FEC Extract *"
                        value={""}
                        isUploaded={
                          data?.message === "success" &&
                          data?.file_url !== null &&
                          uploaded === 12 ? (
                            <p style={{ color: "green" }}>Uploaded! ✅</p>
                          ) : (
                            ""
                          )
                        }
                        progressValue={
                          upload === 12 ? (
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
                            const fileData = await uploadFile(event, 12);
                            setAttach12(fileData);
                          }
                        }}
                        error={errorParser(errors, touched, "fec_extract")}
                      />
                      <BaseFormInput
                        type="file"
                        id="other_uploads"
                        name="other_uploads"
                        label="Other"
                        value={""}
                        isUploaded={
                          data?.message === "success" &&
                          data?.file_url !== null &&
                          uploaded === 13 ? (
                            <p style={{ color: "green" }}>Uploaded! ✅</p>
                          ) : (
                            ""
                          )
                        }
                        progressValue={
                          upload === 13 ? (
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
                            const fileData = await uploadFile(event, 13);
                            setAttach13(fileData);
                          }
                        }}
                        error={errorParser(errors, touched, "other_uploads")}
                      />
                    </div>
                  </>
                )}
                <div className="flex flex-col sm:flex-row gap-x-10 gap-y-4 mt-10 mb-10 justify-start align-middle w-full">
                  {step <= 4 && (
                    <div className="my-auto">
                      <Button
                        className="relative w-full sm:w-fit flex flex-row justify-center btn-shadow bg-green py-3 px-5 rounded-lg text-white text-sm font-semibold hover:bg-green/80 transition-all"
                        type="button"
                        onClick={() => {
                          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                          // Object.keys(errors).length > 0 ? "" :
                          if (
                            step === 1 &&
                            values.title &&
                            (values.bpp ||
                              values.typology ||
                              values.contractor_type) &&
                            values.amount_mtb &&
                            values.advance_payment &&
                            values.scope &&
                            values.duration &&
                            values.location &&
                            values.vat
                          ) {
                            next();

                            handleSaveToLocal();
                          } else if (
                            step === 2 &&
                            values.mdax1_name &&
                            values.mdax1_email &&
                            values.mdax1_position &&
                            values.mdax2_name &&
                            values.mdax2_phone &&
                            values.mdax2_email &&
                            values.mdax2_position &&
                            values.mda_lfp_name &&
                            values.mda_lfp_phone &&
                            values.mda_lfp_email &&
                            values.mda_lfp_position
                          ) {
                            next();
                            handleSaveToLocal();
                          } else if (
                            step === 3 &&
                            values.ct_type &&
                            values.ct_name &&
                            values.ct_cac_reg_number &&
                            values.ct_office_address &&
                            values.ct_phone &&
                            values.ct_taxid &&
                            values.ct_email &&
                            values.ct_project_office &&
                            values.ct_rep_name &&
                            values.ct_rep_address &&
                            values.ct_rep_phone &&
                            values.ct_rep_email
                          ) {
                            next();
                            handleSaveToLocal();
                          } else if (
                            step === 4 &&
                            values.ct_rep1_name &&
                            values.ct_rep1_address &&
                            values.ct_rep1_phone &&
                            values.ct_rep1_email &&
                            values.ct_rep1_position &&
                            values.ct_rep2_name &&
                            values.ct_rep2_address &&
                            values.ct_rep2_phone &&
                            values.ct_rep2_email &&
                            values.ct_rep2_position
                          ) {
                            next();
                            handleSaveToLocal();
                          } else {
                            toast.error(
                              "Kindly fill the compulsory fields first!"
                            );
                          }
                        }}
                      >
                        <p className="my-auto">Save & Continue</p>
                      </Button>
                    </div>
                  )}
                  {step === 5 && (
                    <div className="my-auto">
                      <SubmitButton
                        type="submit"
                        className="relative w-full sm:w-fit flex flex-row justify-center btn-shadow bg-green py-3 px-5 rounded-lg text-white text-sm font-semibold hover:bg-green/80 transition-all"
                      >
                        <p className="my-auto">Submit</p>
                      </SubmitButton>
                    </div>
                  )}
                  {step > 1 && (
                    <div className="my-auto">
                      <Button
                        type="submit"
                        className="relative w-full sm:w-fit flex flex-row justify-center border border-gray-500 py-3 px-5 rounded-lg text-black text-sm font-semibold hover:bg-gray-100 transition-all"
                        onClick={back}
                      >
                        <p className="my-auto">Back</p>
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default StepOne;
