import Seo from "@components/application/Seo";
import Header from "@components/dashboard/Header";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import DirectorMenu from "../../../common/lib/dashboard/menu/legal.director.menu.json";
import ContractsTable from "@components/dashboard/general/ContractsTable";

const Contracts: NextPage = () => {
  return (
    <Dashboard navMenu={DirectorMenu}>
      <Seo templateTitle="Requests" />
      <Header />

      {/* starts here */}
      <div className="px-5 sm:px-10 mt-5 sm:mt-10">
        <div className="my-5 py-5">
          <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
            Contract Details
          </h1>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            Kindly view and/or fill in a new contract details
          </p>
        </div>
        <div>
          <ContractsTable />
        </div>
      </div>

      {/* ends */}
    </Dashboard>
  );
};

export default Contracts;
