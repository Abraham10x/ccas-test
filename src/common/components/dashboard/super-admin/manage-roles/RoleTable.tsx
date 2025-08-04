/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
import { Edit, Delete } from "@mui/icons-material";
import Image from "next/image";
import superAdminQueries from "@lib/queries/role";
import { useRouter } from "next/router";
import { storeToken } from "@lib/helper";

const RoleTable: FC = () => {
  const allRoles = superAdminQueries.getRoles();
  const [roles, setRoles] = React.useState<any>([]);
  const [pageSize, setPageSize] = React.useState<number>(5);
  const router = useRouter();
  useEffect(() => {
    getRoles();
  }, [roles]);
  const getRoles = () => {
    setRoles(
      allRoles?.data?.data?.roles === undefined
        ? []
        : allRoles?.data?.data?.roles
    );
  };

  const getRoleInfo = async (id: any) => {
    storeToken("roleId", id);
    await router.push({
      pathname: `/dashboard/superadmin/editRole/${id}`,
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
          icon={<Edit />}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            getRoleInfo(params.id);
          }}
          label="Edit Role"
          showInMenu
        />,
        // </Link>,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete Role"
          showInMenu
        />,
      ],
    },
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "ROLE TITLE", width: 200 },
    {
      field: "usermanagement",
      headerName: "CAN MANAGE USER?",
      renderCell: ({ row }: Partial<GridRowParams>) => (
        <div className="mx-8">
          <Image
            src={
              row.usermanagement
                ? "/img/dashboard/table-icons/valid.svg"
                : "/img/dashboard/table-icons/invalid.svg"
            }
            alt="icon"
            width={25}
            height={25}
          />
        </div>
      ),
      width: 230,
    },
    {
      field: "request_new_user",
      headerName: "CAN REQUEST USER?",
      renderCell: ({ row }: Partial<GridRowParams>) => (
        <div className="mx-8">
          <Image
            src={
              row?.request_new_user
                ? "/img/dashboard/table-icons/valid.svg"
                : "/img/dashboard/table-icons/invalid.svg"
            }
            alt="icon"
            width={25}
            height={25}
          />
        </div>
      ),
      width: 200,
    },
    {
      field: "upload_contracts",
      headerName: "CAN UPLOAD CONTRACT?",
      renderCell: ({ row }: Partial<GridRowParams>) => (
        <div className="mx-8">
          <Image
            src={
              row.upload_contracts
                ? "/img/dashboard/table-icons/valid.svg"
                : "/img/dashboard/table-icons/invalid.svg"
            }
            alt="icon"
            width={25}
            height={25}
          />
        </div>
      ),
      width: 200,
    },
    {
      field: "view_contracts",
      headerName: "CAN VIEW CONTRACTS?",
      renderCell: ({ row }: Partial<GridRowParams>) => (
        <div className="mx-8">
          <Image
            src={
              row.view_contracts
                ? "/img/dashboard/table-icons/valid.svg"
                : "/img/dashboard/table-icons/invalid.svg"
            }
            alt="icon"
            width={25}
            height={25}
          />
        </div>
      ),
      width: 200,
    },
    {
      field: "early_notifications",
      headerName: "EARLY NOTIFICATIONS?",
      renderCell: ({ row }: Partial<GridRowParams>) => (
        <div className="mx-8">
          <Image
            src={
              row.early_notifications
                ? "/img/dashboard/table-icons/valid.svg"
                : "/img/dashboard/table-icons/invalid.svg"
            }
            alt="icon"
            width={25}
            height={25}
          />
        </div>
      ),
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
          rowsPerPageOptions={[5, 10, 20]}
          autoHeight
          pagination
          rows={roles}
          columns={columns}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
        />
      </div>
    </div>
  );
};

export default RoleTable;
