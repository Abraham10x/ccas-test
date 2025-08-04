import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AuthorizerMenu from "../../../common/lib/dashboard/menu/authorizer.menu.json";
import Header from "@components/dashboard/Header";
import Templates from "@components/dashboard/general/Templates";

const contractTemplates: NextPage = () => {
  return (
    <Dashboard navMenu={AuthorizerMenu}>
      <Seo templateTitle="Contract Templates" />
      <Header />
      <Templates />
    </Dashboard>
  );
};

export default contractTemplates;
