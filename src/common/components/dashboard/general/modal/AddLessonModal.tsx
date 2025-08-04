/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "@components/application/Modal";
import BaseFormInput from "../../../application/base/form/BaseFormInput";
import { Button, SubmitButton } from "../../../application/base/Button";
import { errorParser, retrieveToken } from "@lib/helper";
import { Toaster } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import BaseFormSelect from "@components/application/base/form/BaseFormSelect";
import contractRegQueries from "@lib/queries/contract-reg";
import lessonQueries from "@lib/queries/lesson-learnt";
interface IProps {
  id?: any;
}

const AddLessonModal: FC<IProps> = ({ id }: IProps) => {
  // const [payload] = useState(defaultPayload);
  const [showModal, setShowModal] = useState(false);
  const [contractID, setContractID] = useState<string>();
  const { mutate } = lessonQueries.create();
  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  const userId = retrieveToken("userId");
  const userType = retrieveToken("userType");
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
      titleArray.push(item.title);
      idArray.push(item.id);
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
  };

  const defaultPayload = {
    contracts_title: contractID ?? "",
    users_id: userId,
    scope_of_work: "",
    location: "",
    community_issues: "",
    cost_control: "",
    key_risks: "",
    tendering_exercises: "",
    mda_management: "",
  };

  const schema = Yup.object({
    contracts_title: Yup.string(),
    users_id: Yup.string().required("Required"),
    scope_of_work: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    community_issues: Yup.string().required("Required"),
    cost_control: Yup.string().required("Required"),
    key_risks: Yup.string().required("Required"),
    tendering_exercises: Yup.string().required("Required"),
    mda_management: Yup.string().required("Required"),
  });

  const onSubmit = async (values: {
    contracts_title: any;
    users_id: any;
    scope_of_work: string;
    location: string;
    community_issues: string;
    cost_control: string;
    key_risks: string;
    tendering_exercises: string;
    mda_management: string;
  }) => {
    // handle form submission here
    mutate(values);
    handleModal();
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      {userType === "Legal Adviser" || userType === "Procurement" ? (
        <Button
          className="bg-green text-white flex items-center gap-x-2 w-fit sm:gap-x-4"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <IoMdAdd className="h-5 w-5" />
          <p>Add Lesson Learnt</p>
        </Button>
      ) : (
        ""
      )}

      <Modal
        label="Add Lesson Learnt"
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
              } = formik;
              return (
                <div className="px-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-5">
                      <BaseFormSelect
                        data={titleArray}
                        label="Select contract"
                        name="contracts_title"
                        value={values.contracts_title}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          pushTitle(e);
                        }}
                        error={errorParser(errors, touched, "contracts_title")}
                      />
                      <BaseFormInput
                        type="text"
                        label="Scope of Work"
                        name="scope_of_work"
                        value={values.scope_of_work}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "scope_of_work")}
                      />
                      <BaseFormInput
                        type="text"
                        label="Location"
                        name="location"
                        value={values.location}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "location")}
                      />
                      <BaseFormInput
                        type="text"
                        label="Community Issues"
                        name="community_issues"
                        value={values.community_issues}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "community_issues")}
                      />
                      <BaseFormInput
                        type="text"
                        label="Cost Control"
                        name="cost_control"
                        value={values.cost_control}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "cost_control")}
                      />
                      <BaseFormInput
                        type="text"
                        label="Key Risks"
                        name="key_risks"
                        value={values.key_risks}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "key_risks")}
                      />
                      <BaseFormInput
                        type="text"
                        label="Tendering Exercise"
                        name="tendering_exercises"
                        value={values.tendering_exercises}
                        onChange={handleChange}
                        error={errorParser(
                          errors,
                          touched,
                          "tendering_exercises"
                        )}
                      />
                      <BaseFormInput
                        type="text"
                        label="Mda Management"
                        name="mda_management"
                        value={values.mda_management}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "mda_management")}
                      />
                    </div>
                    <div className="flex justify-start flex-col sm:flex-row gap-x-5 gap-y-3 py-5 mt-5 border-t">
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

export default AddLessonModal;
