import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import Header from "@components/dashboard/Header";
import ProcurementMenu from "../../../../common/lib/dashboard/menu/procurement.menu.json";
import KickoffDetails from "@components/dashboard/general/KIckoffDetails";

const Kickoff: NextPage = () => {
  return (
    <Dashboard navMenu={ProcurementMenu}>
      <Seo templateTitle="Key Performance Indicators" />
      <Header />
      <KickoffDetails />
    </Dashboard>
  );
};

export default Kickoff;
