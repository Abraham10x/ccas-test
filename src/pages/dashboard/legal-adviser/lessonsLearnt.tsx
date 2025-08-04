import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import LegalAdviserMenu from "../../../common/lib/dashboard/menu/legal.adviser.menu.json";
import Header from "@components/dashboard/Header";
import Lessons from "@components/dashboard/general/Lessons";

const LessonsLearnt: NextPage = () => {
  return (
    <Dashboard navMenu={LegalAdviserMenu}>
      <Seo templateTitle="Lessons Learnt" />
      <Header />
      <Lessons href="/dashboard/legal-adviser/lessonsLearntDetails" />
    </Dashboard>
  );
};

export default LessonsLearnt;
