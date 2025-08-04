/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/jsx-key */
import React, { FC, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridColumns,
  GridRowParams,
  GridActionsCellItem,
  GridSortModel,
} from "@mui/x-data-grid";
import { readableDate, retrieveToken } from "@lib/helper";
import RequestuserQueries from "@lib/queries/request-user";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
// import { UserAddIcon } from "@heroicons/react/outline";
import { VerifiedUserRounded } from "@mui/icons-material";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const RequestsTable: FC = () => {
  const [pageSize, setPageSize] = React.useState<number>(5);

  const userType = retrieveToken("userType");
  const mdas = retrieveToken("mda");
  let response;
  switch (userType) {
    case "Super Admin":
      response = RequestuserQueries.getAllRequest();
      break;
    case "FMOJ system authorizer":
      response = RequestuserQueries.getAllRequest();
      break;
    case "Legal Director":
      response = RequestuserQueries.getRequest(mdas);
      break;
    default:
      break;
  }

  const requests =
    response?.data?.data?.users === undefined
      ? []
      : response?.data?.data?.users;

  type Row = typeof requests[number];

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "id",
      sort: "desc",
    },
  ]);

  const { mutate } = RequestuserQueries.updateStatus();

  const handleView = async (request_id: number, approval_status: string) => {
    const action = {
      request_id,
      approval_status,
    };
    switch (approval_status) {
      case "Approved":
        mutate(action);
        break;
      case "Rejected":
        mutate(action);
        break;
      default:
        break;
    }
  };

  const certifyUser = async (id: any, email: any) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/certify_user.php`;
    try {
      await axios.post(url, { id, email });
      toast.success("User certified successfully! 🎉");
    } catch (err: any) {
      toast.error("Error certifying user!");
    }
  };

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      {
        field: "actions",
        type: "actions",
        headerName: "Action",
        width: 200,
        getActions: (params: any) => [
          // <GridActionsCellItem
          //   onClick={() => {
          //     // eslint-disable-next-line @typescript-eslint/no-floating-promises
          //     // handleView(params.id);
          //   }}
          //   icon={<CheckCircleIcon />}
          //   label="View more"
          //   showInMenu={true}
          // />,
          userType === "FMOJ system authorizer" &&
          (params.row.status === "Pending" ||
            params.row.status === "Rejected") ? (
            <GridActionsCellItem
              icon={<CheckCircleIcon color="success" />}
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                handleView(params.id, "Approved");
              }}
              style={{ color: "green" }}
              label="Approve Request"
              showInMenu={true}
            />
          ) : (
            <></>
          ),
          userType === "FMOJ system authorizer" &&
          params.row.status === "Pending" ? (
            <GridActionsCellItem
              icon={<CancelIcon color="error" />}
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                handleView(params.id, "Rejected");
              }}
              style={{ color: "red" }}
              label="Reject Request"
              showInMenu={true}
            />
          ) : (
            <></>
          ),
          userType === "Super Admin" && params.row.status === "Approved" ? (
            <GridActionsCellItem
              icon={<VerifiedUserRounded />}
              onClick={async () => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                certifyUser(params.id, params.row.email);
              }}
              label="Create User"
              showInMenu={true}
            />
          ) : params.row.status === "Certified" ? (
            <></>
          ) : (
            <></>
          ),
        ],
      },
      { field: "id", headerName: "ID", width: 100 },
      { field: "fullname", headerName: "FULL NAME", width: 200 },
      { field: "role", headerName: "ROLE", width: 200 },
      { field: "email", headerName: "EMAIL", width: 200 },
      {
        field: "legal_title",
        headerName: "JOB TITLE",
        width: 200,
      },
      { field: "mda", headerName: "MDA", width: 150 },
      {
        field: "status",
        headerName: "STATUS",
        sortable: false,
        renderCell: ({ row }: Partial<GridRowParams>) => (
          <button
            className={`rounded-xl py-2 px-5 ${
              row.status === "Approved"
                ? "bg-green/10 text-green "
                : row.status === "Rejected"
                ? "bg-[#F86652]/10 text-[#F86652]"
                : row.status === "Pending"
                ? "bg-[#FFFED6] text-[#8D8A00]"
                : row.status === "Certified"
                ? "bg-[#ffd8f7] text-[#360a36]"
                : ""
            }`}
          >
            {row.status}
          </button>
        ),
        width: 200,
      },
      {
        field: "requested_on",
        headerName: "REQUEST DATE",
        width: 150,
        renderCell: ({ row }: Partial<GridRowParams>) => (
          <p>{readableDate(row?.requested_on)}</p>
        ),
      },
    ],
    []
  );

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
      <Toaster position="top-right" reverseOrder={false} />
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
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          autoHeight
          pagination
          rows={requests}
          columns={columns}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
        />
      </div>
    </div>
  );
};

export default RequestsTable;
