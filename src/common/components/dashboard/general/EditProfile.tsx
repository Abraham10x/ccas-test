/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC, useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import BaseFormInput, {
  LinearProgressWithLabel,
} from "../../application/base/form/BaseFormInput";
import { SubmitButton } from "../../application/base/Button";
import { errorParser, retrieveToken } from "@lib/helper";
import superAdminQueries from "@lib/queries/role";
import authQueries from "@lib/queries/auth";
import axios from "axios";
import { useRouter } from "next/router";
import BaseFormSelectSearch from "@components/application/base/form/BaseFormSelectSearch";
import useUpload from "@lib/hooks/useUpload";
import { Box } from "@mui/material";
import BaseFormSelect from "@components/application/base/form/BaseFormSelect";

const EditProfile: FC = () => {
  const [userData, setUserData] = useState<any>({});

  const userType = retrieveToken("userType");

  const userId = retrieveToken("userId");
  const router = useRouter();
  const query = router.query;
  const uid = query.pid;

  const allMdas = superAdminQueries.getMda();
  const allRoles = superAdminQueries.getRoles();

  const [attach, setAttach] = useState<any>();
  const { data, uploaded, upload, progress, uploadFile } = useUpload();

  const getAllMda = () => {
    const mdaArr: string[] = [];
    allMdas.data?.data?.mdas.forEach((item: any) => {
      mdaArr.push(item.title);
    });

    return { mdaArr };
  };

  const getRoles = () => {
    const rolesArr: string[] = [];
    const rolesIdArr: number[] = [];
    allRoles.data?.data?.roles.forEach((item: any) => {
      rolesArr.push(item.title);
      rolesIdArr.push(item.id);
    });

    return { rolesArr, rolesIdArr };
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
  const mergeArraysToObject = () => {
    const obj = rolesArr.reduce((acc: any, key: any, index: number) => {
      acc[key] = rolesIdArr[index];
      return acc;
    }, {});

    return obj;
  };

  const mergedObject = mergeArraysToObject();

  useEffect(() => {
    const getUserData = async () => {
      const url = `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/users/get_user.php?user_id=${uid === undefined ? userId : uid}`;
      const response = await axios.get(url);
      const data = response?.data?.user_details;
      setUserData(data);
      return userData;
    };

    const timer = setTimeout(() => {
      getUserData();
      // getUserPermission();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const { mutate } = authQueries.editUser();

  const defaultPayload = {
    users_id: userData?.user_id,
    fullname: userData?.fullname,
    job_title: userData?.title_of_legal_adviser,
    mda: userData?.mda,
    department: userData?.department,
    specialization: userData?.specialization,
    role: userData?.role_id,
    role_title: userData?.role,
    email: userData?.email,
    phone: userData?.phone,
    home_address: userData?.home_address,
    office_address: userData?.office_address,
    staff_no: userData?.staff_no,
    training_status: userData?.training_status,
    profile_pic: attach ?? userData?.profile_picture,
  };

  const onSubmit = async (values: {
    users_id: any;
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
    training_status: any;
    profile_pic: any;
  }) => {
    // handle form submission here
    values.profile_pic = defaultPayload.profile_pic;
    mutate(values);
  };

  const schema = Yup.object({
    // users_id: Yup.string(),
    // fullname: Yup.string(),
    // job_title: Yup.string(),
    // mda: Yup.string(),
    // department: Yup.string(),
    // specialization: Yup.string(),
    // role: Yup.string(),
    // email: Yup.string().email("Invalid Email Address"),
    // phone: Yup.string(),
    // home_address: Yup.string(),
    // office_address: Yup.string(),
    // staff_no: Yup.string(),
    // training_status: Yup.string(),
    // profile_pic: Yup.string(),
  });

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={defaultPayload}
        validationSchema={schema}
        onSubmit={async (values) => {
          await onSubmit(values);
        }}
      >
        {(formik) => {
          const {
            handleSubmit,
            values,
            errors,
            touched,
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
                    placeholder="Firstname Lastname"
                    name="fullname"
                    value={values.fullname}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "fullname")}
                    disabled={userType !== "Super Admin"}
                  />
                  <BaseFormInput
                    type="text"
                    label="Job Title"
                    placeholder=""
                    name="job_title"
                    value={values.job_title}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "job_title")}
                    disabled={userType !== "Super Admin"}
                  />
                  <BaseFormSelectSearch
                    instanceId={"select-mda"}
                    placeholder={values.mda}
                    label="MDA"
                    options={optionArr}
                    value={values.mda}
                    onChange={(value: any) => {
                      setFieldValue("mda", value.value);
                    }}
                    error={errorParser(errors, touched, "mda")}
                    // disabled
                    disabled={userType !== "Super Admin"}
                  />
                  <BaseFormInput
                    type="text"
                    label="Department"
                    placeholder=""
                    name="department"
                    value={values.department}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "department")}
                    disabled={userType !== "Super Admin"}
                  />
                  <BaseFormInput
                    type="text"
                    label="Specialization"
                    placeholder=""
                    name="specialization"
                    value={values.specialization}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "specialization")}
                    disabled={userType !== "Super Admin"}
                  />

                  <label className="mt-5 text-sm block font-bold text-gray-700">
                    Role
                    <select
                      name="role"
                      className="block w-full rounded-md border-[1px] py-3 px-4 text-sm text-gray-600 bg-gray-100"
                      onChange={handleChange}
                      value={values.role}
                      disabled={userType !== "Super Admin"}
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
                  <BaseFormInput
                    type="email"
                    label="Email"
                    placeholder="halimahassani@gmail.com"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "email")}
                    disabled={userType !== "Super Admin"}
                  />
                  <BaseFormInput
                    type="text"
                    label="Mobile Number"
                    placeholder="0900000049403"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "phone")}
                    disabled={userType !== "Super Admin"}
                  />
                  <BaseFormInput
                    type="text"
                    label="Office Address"
                    placeholder=""
                    name="office_address"
                    value={values.office_address}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "office_address")}
                    disabled={userType !== "Super Admin"}
                  />
                  <BaseFormInput
                    type="text"
                    label="Home Address"
                    placeholder=""
                    name="home_address"
                    value={values.home_address}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "home_address")}
                    disabled={userType !== "Super Admin"}
                  />
                  <BaseFormInput
                    type="text"
                    label="Staff Number"
                    placeholder="FD1234"
                    name="staff_no"
                    value={values.staff_no}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "staff_no")}
                    disabled={userType !== "Super Admin"}
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
                    onChange={handleChange}
                    error={errorParser(errors, touched, "training_status")}
                    disabled={userType !== "Super Admin"}
                  />

                  {/* <div className="grid grid-cols-1 gap-x-6">
                    <BaseFormInput
                      type="file"
                      name="profile_pic"
                      label="Profile Picture"
                      value={values.profile_pic}
                      onChange={handleChange}
                      className="h-40"
                      // error={}
                    />
                  </div> */}
                  {/* <BaseFormInput
                    placeholder="xxxxxxxxx"
                    label="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    error={errorParser(errors, touched, "password")}
                  /> */}
                </div>
                <div className="grid grid-cols-1 gap-y-2">
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
                <div className="flex flex-row gap-10 mt-10 mb-10 justify-start align-middle w-full">
                  <div className="my-auto">
                    <SubmitButton
                      type="submit"
                      className=" bg-green text-white"
                    >
                      <p className="ml-3 my-auto">Update profile</p>
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

export default EditProfile;
