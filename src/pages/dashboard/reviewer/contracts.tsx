import Seo from "@components/application/Seo";
import Header from "@components/dashboard/Header";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import Reviewer from "../../../common/lib/dashboard/menu/reviewer.menu.json";
// import RequestsTable from "@components/dashboard/general/RequestsTable";
import ContractsTable from "@components/dashboard/general/ContractsTable";

const Contracts: NextPage = () => {
  return (
    <Dashboard navMenu={Reviewer}>
      <Seo templateTitle="System Authorizer Requests" />
      <Header />

      {/* starts here */}
      <div className="px-5 sm:px-10">
        <div className="mb-6 mt-12 flex flex-col gap-4">
          <h3 className="font-bold text-xl">Contract Requests</h3>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            View, accept or decline incoming contract requests
          </p>
          <ContractsTable />
        </div>
      </div>

      {/* ends */}
    </Dashboard>
  );
};

export default Contracts;
