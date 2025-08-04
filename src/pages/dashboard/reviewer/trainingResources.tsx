import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import Reviewer from "../../../common/lib/dashboard/menu/reviewer.menu.json";
import Header from "@components/dashboard/Header";
import Resources from "@components/dashboard/general/Resources";

const trainingResources: NextPage = () => {
  return (
    <Dashboard navMenu={Reviewer}>
      <Seo templateTitle="Training Resource" />
      <Header />
      <Resources />
    </Dashboard>
  );
};

export default trainingResources;
