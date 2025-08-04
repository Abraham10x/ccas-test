/* eslint-disable @typescript-eslint/no-floating-promises */
import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdminMenu from "../../../common/lib/dashboard/menu/admin.menu.json";
import Header from "@components/dashboard/Header";
import KickoffData from "@components/dashboard/general/KickoffData";

const Kickoff: NextPage = () => {
  return (
    <Dashboard navMenu={AdminMenu}>
      <Seo templateTitle="Kickoff Stage" />
      <Header />
      <KickoffData />
    </Dashboard>
  );
};

export default Kickoff;
