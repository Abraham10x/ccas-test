import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import Reviewer from "../../../common/lib/dashboard/menu/reviewer.menu.json";
import Header from "@components/dashboard/Header";
import Templates from "@components/dashboard/general/Templates";

const contractTemplates: NextPage = () => {
  return (
    <Dashboard navMenu={Reviewer}>
      <Seo templateTitle="Contract Templates" />
      <Header />
      <Templates />
    </Dashboard>
  );
};

export default contractTemplates;
