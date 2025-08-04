import { FC, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import BaseFormInput from "../base/form/BaseFormInput";
import { errorParser } from "@lib/helper";
import { SubmitButton } from "../base/Button";
import Link from "next/link";
import authQueries from "@lib/queries/auth";

const defaultPasswordPayload = {
  email: "",
  token: "",
  new_password: "",
};

const AuthResetForm: FC = () => {
  const [passwordPayload] = useState(defaultPasswordPayload);
  const { mutate } = authQueries.resetPassword();

  const onSubmitPassword = async (values: {
    email: string;
    token: string;
    new_password: string;
  }) => {
    // handle form submission here
    mutate(values);
  };

  const passwordScheme = Yup.object({
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email Required"),
    token: Yup.string().required("Token Required"),
    new_password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    confirm_password: Yup.string()
      .required("No password provided.")
      .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
  });
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={passwordPayload}
        validationSchema={passwordScheme}
        onSubmit={async (values, { resetForm }) => {
          await onSubmitPassword(values);
          resetForm();
        }}
      >
        {(formik) => {
          const {
            handleSubmit,
            values,
            handleChange,
            errors,
            touched,
            handleBlur,
          } = formik;
          return (
            <form onSubmit={handleSubmit}>
              <div className="flex gap-x-9 ">
                <p className="text-gray-900 text-lg sm:text-xl lg:text-2xl mb-8 font-bold sm:font-extrabold">
                  New Password
                </p>
              </div>
              <BaseFormInput
                type="text"
                placeholder="Enter Email Address"
                name="email"
                label="Email Address"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errorParser(errors, touched, "email")}
              />
              <BaseFormInput
                type="text"
                placeholder="142132"
                name="token"
                label="Token"
                value={values.token}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errorParser(errors, touched, "token")}
              />

              <BaseFormInput
                type="password"
                name="new_password"
                label="New Password"
                value={values.new_password}
                onChange={handleChange}
                onBlur={handleBlur}
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
              <SubmitButton
                type="submit"
                className="text-sm sm:text-base relative w-full btn-shadow bg-green mt-4 py-3 px-4 rounded-lg text-white font-semibold hover:bg-green/80 transition-all"
              >
                Reset Password
              </SubmitButton>

              <div className="text-center mt-3 sm:mt-5">
                <Link legacyBehavior href="/">
                  <a className="underline text-sm sm:text-base text-green font-semibold">
                    Back to Login
                  </a>
                </Link>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AuthResetForm;
