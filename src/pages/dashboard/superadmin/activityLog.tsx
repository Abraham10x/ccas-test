import Seo from "@components/application/Seo";
import Header from "@components/dashboard/Header";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdminMenu from "../../../common/lib/dashboard/menu/admin.menu.json";
import ActivityLogTable from "@components/dashboard/super-admin/activity-log/ActivityLogTable";

const ActivityLog: NextPage = () => {
  return (
    <Dashboard navMenu={AdminMenu}>
      <Seo templateTitle="Add Users" />
      <Header />

      {/* starts here */}
      <div className="px-5 sm:px-10">
        <div className="my-5 py-5">
          <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
            Activity Log
          </h1>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            View user activity - Monitor all user actions
          </p>
        </div>
        <div className="mt-16">
          <div className="w-full lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between">
              <h2 className="font-semibold text-lg sm:text-xl text-gray-900 mb-5">
                User Information
              </h2>
            </div>
          </div>
          <ActivityLogTable />
        </div>
      </div>
      {/* ends */}
    </Dashboard>
  );
};

export default ActivityLog;
