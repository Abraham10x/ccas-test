import React, { FC } from "react";
interface IProps {
  data: any;
}

const GetReviewerData: FC<IProps> = ({ data }: IProps) => {
  return (
    <div className="border border-gray-400 rounded-xl h-40 overflow-y-auto mx-4">
      {data?.length > 0 ? (
        data.map((data: any) => (
          <div
            key={data.id}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-3 w-full py-7 px-4 sm:px-6"
          >
            <div className="flex flex-col gap-1">
              <h5 className="text-base font-semibold">Post-Award Contract</h5>
              <p className="text-base font-normal text-tx-light-dark">
                {data?.post_award}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="text-base font-semibold">Risks Management</h5>
              <p className="text-base font-normal text-tx-light-dark">
                {data?.risk_management}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="text-base font-semibold">Draft Contract</h5>
              <p className="text-base font-normal text-tx-light-dark">
                {data?.draft_contract}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="text-base font-semibold">Conditions</h5>
              <p className="text-base font-normal text-tx-light-dark">
                {data?.issuance_condition}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="text-base font-semibold">Reviewer Name</h5>
              <p className="text-base font-normal text-tx-light-dark">
                {data?.done_by_name}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="text-base font-semibold">FMOJ-DS</h5>
              <p className="text-base font-normal text-tx-light-dark">
                {data?.fmoj_ds}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-center">No Reviewer Data Yet</p>
        </div>
      )}
    </div>
  );
};

export default GetReviewerData;
