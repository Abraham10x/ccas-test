/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC } from "react";
import Image from "next/image";
import { retrieveToken } from "@lib/helper";

interface IProps {
  milestone: any[];
}

const MonitoringStage: FC<IProps> = ({ milestone }: IProps) => {
  const userType = retrieveToken("userType");
  return (
    <div className="mt-10 mb-10">
      <div className="flex flex-row justify-between">
        <div>
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
            Monitoring Stage
            <br />{" "}
          </h1>
        </div>
      </div>

      <div className="mt-20 mx-4">
        {milestone.map((data) => (
          <div
            key={data.id}
            className="grid grid-cols-3 gap-y-3 justify-between w-full my-12"
          >
            <div className="flex flex-col gap-1">
              <h5 className="text-sm sm:text-base font-semibold">
                Milestone Title
              </h5>
              <p className="text-sm sm:text-base font-normal text-tx-light-dark break-words">
                {data?.milestone}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="text-sm sm:text-base font-semibold">Due Date</h5>
              <p className="text-sm sm:text-base font-normal text-tx-light-dark">
                {data?.due_date}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="text-sm sm:text-base font-semibold">Status</h5>
              <div className="flex flex-row align-middle">
                <div
                  className={`rounded-full mr-3 my-auto w-4 h-4 ${
                    data?.status_color === "green"
                      ? "bg-[#00674C]"
                      : data?.status_color === "yellow"
                      ? "bg-[#FFCC29]"
                      : data?.status_color === "red"
                      ? "bg-[#C71700]"
                      : ""
                  }`}
                ></div>
                <p className="text-base text-gray-500 break-words">
                  {data?.status_color === "green"
                    ? "On Track"
                    : data?.status_color === "yellow"
                    ? "Delayed"
                    : data?.status_color === "red"
                    ? "Critical"
                    : ""}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="text-sm sm:text-base font-semibold">
                Performance Comment
              </h5>
              <p className="text-sm sm:text-base font-normal text-tx-light-dark break-words">
                {data?.performance_comment ?? "Status not completed yet"}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="text-sm sm:text-base font-semibold">Evidence</h5>
              {data?.evidence === null ? (
                "Status not completed yet"
              ) : (
                <a
                  href={data?.evidence}
                  rel="noreferrer noopener"
                  target="_blank"
                  download
                >
                  <p
                    style={{ color: "blue", textDecoration: "underline" }}
                    className="text-sm sm:text-base font-normal text-tx-light-dark"
                  >
                    Click to view & download
                  </p>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      {userType === "Legal Adviser" || userType === "Legal Director" ? (
        <></>
      ) : (
        <div className="flex flex-col gap-12 mt-20">
          <div className="basis-1/2 mx-4">
            <div className="flex flex-row gap-3">
              <h5 className="text-sm font-semibold">Name:</h5>
              <div className="flex flex-col relative w-full">
                <p className="font-bold text-xs">HAGF/SGF/PS</p>
                <hr className="h-0.5 bg-black w-full mt-4 absolute bottom-0.5" />
              </div>
            </div>
          </div>
          <div className="basis-1/2 mx-4">
            <div className="flex flex-row gap-3">
              <h5 className="text-sm font-semibold">Signature:</h5>
              <hr className="h-0.5 bg-black w-full mt-4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitoringStage;
