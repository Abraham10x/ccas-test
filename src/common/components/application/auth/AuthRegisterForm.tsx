import { FC, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import BaseFormInput from "../base/form/BaseFormInput";
import { SubmitButton } from "../base/Button";
import Link from "next/link";
import BaseFormSelect from "../base/form/BaseFormSelect";
import BaseFormCheckBox from "../base/form/BaseFormCheckBox";
import Image from "next/image";
import { errorParser } from "@lib/helper";
// import queries from "@lib/queries/auth";
import toast, { Toaster } from "react-hot-toast";

const defaultPayload = {
  lastName: "",
  firstName: "",
  sex: "",
  password: "",
  phoneNumber: "",
  email: "",
  dob: "",
  // nationality: "",
  // country: "",
  // acceptTerms: false,
};

const AuthRegisterForm: FC = () => {
  const [payload] = useState(defaultPayload);
  // const { mutate } = queries.register();
  const [nextPage, setSetNextPage] = useState(false);

  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSwitch = () => {
    setSetNextPage((prevState) => !prevState);
  };

  const handleTerms = () => {
    setAcceptTerms(!acceptTerms);
  };

  const schema = Yup.object({
    lastName: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    sex: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    email: Yup.string().email("Invalid Email Address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters")
      .required("Required"),
  });

  const handleSubmit = async (values: {
    lastName: string;
    firstName: string;
    sex: string;
    password: string;
    phoneNumber: string;
    email: string;
    dob: string;
    // nationality: string;
    // country: string;
    // acceptTerms: Boolean;
  }) => {
    // handle form submission here
    // mutate(values);
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Formik
        enableReinitialize={true}
        initialValues={payload}
        validationSchema={schema}
        onSubmit={async (values, { resetForm }) => {
          if (acceptTerms) {
            await handleSubmit(values);
            resetForm();
          } else {
            toast.error("Kindly accept terms!");
          }
        }}
      >
        {(formik) => {
          const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
            formik;
          return (
            <form onSubmit={handleSubmit}>
              {!nextPage ? (
                <>
                  <div>
                    <Link legacyBehavior href="/">
                      <a className="text-green font-semibold text-lg underline">
                        Back Home
                      </a>
                    </Link>
                  </div>
                  <h2 className="text-[2rem] text-gray-900 font-extrabold font-sans mb-8 mt-12">
                    Create an Individual <br /> Account
                  </h2>
                  <BaseFormInput
                    type="text"
                    placeholder="Enter Your last name"
                    name="lastName"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "lastName")}
                  />

                  <BaseFormInput
                    type="text"
                    placeholder="Enter Your First Name"
                    name="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "firstName")}
                  />

                  <BaseFormInput
                    type="email"
                    placeholder="Enter Your email"
                    name="email"
                    label="Email Address"
                    value={values.email}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "email")}
                  />

                  <BaseFormSelect
                    name="sex"
                    label="Gender"
                    placeholder="Select Gender"
                    value={values.sex}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    data={["Male", "Female"]}
                    error={errorParser(errors, touched, "sex")}
                  />

                  <BaseFormInput
                    type="password"
                    placeholder="Password"
                    name="password"
                    label="Enter Your Password"
                    value={values.password}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "password")}
                  />

                  <p className="text-gray-600 text-lg font-medium mt-6">
                    To proceed click on continue
                  </p>
                  <SubmitButton
                    type="submit"
                    className="relative w-full bg-green mt-4 py-3 px-4 rounded-lg btn-shadow text-white text-lg font-semibold hover:bg-green/80 transition-all"
                    onClick={handleSwitch}
                  >
                    Continue
                  </SubmitButton>
                  <div className="text-center mt-10 ">
                    <p className="text-gray-600 text-lg">
                      Already have an individual Account ?{" "}
                      <Link legacyBehavior href="/auth/login">
                        <a className="text-gray-900 font-semibold text-lg underline">
                          Login
                        </a>
                      </Link>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <figure className="cursor-pointer" onClick={handleSwitch}>
                    <Image
                      src="/img/auth/back.svg"
                      alt="icon"
                      width={35}
                      height={35}
                    />
                  </figure>
                  <p className="font-sans font-semibold text-base uppercase text-gray-400 mt-8 mb-5">
                    Step 2
                  </p>

                  <h2 className="text-[2rem] text-gray-900 font-extrabold font-sans mb-8">
                    Create an Individual <br /> Account
                  </h2>
                  <BaseFormInput
                    type="text"
                    placeholder="Enter Your Phone Number"
                    name="phoneNumber"
                    label="Phone Number"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "phoneNumber")}
                  />
                  <BaseFormInput
                    type="text"
                    placeholder="Select your date of birth"
                    name="dob"
                    label="Date of Birth"
                    value={values.dob}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "dob")}
                  />
                  {/* <BaseFormInput
                    type="text"
                    placeholder="Nationality"
                    name="nationality"
                    label="Nationality"
                    value={values.nationality}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "nationality")}
                  />
                  <BaseFormSelect
                    name="country"
                    label="Country of Residence"
                    value={values.country}
                    onChange={handleChange}
                    data={["Select Country", "Nigeria"]}
                    error={errorParser(errors, touched, "country")}
                  /> */}

                  <div className="flex flex-row justify-start">
                    <div className="basis-[8%] 2xl:basis-[5%] m-auto">
                      <BaseFormCheckBox
                        name="acceptTerms"
                        id="link-checkbox"
                        label=""
                        onChange={handleTerms}
                        value={acceptTerms}
                        className="w-4 h-4 text-secondary rounded border-gray-300 checkmark focus:ring-secondary checked:bg-secondary transition duration-200 2xl:mt-4"
                      />
                    </div>
                    <label
                      htmlFor="link-checkbox"
                      className="text-gray-600 text-lg font-medium mt-6 basis-[92%] 2xl:basis-[95%]"
                    >
                      By Creating Account, You Agree to the{" "}
                      <span className="text-green font-semibold text-lg underline">
                        Terms & Conditions
                      </span>
                    </label>
                  </div>
                  <SubmitButton
                    type="submit"
                    className="relative w-full bg-green mt-4 py-3 px-4 rounded-lg btn-shadow text-white text-lg font-semibold hover:bg-green/80 transition-all"
                  >
                    Create Account
                  </SubmitButton>
                </>
              )}
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AuthRegisterForm;
