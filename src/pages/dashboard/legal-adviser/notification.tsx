import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdviserMenu from "../../../common/lib/dashboard/menu/legal.adviser.menu.json";
import Header from "@components/dashboard/Header";
import { IoMdAdd } from "react-icons/io";
import { LinkButton } from "@components/application/base/Button";
import ContractsTable from "@components/dashboard/general/ContractsTable";

const EarlyNotification: NextPage = () => {
  return (
    <Dashboard navMenu={AdviserMenu}>
      <Seo templateTitle="Manage Contracts" />
      <Header />
      <div className="px-5 sm:px-10 mt-5 sm:mt-10">
        <div className="flex flex-col sm:flex-row gap-5 justify-between my-5 py-5">
          <div>
            <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
              Contract Details
            </h1>
            <p className="text-sm sm:text-base font-medium text-tx-light-dark">
              Kindly view and/or fill in a new contract details
            </p>
          </div>

          <LinkButton
            link="/dashboard/legal-adviser/contractRegistrationForm"
            className="bg-green text-white flex items-center gap-x-4 btn-shadow"
          >
            <IoMdAdd className="h-5 w-5" />
            <p className="text-sm sm:text-base">Add New Contract</p>
          </LinkButton>
        </div>
        <div className="my-6">
          <ContractsTable />
        </div>
      </div>
    </Dashboard>
  );
};

export default EarlyNotification;
