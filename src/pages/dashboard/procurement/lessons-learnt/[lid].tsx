import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import ProcurementMenu from "../../../../common/lib/dashboard/menu/procurement.menu.json";
import LessonsDetails from "@components/dashboard/general/LessonsDetails";

const Lessons: NextPage = () => {
  return (
    <Dashboard navMenu={ProcurementMenu}>
      <div>
        <LessonsDetails />
      </div>
    </Dashboard>
  );
};

export default Lessons;
