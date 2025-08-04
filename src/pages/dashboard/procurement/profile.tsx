import Seo from "@components/application/Seo";
import Header from "@components/dashboard/Header";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import ProcurementMenu from "../../../common/lib/dashboard/menu/procurement.menu.json";
import EditProfile from "@components/dashboard/general/EditProfile";

const Profile: NextPage = () => {
  return (
    <Dashboard navMenu={ProcurementMenu}>
      <Seo templateTitle="Add Users" />
      <Header />

      {/* starts here */}
      <div className="px-5 sm:px-10">
        <div className="my-5 py-5">
          <h1 className="font-extrabold text-2xl text-tx-dark">Profile</h1>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            Edit your details
          </p>
        </div>
        <div className="mt-16">
          <h2 className="font-semibold text-lg sm:text-xl text-gray-900 mb-5">
            Personal Information
          </h2>
          <div className="w-full lg:w-3/4">
            <EditProfile />
          </div>
        </div>
      </div>
      {/* ends */}
    </Dashboard>
  );
};

export default Profile;
