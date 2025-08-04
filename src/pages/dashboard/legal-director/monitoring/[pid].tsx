import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import DirectorMenu from "../../../../common/lib/dashboard/menu/legal.director.menu.json";
import Header from "@components/dashboard/Header";
import Milestones from "@components/dashboard/legal-adviser/monitoring-extra/Milestones";

const MonitoringExtra: NextPage = () => {
  return (
    <Dashboard navMenu={DirectorMenu}>
      <Seo templateTitle="Lessons Learnt" />
      <Header />
      <div className="px-5 sm:px-10 mt-5 sm:mt-10">
        <div className="my-5 py-5">
          <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
            Monitoring Stage
          </h1>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            Fill in the monitoring stage details
          </p>
        </div>
        <Milestones />
        {/* <div className="my-6 flex flex-row justify-start align-middle gap-4">
        </div> */}
      </div>
    </Dashboard>
  );
};

export default MonitoringExtra;
