/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/jsx-key */
import React, { FC, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridActionsCellItem,
  GridRowParams,
  GridSortModel,
} from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CancelIcon from "@mui/icons-material/Cancel";
import { Edit } from "@mui/icons-material";
import contractRegQueries from "@lib/queries/contract-reg";
import { readableDate, retrieveToken, storeToken } from "@lib/helper";
import { useRouter } from "next/router";
import NotificationUpload from "@components/dashboard/system-authorizer/upload/UploadCopyModal";
import AssignReviewerModal from "./modal/AssignReviewerModal";
import requestQueries from "@lib/queries/requests";

const ContractsTable: FC = () => {
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [showModal, setShowModal] = useState(false);
  const [showReviewer, setShowReviewer] = useState(false);
  const [contractID, setContractID] = useState<any>();
  const [actionStatus, setActionStatus] = useState<any>("");
  const [eTitle, setETitle] = useState("");
  const { mutate } = requestQueries.handleContractRequest(actionStatus);

  const router = useRouter();

  const handleAssign = (contractId: any, title: any) => {
    storeToken("eID", contractId);
    setShowReviewer((prev) => !prev);
    setContractID(contractId);
    setETitle(title);
  };

  const handleEditForm = (contractId: any) => {
    storeToken("contractID", contractId);
    void router.push(`/dashboard/legal-adviser/edit-contract/${contractId}`);
  };

  const userId = retrieveToken("userId");
  const userType = retrieveToken("userType");
  const mda = retrieveToken("mda");
  let response;
  switch (userType) {
    case "Super Admin":
      response = contractRegQueries.readAll();
      break;
    case "Legal Adviser":
      response = contractRegQueries.readByUserId(userId);
      break;
    case "Procurement":
      response = contractRegQueries.readByOnlyMda(mda);
      break;
    case "FMOJ system authorizer":
      response = contractRegQueries.readAll();
      break;
    case "Legal Director":
      response = contractRegQueries.readByOnlyMda(mda);
      break;
    case "FMOJ Reviewer":
      response = contractRegQueries.readByReviewer(userId);
      break;
    case "external reviewer":
      response = contractRegQueries.readByReviewer(userId);
      break;
    default:
      break;
  }
  const contracts =
    response?.data?.data?.contracts === undefined
      ? []
      : response?.data?.data?.contracts;

  const handleModal = (id: any, action: string) => {
    setShowModal((prev) => !prev);
    setContractID(id);
    setActionStatus(action);
    const values = {
      id: id,
      status: action,
      users_id: userId,
    };

    mutate(values);
  };

  const handleView = async (id: any) => {
    storeToken("contractID", id);
    const userType = retrieveToken("userType");
    let url;

    switch (userType) {
      case "Super Admin":
        url = `/dashboard/superadmin/contracts/${id}`;
        break;
      case "Legal Adviser":
        url = `/dashboard/legal-adviser/contracts/${id}`;
        break;
      case "Procurement":
        url = `/dashboard/procurement/contracts/${id}`;
        break;
      case "FMOJ system authorizer":
        url = `/dashboard/system-authorizer/contracts/${id}`;
        break;
      case "Legal Director":
        url = `/dashboard/legal-director/contracts/${id}`;
        break;
      case "FMOJ Reviewer":
        url = `/dashboard/reviewer/contracts/${id}`;
        break;
      case "external reviewer":
        url = `/dashboard/reviewer/contracts/${id}`;
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
      field: "contract_id",
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
        {
          icon: <VisibilityIcon />,
          label: "View contract",
          onClick: () => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            handleView(params.id);
          },
          showInMenu: true,
        } as any,
        ...(userType === "FMOJ system authorizer" &&
        (params.row.status === "PENDING" || params.row.status === "Rejected")
          ? [
              {
                icon: <CheckCircleIcon color="success" />,
                label: "Approve contract document",
                onClick: () => {
                  handleModal(params.id, "Approved");
                },
                showInMenu: true,
                sx: { color: "green" },
              } as any,
            ]
          : []),
        ...(userType === "FMOJ system authorizer" &&
        params.row.status === "PENDING"
          ? [
              {
                icon: <CancelIcon color="error" />,
                label: "Reject contract document",
                onClick: () => {
                  handleModal(params.id, "Rejected");
                },
                showInMenu: true,
                sx: { color: "red" },
              } as any,
            ]
          : []),
        ...(userType === "FMOJ system authorizer"
          ? [
              {
                icon: <PersonAddIcon />,
                label: "Assign Reviewer",
                onClick: () => {
                  handleAssign(params.id, params.row.title);
                },
                showInMenu: true,
              } as any,
            ]
          : []),
        ...((userType === "Legal Adviser" || userType === "Procurement") &&
        params.row.status === "Rejected"
          ? [
              {
                icon: <Edit />,
                label: "Edit Form",
                onClick: () => {
                  handleEditForm(params.id);
                },
                showInMenu: true,
              } as any,
            ]
          : []),
      ],
    },
    { field: "contract_id", headerName: "CONTRACT ID", width: 150 },
    { field: "title", headerName: "TITLE", width: 230 },
    { field: "mda", headerName: "MDA", width: 200 },
    { field: "bpp", headerName: "TYPOLOGY 1", width: 150 },
    { field: "typology", headerName: "TYPOLOGY 2", width: 150 },
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
              : row.status === "PENDING"
              ? "bg-[#FFFED6] text-[#8D8A00]"
              : ""
          }`}
        >
          {row.status}
        </button>
      ),
      width: 100,
    },
    {
      field: "created_at",
      headerName: "DATE CREATED",
      width: 150,
      renderCell: ({ row }: Partial<GridRowParams>) => (
        <p>{readableDate(row?.created_at)}</p>
      ),
    },
    { field: "duration", headerName: "DURATION", width: 150 },
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
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
          rows={contracts}
          columns={columns}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
        />
      </div>
      {userType === "FMOJ system authorizer" ? (
        <div>
          <NotificationUpload
            id={contractID}
            status={actionStatus}
            stage={"contracts"}
            showModal={showModal}
          />
        </div>
      ) : (
        <></>
      )}
      <AssignReviewerModal
        contractId={contractID}
        title={eTitle}
        formType="contracts"
        showModal={showReviewer}
        setShowModal={setShowReviewer}
      />
    </div>
  );
};

export default ContractsTable;
