/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import Header from "@components/dashboard/Header";
import Reviewer from "../../../../common/lib/dashboard/menu/reviewer.menu.json";
import CloseOutDetails from "@components/dashboard/general/CloseOutDetails";

const CloseOutReview: NextPage = () => {
  
  return (
    <Dashboard navMenu={Reviewer}>
      <Seo templateTitle="Close-out Details" />
      <Header />
      <CloseOutDetails/>
    </Dashboard>
  );
};

export default CloseOutReview;
