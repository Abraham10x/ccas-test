import Seo from "@components/application/Seo";
import Header from "@components/dashboard/Header";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AuthorizerMenu from "../../../common/lib/dashboard/menu/authorizer.menu.json";
import RequestsTable from "@components/dashboard/general/RequestsTable";

const requests: NextPage = () => {
  return (
    <Dashboard navMenu={AuthorizerMenu}>
      <Seo templateTitle="Legal Director Requests" />
      <Header />

      {/* starts here */}
      <div className="px-5 sm:px-10">
        <div className="mb-6 mt-6 sm:mt-12 flex flex-row justify-between">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-xl">Requests</h3>
            <p className="text-sm sm:text-base font-medium text-tx-light-dark">
              View, accept or decline incoming requests
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
