import { LinkButton } from "@components/application/base/Button";
import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdminMenu from "../../../common/lib/dashboard/menu/admin.menu.json";
import Table from "@components/dashboard/super-admin/UserTable";
import { IoMdAdd } from "react-icons/io";
import Header from "@components/dashboard/Header";

const SuperAdmin: NextPage = () => {
  return (
    <Dashboard navMenu={AdminMenu}>
      <Seo templateTitle="Manage Users" />
      <Header />
      <div className="px-5 sm:px-10 mt-10">
        <div className="flex flex-col lg:flex-row gap-5 justify-between my-5 py-5">
          <div>
            <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
              Manage Users
            </h1>
            <p className="text-sm sm:text-base font-medium text-tx-light-dark">
              Manage users - create, edit and delete users
            </p>
          </div>
          <LinkButton
            link="/dashboard/superadmin/addUser"
            className="bg-green text-white flex items-center gap-x-2 w-fit sm:gap-x-4 btn-shadow"
          >
            <IoMdAdd className="h-5 w-5" />
            <p>Add User</p>
          </LinkButton>
        </div>
        <div className="my-6">
          <Table />
        </div>
      </div>
    </Dashboard>
  );
};

export default SuperAdmin;
