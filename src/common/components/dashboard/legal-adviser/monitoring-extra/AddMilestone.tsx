/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "@components/application/Modal";
import BaseFormInput from "../../../application/base/form/BaseFormInput";
import { Button, SubmitButton } from "../../../application/base/Button";
import { errorParser, retrieveToken } from "@lib/helper";
// import superAdminQueries from "@lib/queries/superadmin";
import { Toaster } from "react-hot-toast";
import monitorQueries from "@lib/queries/monitoring";
interface IProps {
  id?: any;
}

const AddMilestone: FC<IProps> = ({ id }: IProps) => {
  // const [payload] = useState(defaultPayload);
  const [showModal, setShowModal] = useState(false);

  const getmda = retrieveToken("mda");
  const contractID = retrieveToken("contractId");
  const userId = retrieveToken("userId");
  const { mutate } = monitorQueries.create();

  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  const defaultPayload = {
    milestone: "",
    due_date: "",
    performance_indicator: "",
    mda: getmda,
    contracts_id: contractID,
    users_id: Number(userId),
  };

  const schema = Yup.object({
    milestone: Yup.string(),
    due_date: Yup.string(),
    performance_indicator: Yup.string(),
    mda: Yup.string(),
    users_id: Yup.number(),
  });

  const onSubmit = async (values: {
    milestone: string;
    due_date: string;
    performance_indicator: string;
    mda: any;
    contracts_id: any;
    users_id: any;
  }) => {
    // handle form submission here
    handleModal();
    mutate(values);
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
        Add KPI
      </Button>
      <Modal
        label="Add Key Performance Indicator"
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
              const { handleSubmit, values, errors, touched, handleChange } =
                formik;
              return (
                <div className="px-6 py-4">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-y-2">
                      <BaseFormInput
                        label="Key Performance Indicator"
                        name="milestone"
                        type="text"
                        value={values.milestone}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "milestone")}
                      />
                      <BaseFormInput
                        label="Due Date"
                        name="due_date"
                        type="date"
                        value={values.due_date}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "due_date")}
                      />
                    </div>
                    <div className="flex justify-start items-center gap-x-5 py-5 border-t">
                      <SubmitButton
                        data-hs-overlay={`#${id}`}
                        type="submit"
                        className="bg-green text-white "
                      >
                        Add KPI
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

export default AddMilestone;
