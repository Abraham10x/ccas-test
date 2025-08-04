import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdviserMenu from "../../../../common/lib/dashboard/menu/legal.adviser.menu.json";
import LessonsDetails from "@components/dashboard/general/LessonsDetails";

const Lessons: NextPage = () => {
  return (
    <Dashboard navMenu={AdviserMenu}>
      <div>
        <LessonsDetails />
      </div>
    </Dashboard>
  );
};

export default Lessons;
