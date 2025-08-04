import Seo from "@components/application/Seo";
import Header from "@components/dashboard/Header";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdminMenu from "../../../common/lib/dashboard/menu/admin.menu.json";
import RequestsTable from "@components/dashboard/general/RequestsTable";

const requests: NextPage = () => {
  return (
    <Dashboard navMenu={AdminMenu}>
      <Seo templateTitle="Requests" />
      <Header />

      {/* starts here */}
      <div className="px-10">
        <div className="mb-6 mt-12 flex flex-row justify-between">
          <div className="flex flex-col">
            <h3 className="font-bold text-xl">Requests</h3>
            <p className="text-md font-medium text-tx-light-dark">
              Create Approved Users based on requests
            </p>
          </div>
        </div>
        <div className="my-3">
          <RequestsTable />
        </div>
      </div>

      {/* ends */}
    </Dashboard>
  );
};

export default requests;
