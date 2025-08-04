/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { SubmitButton } from "@components/application/base/Button";
import authQueries from "@lib/queries/auth";
import superAdminQueries from "@lib/queries/role";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { errorParser } from "@lib/helper";
import BaseFormSelectSearch from "@components/application/base/form/BaseFormSelectSearch";
import activityLogQueries from "@lib/queries/activity-log";
import axios from "axios";
import BaseFormSelect from "@components/application/base/form/BaseFormSelect";

const ActivityLogTable: FC = () => {
  const allUsers = authQueries.getAllUsers();
  const allMdas = superAdminQueries.getMda();
  const getAllLogs = activityLogQueries.getAllActivity();
  const [search, setSearch] = useState();
  const { mutate } = activityLogQueries.getActivity();
  const [pageSize, setPageSize] = useState<number>(5);
  const allActivityLogs = getAllLogs?.data?.data?.activities;
  const [activity, setActivity] = useState<readonly any[]>([]);

  useEffect(() => {
    if (allActivityLogs) {
      setActivity(allActivityLogs);
    }
  }, [allActivityLogs]);

  // eslint-disable-next-line @typescript-eslint/no-floating-promises

  const getAllUser = () => {
    const usersArr: any[] = [];
    allUsers.data?.data?.user.forEach((item: any) => {
      usersArr.push({ id: item.id, fullname: item.fullname });
    });

    return { usersArr };
  };

  const getAllMda = () => {
    const mdaArr: string[] = [];
    allMdas.data?.data?.mdas.forEach((item: any) => {
      mdaArr.push(item.title);
    });

    return { mdaArr };
  };

  const { mdaArr } = getAllMda();

  const { usersArr } = getAllUser();

  const arrangeUserValue = () => {
    const optionArr: any[] = [];
    usersArr.map((user) => {
      optionArr.push({ value: user.id, label: user.fullname });
    });
    return optionArr;
  };

  const arrangeMdaValue = () => {
    const optionArr: any[] = [];
    mdaArr.map((mda) => {
      optionArr.push({ value: mda, label: mda });
    });
    return optionArr;
  };

  const optionMdaArr = arrangeMdaValue();

  const optionUserArr = arrangeUserValue();

  const defaultUserPayload = {
    users_id: "",
    mda: "",
  };
  const [Payload] = useState(defaultUserPayload);

  const onSubmit = async (values: { users_id: string; mda: string }) => {
    // handle form submission here
    setActivity([]);
    await getUserActivity(values);
    mutate(values);
  };

  const schema = Yup.object({
    users_id: Yup.string(),
    mda: Yup.string(),
  });

  const getUserActivity = async (values: any) => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reports/audit_trail.php?${
        values.users_id ? `users_id=${values.users_id}` : `mda=${values.mda}`
      }`
    );
    setActivity(data?.data?.activities);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "done_by", headerName: "ROLE", width: 250 },
    { field: "mda", headerName: "MDA", width: 250 },
    { field: "date_performed", headerName: "DATE", width: 200 },
    { field: "action_performed", headerName: "ACTION PERFORMED", width: 400 },
  ];

  const CustomToolbar: React.FunctionComponent<{
    setFilterButtonEl: React.Dispatch<
      React.SetStateAction<HTMLButtonElement | null>
    >;
  }> = ({ setFilterButtonEl }) => (
    <GridToolbarContainer>
      <GridToolbarFilterButton ref={setFilterButtonEl} />
      <GridToolbarExport />
    </GridToolbarContainer>
  );

  return (
    <>
      <div className="">
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <BaseFormSelect
            className={"py-1"}
            data={["user", "mda"]}
            placeholder="Select Search"
            enabled={true}
            name="search"
            label="Search By"
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
          />
        </div>
        {search && (
          <Formik
            enableReinitialize
            initialValues={Payload}
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
                handleBlur,
                setFieldValue,
                touched,
                errors,
              } = formik;
              return (
                <div className="sm:py-4">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-x-6 w-full sm:w-1/2 lg:w-1/3">
                      {search === "user" && (
                        <BaseFormSelectSearch
                          instanceId={"select-user"}
                          placeholder="Select user"
                          label="Select User"
                          options={optionUserArr}
                          value={values.users_id}
                          onBlur={handleBlur}
                          onChange={(value: any) => {
                            setFieldValue("users_id", value.value);
                          }}
                          error={errorParser(errors, touched, "users_id")}
                        />
                      )}
                      {/* <h3 className="text-xl sm:text-2xl font-medium my-3">OR</h3> */}
                      {search === "mda" && (
                        <BaseFormSelectSearch
                          // className="mt-0"
                          instanceId={"select-mda"}
                          placeholder="Select MDA"
                          label="Select MDA"
                          options={optionMdaArr}
                          value={values.mda}
                          onBlur={handleBlur}
                          onChange={(value: any) => {
                            setFieldValue("mda", value.value);
                          }}
                          error={errorParser(errors, touched, "mda")}
                        />
                      )}
                    </div>
                    <div className="flex justify-start items-center gap-x-5 py-5">
                      <SubmitButton
                        type="submit"
                        className="bg-green text-white "
                      >
                        Submit
                      </SubmitButton>
                    </div>
                  </form>
                </div>
              );
            }}
          </Formik>
        )}
        <div className="mt-8 mb-20">
          <div style={{ height: "auto", width: "100%" }}>
            <DataGrid
              components={{
                Toolbar: CustomToolbar,
              }}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20, 50, 100]}
              checkboxSelection
              pagination
              autoHeight
              rows={activity || []}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityLogTable;
