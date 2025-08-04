import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AuthorizerMenu from "../../../common/lib/dashboard/menu/authorizer.menu.json";
import Header from "@components/dashboard/Header";
import Lessons from "@components/dashboard/general/Lessons";

const lessonsLearnt: NextPage = () => {
  return (
    <Dashboard navMenu={AuthorizerMenu}>
      <Seo templateTitle="Lessons Learnt" />
      <Header />
      <Lessons href="/dashboard/legal-adviser/lessonsLearntDetails" />
    </Dashboard>
  );
};

export default lessonsLearnt;
