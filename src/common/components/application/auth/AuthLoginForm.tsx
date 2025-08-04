import { FC, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import BaseFormInput from "../base/form/BaseFormInput";
// import BaseFormCheckBox from "../base/form/BaseFormCheckBox";
import { SubmitButton } from "../base/Button";
import { errorParser } from "@lib/helper";
import Link from "next/link";
import authQueries from "@lib/queries/auth";
import { Toaster } from "react-hot-toast";

const defaultPayload = {
  email: "",
  passkey: "",
};

const AuthLoginForm: FC = () => {
  const [payload] = useState(defaultPayload);
  // const [remember, setRemember] = useState(false);
  const { mutate } = authQueries.login();

  const schema = Yup.object({
    email: Yup.string().email("Invalid Email Address").required("Required"),
    passkey: Yup.string()
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters")
      .required("Required"),
  });

  // const handleRemember = () => {
  //   setRemember(!remember);
  // };

  const onSubmit = async (values: { email: string; passkey: string }) => {
    // handle form submission here
    mutate(values);
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
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
            <form onSubmit={handleSubmit}>
              <BaseFormInput
                type="text"
                placeholder="Enter Your Email Address"
                name="email"
                label="Email Address"
                value={values.email}
                onChange={handleChange}
                error={errorParser(errors, touched, "email")}
              />
              <BaseFormInput
                type="password"
                placeholder="Password"
                name="passkey"
                label="Enter Your Password"
                value={values.passkey}
                onChange={handleChange}
                error={errorParser(errors, touched, "passkey")}
              />
              {/* <div className="flex flex-row justify-start">
                <div className="basis-[8%] 2xl:basis-[5%] m-auto">
                  <BaseFormCheckBox
                    name="remember"
                    id="link-checkbox"
                    onChange={handleRemember}
                    value={remember}
                    className="w-4 h-4 text-secondary rounded border-gray-300 checkmark focus:ring-secondary checked:bg-secondary transition duration-200 2xl:mt-4"
                  />
                </div>
                <label
                  htmlFor="link-checkbox"
                  className="text-gray-600 text-lg font-medium mt-6 basis-[92%] 2xl:basis-[95%]"
                >
                  Remember me
                </label>
              </div> */}

              <SubmitButton
                type="submit"
                className="relative w-full bg-green mt-4 py-3 px-4 rounded-lg btn-shadow text-white text-lg font-semibold hover:bg-green/80 transition-all"
              >
                Login
              </SubmitButton>

              <div className="text-center mt-9 ">
                <Link legacyBehavior href="/auth/forgotPassword">
                  <a className="underline text-base text-green font-semibold">
                    Forgot Password
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

export default AuthLoginForm;
