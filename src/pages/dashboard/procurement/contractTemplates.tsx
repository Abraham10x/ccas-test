import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import ProcurementMenu from "../../../common/lib/dashboard/menu/procurement.menu.json";
import Header from "@components/dashboard/Header";
import Templates from "@components/dashboard/general/Templates";

const ContractTemplates: NextPage = () => {
  return (
    <Dashboard navMenu={ProcurementMenu}>
      <Seo templateTitle="Contract Templates" />
      <Header />
      <Templates />
    </Dashboard>
  );
};

export default ContractTemplates;
