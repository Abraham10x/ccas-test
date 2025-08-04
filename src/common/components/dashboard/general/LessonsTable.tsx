/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/jsx-key */
import React, { FC, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridActionsCellItem,
  GridSortModel,
} from "@mui/x-data-grid";
import lessonQueries from "@lib/queries/lesson-learnt";
import { useRouter } from "next/router";
import { retrieveToken, storeToken } from "@lib/helper";
import { Visibility } from "@mui/icons-material";

const LessonsTable: FC = () => {
  const [pageSize, setPageSize] = React.useState<number>(5);

  const router = useRouter();
  const lessonResponse = lessonQueries.readAll();
  const lessonData =
    lessonResponse?.data?.data?.lessons === undefined
      ? []
      : lessonResponse?.data?.data?.lessons;

  const handleView = async (id: any) => {
    storeToken("lessonId", id);
    const userType = retrieveToken("userType");
    let url;

    switch (userType) {
      case "Super Admin":
        url = `/dashboard/superadmin/lessons-learnt/${id}`;
        break;
      case "Legal Adviser":
        url = `/dashboard/legal-adviser/lessons-learnt/${id}`;
        break;
      case "Procurement":
        url = `/dashboard/procurement/lessons-learnt/${id}`;
        break;
      case "FMOJ system authorizer":
        url = `/dashboard/system-authorizer/lessons-learnt/${id}`;
        break;
      case "legal-director":
        url = `/dashboard/legal-director/lessons-learnt/${id}`;
        break;
      default:
        break;
    }
    await router.push({
      pathname: url,
    });
  };

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "id",
      sort: "desc",
    },
  ]);

  const columns = [
    {
      field: "",
      type: "actions",
      headerName: "Action",
      width: 100,
      getActions: (params: any) => [
        // <Link href={`/dashboard/superadmin/editRole/${params.id}`}>
        <GridActionsCellItem
          icon={<Visibility />}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            handleView(params.id);
          }}
          label="View Lesson"
          showInMenu
        />,
        // <GridActionsCellItem
        //   icon={<Delete />}
        //   label="Delete Lesson"
        //   showInMenu
        // />,
      ],
    },
    { field: "id", headerName: "ID", width: 100 },
    { field: "contracts_title", headerName: "CONTRACT TITLE", width: 200 },
    {
      field: "scope_of_work",
      headerName: "SCOPE OF WORK",
      width: 230,
    },
    {
      field: "community_issues",
      headerName: "COMMUNITY ISSUES",
      width: 200,
    },
    {
      field: "cost_control",
      headerName: "COST CONTROL",
      width: 200,
    },
    {
      field: "key_risks",
      headerName: "KEY RISKS",
      width: 200,
    },
    {
      field: "location",
      headerName: "LOCATION",
      width: 200,
    },
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
    <div className="mt-8 mb-20">
      <div
        className="h-auto"
        style={{
          width: "100%",
        }}
      >
        <DataGrid
          components={{
            Toolbar: CustomToolbar,
          }}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          autoHeight
          pagination
          rows={lessonData}
          columns={columns}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
        />
      </div>
    </div>
  );
};

export default LessonsTable;
