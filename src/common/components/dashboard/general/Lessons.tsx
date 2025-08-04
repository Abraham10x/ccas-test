import { FC } from "react";
import LessonsTable from "./LessonsTable";
import AddLessonModal from "./modal/AddLessonModal";

interface IProps {
  href: string;
}

const Lessons: FC<IProps> = ({ href }: IProps) => {
  return (
    <div className="px-5 sm:px-10 mt-5 sm:mt-10">
      <div className="flex flex-col sm:flex-row gap-5 justify-between my-5 py-5">
        <div>
          <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
            Lessons Learnt
          </h1>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            View all lessons learnt
          </p>
        </div>
        <AddLessonModal />
      </div>
      <div className="my-5">
        {/* <RoleTable /> */}
        <LessonsTable />
      </div>
    </div>
  );
};

export default Lessons;
