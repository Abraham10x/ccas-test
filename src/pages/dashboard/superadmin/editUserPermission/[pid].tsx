import Seo from "@components/application/Seo";
import Header from "@components/dashboard/Header";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdminMenu from "../../../../common/lib/dashboard/menu/admin.menu.json";
import EditPermissions from "@components/dashboard/general/EditUserPermission";

const EditUserPermission: NextPage = () => {
  return (
    <Dashboard navMenu={AdminMenu}>
      <Seo templateTitle="Edit Profile" />
      <Header />

      {/* starts here */}
      <div className="px-5 sm:px-10">
        <div className="my-5 py-5">
          <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
            Permissions
          </h1>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            Edit user permissions
          </p>
        </div>
        <div className="w-full lg:w-2/4">
            <EditPermissions />
        </div>
      </div>
      {/* ends */}
    </Dashboard>
  );
};

export default EditUserPermission;
