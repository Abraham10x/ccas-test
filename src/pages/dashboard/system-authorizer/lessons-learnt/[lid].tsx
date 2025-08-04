import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AuthorizerMenu from "../../../../common/lib/dashboard/menu/authorizer.menu.json";
import LessonsDetails from "@components/dashboard/general/LessonsDetails";

const Lessons: NextPage = () => {
  return (
    <Dashboard navMenu={AuthorizerMenu}>
      <div>
        <LessonsDetails />
      </div>
    </Dashboard>
  );
};

export default Lessons;
