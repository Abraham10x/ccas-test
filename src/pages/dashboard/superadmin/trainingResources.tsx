import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdminMenu from "../../../common/lib/dashboard/menu/admin.menu.json";
import Header from "@components/dashboard/Header";
import Resources from "@components/dashboard/general/Resources";

const trainingResources: NextPage = () => {
  return (
    <Dashboard navMenu={AdminMenu}>
      <Seo templateTitle="Admin" />
      <Header />
      <Resources />
    </Dashboard>
  );
};

export default trainingResources;
