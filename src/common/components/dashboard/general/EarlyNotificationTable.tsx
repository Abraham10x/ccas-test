/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/jsx-key */
import React, { FC, useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridActionsCellItem,
  GridRowParams,
  GridSortModel,
} from "@mui/x-data-grid";
import { BiFile } from "react-icons/bi";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import earlyQueries from "@lib/queries/early-notification";
import { readableDate, retrieveToken, storeToken } from "@lib/helper";
import { Toaster } from "react-hot-toast";
import { UseQueryResult } from "@tanstack/react-query";
import EarlyNotificationUpload from "@components/dashboard/system-authorizer/upload/UploadCopyModal";
import { useRouter } from "next/router";
import AssignReviewerModal from "./modal/AssignReviewerModal";
import { Edit } from "@mui/icons-material";

const FormTable: FC = () => {
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [actionStatus, setActionStatus] = useState<any>("");
  const [showModal, setShowModal] = useState(false);
  const [showReviewer, setShowReviewer] = useState(false);
  const [eID, setEID] = useState("");
  const [eTitle, setETitle] = useState("");
  // const [tableData, setTableData] = useState<any>([]);

  const router = useRouter();

  const handleAssign = (earlyId: any, title: any) => {
    storeToken("eID", earlyId);
    setShowReviewer((prev) => !prev);
    setEID(earlyId);
    setETitle(title);
  };

  const userId = retrieveToken("userId");
  const userType = retrieveToken("userType");
  const mda = retrieveToken("mda");
  let response: UseQueryResult<any, any>;

  switch (userType) {
    case "Super Admin":
      response = earlyQueries.readAll();
      break;
    case "Legal Adviser":
      response = earlyQueries.readAllByUserId(userId);
      break;
    case "Procurement":
      response = earlyQueries.readAllByMda(mda);
      break;
    case "FMOJ system authorizer":
      response = earlyQueries.readAll();
      break;
    case "Legal Director":
      response = earlyQueries.readAllByMda(mda);
      break;
    case "FMOJ Reviewer":
      response = earlyQueries.readByReviewer(userId);
      break;
    case "external reviewer":
      response = earlyQueries.readByReviewer(userId);
      break;
    default:
      break;
  }

  useEffect(() => {
    getDetails();
  }, []);
  // const getEventHistory = ()
  const getDetails = () => {
    const details =
      response?.data?.data?.notifications === undefined
        ? []
        : response?.data?.data?.notifications;

    // setTableData(details);
    return details;
  };

  const details = getDetails();

  const handleModal = (earlyId: any, action: string) => {
    storeToken("eID", earlyId);
    setShowModal((prev) => !prev);
    setEID(earlyId);
    setActionStatus(action);
  };

  const handleEditForm = (earlyId: any) => {
    storeToken("eID", earlyId);
    setEID(earlyId);
    router.push({ pathname: "/dashboard/legal-adviser/editEarlyNotification" });
  };

  const handleView = async (id: any) => {
    storeToken("earlyID", id);
    const userType = retrieveToken("userType");
    let url;

    switch (userType) {
      case "Super Admin":
        url = `/dashboard/superadmin/early-notification/${id}`;
        break;
      case "Legal Adviser":
        url = `/dashboard/legal-adviser/early-notification/${id}`;
        break;
      case "Procurement":
        url = `/dashboard/procurement/early-notification/${id}`;
        break;
      case "FMOJ system authorizer":
        url = `/dashboard/system-authorizer/early-notification/${id}`;
        break;
      case "Legal Director":
        url = `/dashboard/legal-director/early-notification/${id}`;
        break;
      case "FMOJ Reviewer":
        url = `/dashboard/reviewer/early-notification/${id}`;
        break;
      case "external reviewer":
        url = `/dashboard/reviewer/early-notification/${id}`;
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
      type: "actions",
      headerName: "Action",
      width: 100,
      getActions: (params: any) => [
        <GridActionsCellItem
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            handleView(params.id);
          }}
          icon={<VisibilityIcon />}
          label="View form"
          showInMenu={true}
        />,
        userType === "FMOJ system authorizer" &&
        (params.row.status === "PENDING" ||
          params.row.status === "Rejected") ? (
          <GridActionsCellItem
            onClick={() => {
              handleModal(params.id, "Approved");
            }}
            icon={<CheckCircleIcon color="success" />}
            style={{ color: "green" }}
            label="Accept form"
            showInMenu={true}
          />
        ) : (
          <></>
        ),
        userType === "FMOJ system authorizer" &&
        params.row.status === "PENDING" ? (
          <GridActionsCellItem
            onClick={() => {
              handleModal(params.id, "Rejected");
            }}
            icon={<CancelIcon color="error" />}
            style={{ color: "red" }}
            label="Return form"
            showInMenu={true}
          />
        ) : (
          <></>
        ),
        userType === "FMOJ system authorizer" ? (
          <GridActionsCellItem
            onClick={() => {
              handleAssign(params.id, params.row.request_form);
            }}
            icon={<PersonAddIcon />}
            label="Assign Reviewer"
            showInMenu={true}
          />
        ) : (
          <></>
        ),
        userType === "Legal Adviser" && params.row.status === "Rejected" ? (
          <GridActionsCellItem
            onClick={() => {
              handleEditForm(params.id);
            }}
            icon={<Edit />}
            label="Edit Form"
            showInMenu={true}
          />
        ) : (
          <></>
        ),
      ],
    },
    { field: "id", headerName: "FORM ID", width: 100 },
    { field: "request_form", headerName: "CONTRACT TITLE", width: 350 },
    { field: "mda", headerName: "MDA", width: 200 },
    {
      field: "status",
      headerName: "STATUS",
      renderCell: ({ row }: Partial<GridRowParams>) => (
        <button
          className={`rounded-xl py-2 px-5 ${
            row.status === "Approved"
              ? "bg-green/10 text-green "
              : row.status === "Rejected"
              ? "bg-[#F86652]/10 text-[#F86652]"
              : row.status === "PENDING"
              ? "bg-[#FFFED6] text-[#8D8A00]"
              : ""
          }`}
        >
          {row.status === "Approved"
            ? "Accepted"
            : row.status === "Rejected"
            ? "Returned"
            : row.status === "PENDING"
            ? "Pending"
            : ""}
        </button>
      ),
      width: 100,
    },
    {
      field: "date_created",
      headerName: "DATE CREATED",
      width: 150,
      renderCell: ({ row }: Partial<GridRowParams>) => (
        <p>{readableDate(row?.date_created)}</p>
      ),
    },
    {
      field: "file",
      headerName: "FILE UPLOADED",
      sortable: false,
      renderCell: ({ row }: Partial<GridRowParams>) => (
        <div className="flex flex-row justify-start gap-3">
          <BiFile className="text-[#003FC7] text-lg" />
          <p className="text-blue text-sm underline">
            <a
              href={row.file}
              rel="noopeneer noreferrer"
              target="_blank"
              download={row.file}
            >
              Click to download file
            </a>
          </p>
        </div>
      ),
      width: 150,
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
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          // checkboxSelection
          autoHeight
          pagination
          rows={details}
          columns={columns}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
        />
      </div>
      {eID === "" ? (
        <></>
      ) : (
        <div>
          <EarlyNotificationUpload
            id={eID}
            status={actionStatus}
            stage={"early_notifications"}
            showModal={showModal}
          />
        </div>
      )}
      {eID === "" ? (
        <></>
      ) : (
        <AssignReviewerModal
          contractId={eID}
          title={eTitle}
          formType="early_notifications"
          showModal={showReviewer}
          setShowModal={setShowReviewer}
        />
      )}
    </div>
  );
};

export default FormTable;
