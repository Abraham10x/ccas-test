/* eslint-disable array-callback-return */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "@components/application/Modal";
import { Button, SubmitButton } from "@components/application/base/Button";
import { errorParser } from "@lib/helper";
import authQueries from "@lib/queries/auth";
import BaseFormInput from "@components/application/base/form/BaseFormInput";
interface IProps {
  showModal: boolean;
  setShowModal: any;
}

const CreateMdaModal: FC<IProps> = ({ showModal, setShowModal }: IProps) => {
  const { mutate } = authQueries.createMda();

  const defaultPayload = {
    mda_code: "",
    title: "",
  };

  // const [payload] = useState(defaultPayload);

  // const handleValidation = (e: any) => {
  //   return e;
  // };

  const onSubmit = async (values: { mda_code: string; title: string }) => {
    // handle form submission here
    mutate(values);
    setShowModal(false);
  };

  const schema = Yup.object({
    mda_code: Yup.string(),
    title: Yup.string().required("Required"),
  });

  return (
    <>
      <Modal
        label="Create New MDA"
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
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
              const {
                handleSubmit,
                values,
                touched,
                errors,
                handleBlur,
                handleChange,
              } = formik;
              return (
                <div className="px-6 py-4">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-2 mt-5">
                      <BaseFormInput
                        type="text"
                        name="mda_code"
                        label="MDA Code"
                        value={values.mda_code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "mda_code")}
                      />
                      <BaseFormInput
                        type="text"
                        name="title"
                        label="Title"
                        value={values.title}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "title")}
                      />
                    </div>
                    <div className="flex justify-start items-center gap-x-5 py-5 border-t">
                      <SubmitButton
                        type="submit"
                        className="bg-green text-white "
                      >
                        Submit
                      </SubmitButton>
                      <Button
                        className="border-[1px] border-outline-gray"
                        onClick={() => {
                          setShowModal(false);
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

export default CreateMdaModal;
