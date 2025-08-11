/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridActionsCellItem,
  GridRowParams,
  GridSortModel,
  GridColDef,
} from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { readableDate, retrieveToken, storeToken } from "@lib/helper";
import { Visibility, Assessment } from "@mui/icons-material";
import closeoutQueries from "@lib/queries/close-out";

const CloseOutTable = () => {
  const [pageSize, setPageSize] = useState<number>(5);
  const router = useRouter();
  const userId = retrieveToken("userId");
  const mda = retrieveToken("mda");
  const userType = retrieveToken("userType");

  let apiResponse;
  switch (userType) {
    case "Super Admin":
      apiResponse = closeoutQueries.readAll();
      break;
    case "Legal Adviser":
      apiResponse = closeoutQueries.readByUserId(userId);
      break;
    case "Procurement":
      apiResponse = closeoutQueries.readByUserId(userId);
      break;
    case "FMOJ system authorizer":
      apiResponse = closeoutQueries.readAll();
      break;
    case "Legal Director":
      apiResponse = closeoutQueries.readByMda(mda);
      break;
    case "FMOJ Reviewer":
      apiResponse = closeoutQueries.readByReviewer(userId);
      break;
    case "external reviewer":
      apiResponse = closeoutQueries.readByReviewer(userId);
      break;
    default:
  }
  const closeoutData =
    apiResponse?.data?.data?.contractStatus === undefined
      ? []
      : apiResponse?.data?.data?.contractStatus;

  const handleView = async (id: any) => {
    storeToken("closeId", id);
    let url;

    switch (userType) {
      case "Super Admin":
        url = `/dashboard/superadmin/closeout/${id}`;
        break;
      case "Legal Adviser":
        url = `/dashboard/legal-adviser/closeout/${id}`;
        break;
      case "FMOJ system authorizer":
        url = `/dashboard/system-authorizer/closeout/${id}`;
        break;
      case "Legal Director":
        url = `/dashboard/legal-director/closeout/${id}`;
        break;
      case "FMOJ Reviewer":
        url = `/dashboard/reviewer/closeout/${id}`;
        break;
      case "external reviewer":
        url = `/dashboard/reviewer/closeout/${id}`;
        break;
      default:
        break;
    }
    await router.push({
      pathname: url,
    });
  };

  const handleViewEvaluation = async (id: any) => {
    storeToken("contractID", id);
    let url;

    switch (userType) {
      case "Super Admin":
        url = `/dashboard/superadmin/view-evaluation/${id}`;
        break;
      case "Legal Adviser":
        url = `/dashboard/legal-adviser/view-evaluation/${id}`;
        break;
      case "FMOJ system authorizer":
        url = `/dashboard/system-authorizer/view-evaluation/${id}`;
        break;
      case "Legal Director":
        url = `/dashboard/legal-director/view-evaluation/${id}`;
        break;
      case "FMOJ Reviewer":
        url = `/dashboard/reviewer/view-evaluation/${id}`;
        break;
      case "external reviewer":
        url = `/dashboard/reviewer/view-evaluation/${id}`;
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
      field: "actions",
      type: "actions" as const,
      headerName: "Action",
      width: 100,
      getActions: (params: any) => {
        const actions = [
          <GridActionsCellItem
            key="view"
            icon={<Visibility />}
            onClick={() => {
              handleView(params.id);
            }}
            label="View details"
            showInMenu
          />,
        ];

        // Conditionally add evaluation action
        if (
          userType === "Legal Adviser" &&
          params.row.contractor_evaluation === null
        ) {
          actions.push(
            <GridActionsCellItem
              key="evaluate"
              icon={<Assessment />}
              onClick={() => {
                storeToken("contractTitle", params.row.contract_title);
                storeToken("startDate", params.row.start_date);
                storeToken("endDate", params.row.end_date);
                storeToken("contractID", params.row.contract_id);
                router.push(
                  `/dashboard/legal-adviser/evaluate-contractor/${params.row.contract_id}`
                );
              }}
              label="Evaluate Contractor"
              showInMenu
            />
          );
        }

        // Conditionally add view evaluation action
        if (params.row.contractor_evaluation === "Evaluated") {
          actions.push(
            <GridActionsCellItem
              key="view-evaluation"
              icon={<Visibility />}
              onClick={() => {
                handleViewEvaluation(params.row.contract_id);
              }}
              label="View Evaluation"
              showInMenu
            />
          );
        }

        return actions;
      },
    },
    { field: "contractId", headerName: "CONTRACT ID", width: 150 },
    { field: "id", headerName: "ID", width: 100 },
    { field: "contract_title", headerName: "CONTRACT TITLE", width: 200 },
    {
      field: "contract_scope",
      headerName: "CONTRACT SCOPE",
      width: 200,
    },
    {
      field: "start_date",
      headerName: "START DATE",
      width: 200,
      renderCell: ({ row }: Partial<GridRowParams>) => (
        <p>{readableDate(row?.start_date)}</p>
      ),
    },
    {
      field: "end_date",
      headerName: "END DATE",
      width: 200,
      renderCell: ({ row }: Partial<GridRowParams>) => (
        <p>{readableDate(row?.end_date)}</p>
      ),
    },
    {
      field: "contractors_name",
      headerName: "CONTRACTORS NAME",
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
          rows={closeoutData}
          columns={columns}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
        />
      </div>
    </div>
  );
};

export default CloseOutTable;
