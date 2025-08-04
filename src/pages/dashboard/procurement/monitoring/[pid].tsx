import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import ProcurementMenu from "../../../../common/lib/dashboard/menu/procurement.menu.json";
import Header from "@components/dashboard/Header";
import Milestones from "@components/dashboard/legal-adviser/monitoring-extra/Milestones";
import Comment from "@components/dashboard/legal-adviser/monitoring-extra/Comment";

const MonitoringExtra: NextPage = () => {
  return (
    <Dashboard navMenu={ProcurementMenu}>
      <Seo templateTitle="Key Performance Indicators" />
      <Header />
      <div className="px-5 sm:px-10 mt-5 sm:mt-10">
        <div className="my-5 py-5">
          <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
            Monitoring Stage
          </h1>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            View and add KPIs
          </p>
        </div>
        {/* <div className="my-6 flex flex-row justify-start align-middle gap-4"> */}
        <Milestones />
        {/* </div> */}
        <Comment />
      </div>
    </Dashboard>
  );
};

export default MonitoringExtra;
