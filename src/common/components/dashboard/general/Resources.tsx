/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@components/application/base/Button";
import BaseFormInput from "@components/application/base/form/BaseFormInput";
import Image from "next/image";
import { FC } from "react";
import { HiOutlineDocumentText, HiOutlineVideoCamera } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";
import AddTrainingModal from "./modal/AddTrainingModal";
import ViewResourceModal from "./modal/ViewResourceModal";
import resourceQueries from "@lib/queries/training-resource";

const Resources: FC = () => {
  const resources = resourceQueries.getResource();
  const allData =
    resources?.data?.data?.trainings === undefined
      ? []
      : resources?.data?.data?.trainings;

  return (
    <div className="px-5 sm:px-10 mt-5 sm:mt-10">
      <div className="flex flex-col sm:flex-row justify-between my-5 py-5">
        <div>
          <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
            Training Resources
          </h1>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            Add/or view training resources
          </p>
        </div>
        <div className="my-6 flex flex-row justify-between align-middle gap-4">
          <AddTrainingModal />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 my-10 sm:my-20">
        {allData.map((data: any) => (
          <div key={data.id}>
            <ViewResourceModal
              id={data.id}
              icon={data.icon}
              title={data.title}
              date={data.created_at}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
