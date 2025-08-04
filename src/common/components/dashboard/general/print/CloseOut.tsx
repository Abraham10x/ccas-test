/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC } from "react";
import Image from "next/image";
import { retrieveToken } from "@lib/helper";

interface IProps {
  close: any;
}

const CloseOut: FC<IProps> = ({ close }: IProps) => {
  const userType = retrieveToken("userType");
  const lessonData = [
    {
      id: 0,
      title: "Unique FCAS ID",
      body: close?.efacs_id,
    },
    {
      id: 1,
      title: "Contract Title",
      body: close?.contract_title,
    },
    {
      id: 2,
      title: "Contract Scope",
      body: close?.contract_scope,
    },
    {
      id: 3,
      title: "Start Date",
      body: close?.start_date,
    },
    {
      id: 4,
      title: "End Date",
      body: close?.end_date,
    },
    {
      id: 5,
      title: "Contractor Name",
      body: close?.contractors_name,
    },
    {
      id: 6,
      title: "Contractor Company Address",
      body: close?.contractor_company_address,
    },
    {
      id: 7,
      title: "Contractor Phone",
      body: close?.contractor_phone,
    },
    {
      id: 8,
      title: "Contractor Email",
      body: close?.contractor_email,
    },
    {
      id: 9,
      title: "Contractor Representative",
      body: close?.contractor_representatives,
    },
    {
      id: 10,
      title: "Initial Duration",
      body: close?.initial_period,
    },
    {
      id: 11,
      title: "Actual Duration",
      body: close?.actual_period,
    },
  ];
  return (
    <div className="mt-10 mb-10">
      <div className="flex justify-between items-center">
        <div className="">
          <Image
            src="/img/brand-Identity.png"
            alt="Logo"
            width={180}
            height={180}
          />
        </div>
        <div>
          <h1
            style={{ fontSize: "23px", textAlign: "right" }}
            className="font-bold"
          >
            CloseOut
            <br />{" "}
          </h1>
          <div className="flex flex-row gap-3 w-full">
            <p className="text-base font-medium">From</p>
            <p className="text-base font-normal text-green">
              {close?.start_date}
            </p>
            <p className="text-base font-medium">To</p>
            <p className="text-base font-normal text-green">
              {close?.end_date}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-4 gap-y-5 justify-between w-full mx-4">
        {lessonData.map((data) => (
          <>
            {(data?.id === 0 && userType === "Legal Adviser") ||
            userType === "Legal Director" ? (
              <></>
            ) : (
              <div key={data.id} className="flex flex-col gap-1">
                <h5 className="text-sm font-semibold">{data.title}</h5>
                <p className="text-sm font-normal text-tx-light-dark break-words">
                  {data.body}
                </p>
              </div>
            )}
          </>
        ))}
      </div>
      {userType === "Legal Adviser" || userType === "Legal Director" ? (
        <></>
      ) : (
        <div className="flex flex-col gap-12 mt-20">
          <div className="basis-1/2 mx-4">
            <div className="flex flex-row gap-3">
              <h5 className="text-base font-semibold">Name:</h5>
              <div className="flex flex-col relative w-full">
                <p className="font-bold text-xs">HAGF/SGF/PS</p>
                <hr className="h-0.5 bg-black w-full mt-4 absolute bottom-0.5" />
              </div>
            </div>
          </div>
          <div className="basis-1/2 mx-4">
            <div className="flex flex-row gap-3">
              <h5 className="text-base font-semibold">Signature:</h5>
              <hr className="h-0.5 bg-black w-full mt-4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloseOut;
