import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdminMenu from "../../../common/lib/dashboard/menu/admin.menu.json";
import Header from "@components/dashboard/Header";
import Lessons from "@components/dashboard/general/Lessons";

const lessonsLearnt: NextPage = () => {
  return (
    <Dashboard navMenu={AdminMenu}>
      <Seo templateTitle="Lessons Learnt" />
      <Header />
      <Lessons href="/dashboard/superadmin/lessonsLearntDetails" />
    </Dashboard>
  );
};

export default lessonsLearnt;
