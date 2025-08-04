import { FC, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import BaseFormInput from "../base/form/BaseFormInput";
import { SubmitButton } from "../base/Button";
import Link from "next/link";
import Image from "next/image";
import { errorParser } from "@lib/helper";
import authQueries from "@lib/queries/auth";
import { Toaster } from "react-hot-toast";
import AuthResetForm from "./AuthResetPassword";

const defaultEmailPayload = {
  email: "",
};

const AuthForgotForm: FC = () => {
  const [emailPayload] = useState(defaultEmailPayload);
  const [validEmail, setVaildEmail] = useState(false);

  const { mutate } = authQueries.forgotPassword();

  const emailSchema = Yup.object({
    email: Yup.string().email("Invalid Email Address").required("Required"),
  });

  function handleSwitch() {
    setVaildEmail((preState) => !preState);
  }
  const onSubmitEmail = async (values: { email: string }) => {
    // handle form submission here
    mutate(values);
    handleSwitch();
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      {!validEmail ? (
        <Formik
          enableReinitialize
          initialValues={emailPayload}
          validationSchema={emailSchema}
          onSubmit={async (values, { resetForm }) => {
            await onSubmitEmail(values);
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
                  <Link legacyBehavior href="/">
                    <figure className="cursor-pointer">
                      <Image
                        src="/img/auth/back.svg"
                        alt="icon"
                        width={35}
                        height={35}
                      />
                    </figure>
                  </Link>
                  <p className="text-gray-900 text-lg sm:text-xl lg:text-2xl mb-8 font-bold sm:font-extrabold">
                    Forgot Password
                  </p>
                </div>
                <BaseFormInput
                  type="text"
                  placeholder="Enter Email Address"
                  name="email"
                  label="Email Address"
                  onBlur={handleBlur}
                  value={values.email}
                  onChange={handleChange}
                  error={errorParser(errors, touched, "email")}
                />
                <SubmitButton
                  type="submit"
                  className="text-sm sm:text-base relative w-full btn-shadow bg-green mt-4 py-3 px-4 rounded-lg text-white font-bold sm:font-semibold hover:bg-green/80 transition-all"
                >
                  Send Reset Link
                </SubmitButton>

                <div className="text-center mt-3 sm:mt-5 ">
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
      ) : (
        <AuthResetForm />
      )}
    </div>
  );
};

export default AuthForgotForm;
