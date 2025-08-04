import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdminMenu from "../../../common/lib/dashboard/menu/admin.menu.json";
import Header from "@components/dashboard/Header";
import Templates from "@components/dashboard/general/Templates";

const contractTemplates: NextPage = () => {
  return (
    <Dashboard navMenu={AdminMenu}>
      <Seo templateTitle="Contract Templates" />
      <Header />
      <Templates />
    </Dashboard>
  );
};

export default contractTemplates;
