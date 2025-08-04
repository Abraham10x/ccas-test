import Seo from "@components/application/Seo";
import Header from "@components/dashboard/Header";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import DirectorMenu from "../../../common/lib/dashboard/menu/legal.director.menu.json";
import RequestsTable from "@components/dashboard/general/RequestsTable";
import RequestsModal from "@components/dashboard/legal-director/requests/RequestsModal";

const requests: NextPage = () => {
  return (
    <Dashboard navMenu={DirectorMenu}>
      <Seo templateTitle="Legal Director Requests" />
      <Header />

      {/* starts here */}
      <div className="px-5 sm:px-10">
        <div className="mb-6 mt-12 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-col">
            <h3 className="font-bold text-xl">Requests</h3>
            <p className="text-sm sm:text-base font-medium text-tx-light-dark">
              View, accept or decline incoming requests
            </p>
          </div>
          <RequestsModal id="hs-request-modal-form" />
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
