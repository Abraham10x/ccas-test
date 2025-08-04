/* eslint-disable react/jsx-key */
import React, { FC, useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridActionsCellItem,
  GridSortModel,
  GridRowParams,
} from "@mui/x-data-grid";
import { Visibility, Delete } from "@mui/icons-material";
import authQueries from "@lib/queries/auth";
import { readableDate, storeToken } from "@lib/helper";
import { useRouter } from "next/router";

const UserTable: FC = () => {
  const allUsers = authQueries.getAllUsers();
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [users, setUsers] = React.useState<any>([]);

  const router = useRouter();
  useEffect(() => {
    getUsers();
  }, [users]);

  const editUser = (id: any) => {
    storeToken("usersId", id);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push({
      pathname: `/dashboard/superadmin/editUser/${id}`,
    });
  };

  const editUserPermissions = (id: any) => {
    // storeToken("usersId", id);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push({
      pathname: `/dashboard/superadmin/editUserPermission/${id}`,
    });
  };

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "id",
      sort: "desc",
    },
  ]);

  const getUsers = () => {
    setUsers(
      allUsers?.data?.data?.user === undefined ? [] : allUsers?.data?.data?.user
    );
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      width: 100,
      getActions: (params: any) => [
        <GridActionsCellItem
          onClick={() => {
            editUser(params.id);
          }}
          icon={<Visibility />}
          label="View & Edit User"
          showInMenu
        />,
        <GridActionsCellItem
          onClick={() => {
            editUserPermissions(params.id);
          }}
          icon={<Visibility />}
          label="Edit User Permissions"
          showInMenu
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete User"
          showInMenu
        />,
      ],
    },
    { field: "id", headerName: "ID", width: 100 },
    { field: "unique_id", headerName: "UNIQUE ID", width: 150 },
    { field: "fullname", headerName: "NAME", width: 180 },
    { field: "email", headerName: "EMAIL", width: 200 },
    { field: "role", headerName: "ROLE", width: 200 },
    { field: "mda", headerName: "MDA", width: 200 },
    {
      field: "date_created",
      headerName: "DATE CREATED",
      width: 150,
      renderCell: ({ row }: Partial<GridRowParams>) => (
        <p>{readableDate(row?.date_created)}</p>
      ),
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
          rows={users}
          columns={columns}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
        />
      </div>
    </div>
  );
};

export default UserTable;
