import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import DirectorMenu from "../../../common/lib/dashboard/menu/legal.director.menu.json";
import Header from "@components/dashboard/Header";
import FormTable from "@components/dashboard/general/EarlyNotificationTable";

const EarlyNotification: NextPage = () => {
  return (
    <Dashboard navMenu={DirectorMenu}>
      <Seo templateTitle="Manage Contracts" />
      <Header />
      <div className="px-5 sm:px-10 mt-5 sm:mt-10">
        <div className="flex items-center justify-between my-5 py-5">
          <div>
            <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
              Early Notifications
            </h1>
            <p className="text-sm sm:text-base font-medium text-tx-light-dark">
              Kindly view and/or fill in the early notification form
            </p>
          </div>
          {/* <h2 className="font-semibold text-xl text-gray-900 mb-5">Forms</h2> */}
          {/* <div className="my-6 flex flex-row justify-start align-middle gap-4"> */}
        </div>
        <div className="my-6">
          <FormTable />
        </div>
      </div>
    </Dashboard>
  );
};

export default EarlyNotification;
