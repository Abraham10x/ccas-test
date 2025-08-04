import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdminMenu from "../../../common/lib/dashboard/menu/admin.menu.json";
import Header from "@components/dashboard/Header";
import ContractsTable from "@components/dashboard/general/ContractsTable";

const manageContracts: NextPage = () => {
  return (
    <Dashboard navMenu={AdminMenu}>
      <Seo templateTitle="Manage Contracts" />
      <Header />
      <div className="px-5 sm:px-10 mt-5 sm:mt-10">
        <div className="my-5 py-5">
          <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
            Manage Contracts
          </h1>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            Kindly view and/or fill in a new contract details
          </p>
        </div>
        <h2 className="font-semibold text-xl text-gray-900 mb-5">Contracts</h2>
        <ContractsTable />
      </div>
    </Dashboard>
  );
};

export default manageContracts;
