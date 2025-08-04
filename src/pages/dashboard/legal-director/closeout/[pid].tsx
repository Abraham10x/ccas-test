/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import DirectorMenu from "../../../../common/lib/dashboard/menu/legal.director.menu.json";
import Header from "@components/dashboard/Header";
import CloseOutDetails from "@components/dashboard/general/CloseOutDetails";

const CloseOutReview: NextPage = () => {

  return (
    <Dashboard navMenu={DirectorMenu}>
      <Seo templateTitle="Close-out Details" />
      <Header />
      <CloseOutDetails/>
    </Dashboard>
  );
};

export default CloseOutReview;
