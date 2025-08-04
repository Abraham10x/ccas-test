/* eslint-disable @typescript-eslint/no-floating-promises */
import { HiOutlineDocumentText } from "react-icons/hi";
import { TbArrowBarRight } from "react-icons/tb";
import Card from "@components/application/Card";
import kickoffQueries from "@lib/queries/kickoff";
import { readableDate, retrieveToken, storeToken } from "@lib/helper";
import { useRouter } from "next/router";
import CreateKickoff from "@components/dashboard/legal-adviser/kickoff/CreateKickoff";
import { FC, useEffect } from "react";
import { UseQueryResult } from "@tanstack/react-query";

const KickoffData: FC = () => {
  const userId = retrieveToken("userId");
  const userType = retrieveToken("userType");
  const mda = retrieveToken("mda");
  let response: UseQueryResult<any, any>;

  switch (userType) {
    case "Super Admin":
      response = kickoffQueries.readAll();
      break;
    case "Legal Adviser":
      response = kickoffQueries.readByUserId(userId);
      break;
    case "FMOJ system authorizer":
      response = kickoffQueries.readAll();
      break;
    case "Legal Director":
      response = kickoffQueries.readAllByMda(mda);
      break;
    case "FMOJ Reviewer":
      response = kickoffQueries.readByReviewer(userId);
      break;
    case "external reviewer":
      response = kickoffQueries.readByReviewer(userId);
      break;
    default:
      break;
  }

  useEffect(() => {
    getDetails();
  }, []);
  // const getEventHistory = ()
  const getDetails = () => {
    const data =
      response?.data?.data?.contracts === undefined
        ? []
        : response?.data?.data?.contracts;
    // setTableData(details);
    return data;
  };

  const data = getDetails();

  const router = useRouter();
  const handleRoute = (id: any, title: any) => {
    storeToken("kickoffTitle", title);
    storeToken("kickoffId", id);
    const userType = retrieveToken("userType");
    let url;

    switch (userType) {
      case "Super Admin":
        url = `/dashboard/superadmin/kickoff/${id}`;
        break;
      case "Legal Adviser":
        url = `/dashboard/legal-adviser/kickoff/${id}`;
        break;
      case "Procurement":
        url = `/dashboard/procurement/kickoff/${id}`;
        break;
      case "FMOJ system authorizer":
        url = `/dashboard/system-authorizer/kickoff/${id}`;
        break;
      case "Legal Director":
        url = `/dashboard/legal-director/kickoff/${id}`;
        break;
      case "FMOJ Reviewer":
        url = `/dashboard/reviewer/kickoff/${id}`;
        break;
      case "external reviewer":
        url = `/dashboard/reviewer/kickoff/${id}`;
        break;
      default:
        break;
    }
    router.push({
      pathname: url,
    });
  };

  return (
    <div className="px-5 sm:px-10 mt-5 sm:mt-10">
      <div className="flex flex-col sm:flex-row justify-between gap-y-3">
        <div className="mt-5 pt-5">
          <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
            Kickoff Stage
          </h1>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            Pick a contract then proceed with the kickoff stage
          </p>
        </div>
        <CreateKickoff />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-7 my-10 sm:my-20">
        {data.map((item: any) => (
          <Card
            key={item.id}
            className="p-10 hover:bg-[#CCF2D080] cursor-pointer"
          >
            {/* <a href={`/dashboard/legal-adviser/MonitoringExtra?id=${item.id}`}> */}
            <div
              className="flex flex-col gap-7"
              onClick={() => handleRoute(item.id, item.title)}
            >
              <div className="flex flex-row justify-between">
                <HiOutlineDocumentText className="w-10 h-10" />
              </div>
              <p className="text-sm font-medium">{item.title}</p>
              <div className="flex flex-row justify-between align-middle">
                <div className="flex flex-col sm:flex-row gap-x-3 gap-y-4">
                  <p>
                    <button
                      className={`rounded-xl py-2 px-3 ${
                        item?.status === "Approve"
                          ? "bg-green/10 text-green "
                          : item?.status === "Reject"
                          ? "bg-[#F86652]/10 text-[#F86652]"
                          : item?.status === "PENDING"
                          ? "bg-[#FFFED6] text-[#8D8A00]"
                          : ""
                      }`}
                    >
                      {item?.status === "Approve"
                        ? "Approved"
                        : item?.status === "Reject"
                        ? "Rejected"
                        : item?.status === "PENDING"
                        ? "Pending"
                        : ""}
                    </button>
                  </p>
                  <p className="text-xs sm:text-sm font-bold my-auto">
                    {readableDate(item.created_at)}
                  </p>
                </div>
                <TbArrowBarRight className="my-auto w-6 h-6 text-[#00674C]" />
              </div>
            </div>
            {/* </a> */}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KickoffData;
