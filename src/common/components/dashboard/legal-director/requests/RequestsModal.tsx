/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "@components/application/Modal";
import BaseFormInput from "../../../application/base/form/BaseFormInput";
import { Button, SubmitButton } from "../../../application/base/Button";
import { Toaster } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import RequestuserQueries from "@lib/queries/request-user";
import { errorParser, retrieveToken } from "@lib/helper";
// import { IoWarning } from "react-icons/io5";

interface IProps {
  id?: any;
}

const RequestsModal: FC<IProps> = ({ id }: IProps) => {
  const userId = retrieveToken("userId");
  const mdas = retrieveToken("mda");
  const defaultPayload = {
    fullname: "",
    email: "",
    mda: String(mdas),
    legal_title: "",
    requested_by: Number(userId),
    role: 5,
  };
  const [payload] = useState(defaultPayload);
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  const { mutate } = RequestuserQueries.create();

  const schema = Yup.object({
    fullname: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    mda: Yup.string().required("Required"),
    legal_title: Yup.string().required("Required"),
  });

  const onSubmit = async (values: {
    fullname: string;
    email: string;
    mda: string;
    legal_title: string;
    requested_by: any;
    role: any;
  }) => {
    // handle form submission here
    // mutate(values);
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
        <IoMdAdd className="h-5 w-5" />
        <p>Make New Request</p>
      </Button>
      <Modal
        label="New Request"
        showModal={showModal}
        onClose={() => setShowModal(false)}
      >
        <div className="">
          <Formik
            enableReinitialize
            initialValues={payload}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-5">
                      <BaseFormInput
                        type="text"
                        label="Full Name"
                        name="fullname"
                        value={values.fullname}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "fullname")}
                      />
                      <BaseFormInput
                        type="email"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "email")}
                      />
                      <BaseFormInput
                        type="text"
                        label="Job Title"
                        name="legal_title"
                        value={values.legal_title}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "legal_title")}
                      />
                    </div>
                    {/* <div className="flex flex-row gap-4">
                        <IoWarning className="text-[#003FC7] my-auto text-sm" />
                        <p className="underline text-[#003FC7] text-sm">
                          view file sample
                        </p>
                      </div> */}
                    <div className="flex justify-start items-center gap-x-5 py-5 border-t mt-10">
                      <SubmitButton
                        data-hs-overlay={`#${id}`}
                        type="submit"
                        className="bg-green text-white "
                      >
                        Request
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

export default RequestsModal;
