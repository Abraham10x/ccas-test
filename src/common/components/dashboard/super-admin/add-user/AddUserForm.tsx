/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { FC, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import BaseFormInput, {
  LinearProgressWithLabel,
} from "../../../application/base/form/BaseFormInput";
import BaseFormSelect from "../../../application/base/form/BaseFormSelect";
import { SubmitButton } from "../../../application/base/Button";
import { IoMdAdd } from "react-icons/io";
import superAdminQueries from "@lib/queries/role";
import authQueries from "@lib/queries/auth";
import { errorParser } from "@lib/helper";
import { Toaster } from "react-hot-toast";
import useUpload from "@lib/hooks/useUpload";
import { Box } from "@mui/material";
import BaseFormSelectSearch from "@components/application/base/form/BaseFormSelectSearch";

const AddUserForm: FC = () => {
  const { mutate } = authQueries.register();
  const { data, uploaded, upload, progress, uploadFile } = useUpload();
  const [attach, setAttach] = useState<any>();
  const allRoles = superAdminQueries.getRoles();
  const allMdas = superAdminQueries.getMda();

  const defaultPayload = {
    fullname: "",
    job_title: "",
    mda: "",
    department: "",
    specialization: "",
    role: "",
    email: "",
    phone: "",
    home_address: "",
    office_address: "",
    staff_no: "",
    profile_pic: attach,
    training_status: "",
  };
  const [payload] = useState(defaultPayload);

  const getRoles = () => {
    const rolesArr: string[] = [];
    const rolesIdArr: number[] = [];
    allRoles.data?.data?.roles.forEach((item: any) => {
      rolesArr.push(item.title);
      rolesIdArr.push(item.id);
    });

    return { rolesArr, rolesIdArr };
  };

  const getAllMda = () => {
    const mdaArr: string[] = [];
    allMdas.data?.data?.mdas.forEach((item: any) => {
      mdaArr.push(item.title);
    });

    return { mdaArr };
  };

  const { rolesArr, rolesIdArr } = getRoles();
  const { mdaArr } = getAllMda();

  const arrangeValue = () => {
    const optionArr: any[] = [];
    mdaArr.map((mda) => {
      optionArr.push({ value: mda, label: mda });
    });
    return optionArr;
  };

  const optionArr = arrangeValue();

  const onSubmit = async (values: {
    fullname: any;
    job_title: any;
    mda: any;
    department: any;
    specialization: any;
    role: any;
    email: any;
    phone: any;
    home_address: any;
    office_address: any;
    staff_no: any;
    profile_pic: any;
    training_status: any;
  }) => {
    // handle form submission here
    values.profile_pic = defaultPayload.profile_pic;
    mutate(values);
  };

  const schema = Yup.object({
    fullname: Yup.string().required("Required"),
    job_title: Yup.string().required("Required"),
    mda: Yup.string().required("Required"),
    department: Yup.string().required("Required"),
    specialization: Yup.string(),
    role: Yup.string().required("Required"),
    email: Yup.string().email("Invalid Email Address").required("Required"),
    phone: Yup.string().required("Required"),
    home_address: Yup.string().required("Required"),
    office_address: Yup.string().required("Required"),
    staff_no: Yup.string().required("Required"),
    profile_pic: Yup.string(),
    training_status: Yup.string().required("Required"),
  });

  const mergeArraysToObject = () => {
    const obj = rolesArr.reduce((acc: any, key: any, index: number) => {
      acc[key] = rolesIdArr[index];
      return acc;
    }, {});

    return obj;
  };

  const mergedObject = mergeArraysToObject();

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
          const {
            handleSubmit,
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            setFieldValue,
          } = formik;
          return (
            <div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  <BaseFormInput
                    type="text"
                    label="Full Name"
                    placeholder="Halima Hassani"
                    name="fullname"
                    value={values.fullname}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "fullname")}
                  />
                  <BaseFormInput
                    type="text"
                    label="Job Title"
                    placeholder=""
                    name="job_title"
                    value={values.job_title}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "job_title")}
                  />
                  {/* <BaseFormSelect
                    data={mdaArr}
                    placeholder="Select MDA"
                    label="MDA"
                    name="mda"
                    value={values.mda}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "mda")}
                  /> */}
                  <BaseFormSelectSearch
                    instanceId={"select-mda"}
                    placeholder="Select MDA"
                    label="MDA"
                    options={optionArr}
                    value={values.mda}
                    onBlur={handleBlur}
                    onChange={(value: any) => {
                      setFieldValue("mda", value.value);
                    }}
                    error={errorParser(errors, touched, "mda")}
                  />
                  <BaseFormInput
                    type="text"
                    label="Department"
                    placeholder=""
                    name="department"
                    value={values.department}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "department")}
                  />
                  <BaseFormInput
                    type="text"
                    label="Specialization"
                    placeholder=""
                    name="specialization"
                    value={values.specialization}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "specialization")}
                  />
                  <label className="mt-5 text-sm block font-bold text-gray-700">
                    Role
                    <select
                      name="role"
                      className="block w-full rounded-md border-[1px] py-3 px-4 text-sm text-gray-600 bg-gray-100"
                      onChange={handleChange}
                      value={values.role}
                    >
                      <option>Select role</option>
                      {Object.keys(mergedObject).map(
                        (key: any, index: number) => (
                          <option key={index} value={mergedObject[key]}>
                            {key}
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  {/* <BaseFormSelect
                    data={roles}
                    label="Role"
                    placeholder="Select role"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "role")}
                  /> */}
                  <BaseFormInput
                    type="email"
                    label="Email"
                    placeholder="halimahassani@gmail.com"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "email")}
                  />
                  <BaseFormInput
                    type="text"
                    label="Mobile Number"
                    placeholder="0900000049403"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "phone")}
                  />
                  <BaseFormInput
                    type="text"
                    label="Office Address"
                    placeholder=""
                    name="office_address"
                    value={values.office_address}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "office_address")}
                  />
                  <BaseFormInput
                    type="text"
                    label="Home Address"
                    placeholder=""
                    name="home_address"
                    value={values.home_address}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "home_address")}
                  />
                  <BaseFormInput
                    type="text"
                    label="Staff Number"
                    placeholder="FD1234"
                    name="staff_no"
                    value={values.staff_no}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "staff_no")}
                  />
                  <BaseFormSelect
                    data={[
                      "Fundamental One",
                      "Fundamental Two",
                      "Advanced",
                      "Masterclass",
                      "Not Certified",
                    ]}
                    placeholder="Select status"
                    label="Training Status"
                    name="training_status"
                    value={values.training_status}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "training_status")}
                  />
                </div>
                <div className="grid grid-cols-1 mt-5">
                  <BaseFormInput
                    label="Profile picture"
                    name="profile_pic"
                    id="profile_pic"
                    type="file"
                    value={""}
                    accept={"image/*"}
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
                      if (event.currentTarget.files != null) {
                        // setFile(event.currentTarget.files[0]);
                        // eslint-disable-next-line @typescript-eslint/no-floating-promises
                        const fileData = await uploadFile(event, 1);
                        setAttach(fileData.file_url);
                      }
                    }}
                    error={errorParser(errors, touched, "profile_pic")}
                  />
                </div>

                <div className="flex flex-row gap-10 my-10 justify-start align-middle w-full">
                  <div className="my-auto">
                    <SubmitButton
                      type="submit"
                      className="relative w-fit flex flex-row justify-center btn-shadow bg-green py-3 px-5 rounded-lg text-white text-sm font-semibold hover:bg-green/80 transition-all"
                    >
                      <IoMdAdd className="h-5 w-5" />
                      <p className="ml-3 my-auto">Save User</p>
                    </SubmitButton>
                  </div>
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddUserForm;
