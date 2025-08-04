import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import Reviewer from "../../../../common/lib/dashboard/menu/reviewer.menu.json";
import LessonsDetails from "@components/dashboard/general/LessonsDetails";

const Lessons: NextPage = () => {
  return (
    <Dashboard navMenu={Reviewer}>
      <div>
        <LessonsDetails />
      </div>
    </Dashboard>
  );
};

export default Lessons;
