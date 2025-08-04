import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdviserMenu from "../../../common/lib/dashboard/menu/legal.adviser.menu.json";
import Header from "@components/dashboard/Header";
import Resources from "@components/dashboard/general/Resources";

const TrainingResources: NextPage = () => {
  return (
    <Dashboard navMenu={AdviserMenu}>
      <Seo templateTitle="Admin" />
      <Header />
      <Resources />
    </Dashboard>
  );
};

export default TrainingResources;
