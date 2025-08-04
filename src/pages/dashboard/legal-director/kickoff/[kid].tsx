import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import Header from "@components/dashboard/Header";
import DirectorMenu from "../../../../common/lib/dashboard/menu/legal.director.menu.json";
import KickoffDetails from "@components/dashboard/general/KIckoffDetails";

const Kickoff: NextPage = () => {
  return (
    <Dashboard navMenu={DirectorMenu}>
      <Seo templateTitle="Key Performance Indicators" />
      <Header />
      <KickoffDetails />
    </Dashboard>
  );
};

export default Kickoff;
