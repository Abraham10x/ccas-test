import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdminMenu from "../../../../common/lib/dashboard/menu/admin.menu.json";
import LessonsDetails from "@components/dashboard/general/LessonsDetails";

const Lessons: NextPage = () => {
  return (
    <Dashboard navMenu={AdminMenu}>
      <div>
        <LessonsDetails />
      </div>
    </Dashboard>
  );
};

export default Lessons;
