import Seo from "@components/application/Seo";
import Header from "@components/dashboard/Header";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AuthorizerMenu from "../../../common/lib/dashboard/menu/authorizer.menu.json";
// import RequestsTable from "@components/dashboard/general/RequestsTable";
import FormTable from "@components/dashboard/general/EarlyNotificationTable";

const requests: NextPage = () => {
  return (
    <Dashboard navMenu={AuthorizerMenu}>
      <Seo templateTitle="System Authorizer Requests" />
      <Header />

      {/* starts here */}
      <div className="px-5 sm:px-10">
        <div className="mb-6 mt-6 sm:mt-12 flex flex-col gap-4">
          <h3 className="font-bold text-xl">Early Notifications Requests</h3>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            View, accept or decline incoming requests
          </p>
          <FormTable />
        </div>
      </div>

      {/* ends */}
    </Dashboard>
  );
};

export default requests;
