import { FC } from "react";
import AddTemplateModal from "./modal/AddTemplateModal";
import ViewTemplateModal from "./modal/ViewTemplateModal";
import templateQueries from "@lib/queries/contract-template";

const Templates: FC = () => {
  const templates = templateQueries.getTemplates();
  const allData =
    templates?.data?.data?.templates === undefined
      ? []
      : templates?.data?.data?.templates;

  return (
    <div className="px-5 sm:px-10 mt-5 sm:mt-10">
      <div className="flex flex-col sm:flex-row justify-between my-5 py-5">
        <div>
          <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
            Contract Templates
          </h1>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            Add/Upload contract templates
          </p>
        </div>

        <div className="my-6 flex flex-row justify-between align-middle gap-4">
          <AddTemplateModal id="hs-template-modal" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 my-10 sm:my-20">
        {allData.map((data: any) => (
          <div key={data.id}>
            <ViewTemplateModal
              id={data.id}
              description={data.description}
              title={data.title}
              date={data.created_at}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
