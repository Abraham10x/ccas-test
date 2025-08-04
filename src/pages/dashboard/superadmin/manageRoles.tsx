import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdminMenu from "../../../common/lib/dashboard/menu/admin.menu.json";
import Header from "@components/dashboard/Header";
import RoleTable from "@components/dashboard/super-admin/manage-roles/RoleTable";
import AddRoleModal from "@components/dashboard/super-admin/manage-roles/AddRoleModal";

const manageRoles: NextPage = () => {
  return (
    <Dashboard navMenu={AdminMenu}>
      <Seo templateTitle="Manage Roles" />
      <Header />
      <div className="px-5 sm:px-10 mt-5 sm:mt-10">
        <div className="flex flex-col lg:flex-row gap-6 justify-between my-5 py-5">
          <div>
            <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
              Manage Roles
            </h1>
            <p className="text-sm sm:text-base font-medium text-tx-light-dark">
              Create roles and permissions for users
            </p>
          </div>
          <AddRoleModal />
        </div>
        <div className="my-5">
          <RoleTable />
        </div>
      </div>
    </Dashboard>
  );
};

export default manageRoles;
