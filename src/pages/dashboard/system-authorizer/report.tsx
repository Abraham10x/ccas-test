import Seo from "@components/application/Seo";
import Header from "@components/dashboard/Header";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AuthorizerMenu from "../../../common/lib/dashboard/menu/authorizer.menu.json";
// import RequestsTable from "@components/dashboard/general/RequestsTable";
import ReportForm from "@components/dashboard/general/ReportForm";

const requests: NextPage = () => {
  return (
    <Dashboard navMenu={AuthorizerMenu}>
      <Seo templateTitle="Reports" />
      <Header />

      {/* starts here */}
      <div className="px-10">
        <div className="mb-6 mt-12 flex flex-row justify-between">
          <div className="flex flex-col">
            <h3 className="font-bold text-xl">Reports</h3>
            <p className="text-md font-medium text-tx-light-dark">
              Generate report
            </p>
          </div>
        </div>
        <div className="my-3">
          <ReportForm />
          {/* <RequestsTable/> */}
        </div>
      </div>

      {/* ends */}
    </Dashboard>
  );
};

export default requests;
