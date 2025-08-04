/* eslint-disable array-callback-return */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "@components/application/Modal";
import { Button, SubmitButton } from "@components/application/base/Button";
import { errorParser, retrieveToken } from "@lib/helper";
import authQueries from "@lib/queries/auth";
import BaseFormInput from "@components/application/base/form/BaseFormInput";
interface IProps {
  showModal: boolean;
  setShowModal: any;
}

const ChangePasswordModal: FC<IProps> = ({
  showModal,
  setShowModal,
}: IProps) => {
  const userId = retrieveToken("userId");
  const { mutate } = authQueries.changePassword();

  const defaultPayload = {
    users_id: userId,
    old_password: "",
    new_password: "",
  };

  // const [payload] = useState(defaultPayload);

  // const handleValidation = (e: any) => {
  //   return e;
  // };

  const onSubmit = async (values: {
    users_id: string;
    old_password: string;
    new_password: string;
  }) => {
    // handle form submission here
    values.users_id = defaultPayload.users_id;
    mutate(values);
    setShowModal(false);
  };

  const schema = Yup.object({
    users_id: Yup.string(),
    old_password: Yup.string().required("No password provided."),
    new_password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    confirm_password: Yup.string()
      .required("No password provided.")
      .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
  });

  return (
    <>
      <Modal
        label="Change Password"
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
                        type="password"
                        name="old_password"
                        label="Old Password"
                        value={values.old_password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "old_password")}
                      />
                      <BaseFormInput
                        type="password"
                        name="new_password"
                        label="New Password"
                        value={values.new_password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "new_password")}
                      />
                      <BaseFormInput
                        type="password"
                        name="confirm_password"
                        label="Confirm Password"
                        // value={values.confirm_password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "confirm_password")}
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

export default ChangePasswordModal;
