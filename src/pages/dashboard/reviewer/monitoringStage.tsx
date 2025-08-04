/* eslint-disable @typescript-eslint/no-floating-promises */
import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import Reviewer from "../../../common/lib/dashboard/menu/reviewer.menu.json";
import Header from "@components/dashboard/Header";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TbArrowBarRight } from "react-icons/tb";
import Card from "@components/application/Card";
import contractRegQueries from "@lib/queries/contract-reg";
import { readableDate, retrieveToken, storeToken } from "@lib/helper";
import { useRouter } from "next/router";

const MonitoringStage: NextPage = () => {
  const userId = retrieveToken("userId");
  const response = contractRegQueries.readByReviewer(userId);

  const data =
    response?.data?.data?.contracts === undefined
      ? []
      : response?.data?.data?.contracts;

  const router = useRouter();
  const handleRoute = (id: any, title: any) => {
    storeToken("title", title);
    storeToken("contractId", id);
    router.push({
      pathname: `/dashboard/reviewer/monitoring/${id}`,
      // query: {
      //   id,
      // },
    });
  };

  return (
    <Dashboard navMenu={Reviewer}>
      <Seo templateTitle="Monitoring Stage" />
      <Header />
      <div className="px-5 sm:px-10 mt-5 sm:mt-10">
        <div className="my-5 py-5">
          <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
            Monitoring Stage
          </h1>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            Pick a contract then proceed with the monitoring stage
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 my-8 sm:my-20">
          {data.map(
            (item: any) => (
              // item.status === "Approved" ? (
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
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-3">
                      <button
                        className={`rounded-xl py-2 px-5 text-sm sm:text-base ${
                          item.status === "Approved"
                            ? "bg-green/10 text-green "
                            : item.status === "Rejected"
                            ? "bg-[#F86652]/10 text-[#F86652]"
                            : item.status === "PENDING"
                            ? "bg-[#FFFED6] text-[#8D8A00]"
                            : ""
                        }`}
                      >
                        {item.status}
                      </button>
                      <p className="text-sm sm:font-bold my-auto">
                        {readableDate(item.created_at)}
                      </p>
                    </div>
                    <TbArrowBarRight className="my-auto w-6 h-6 text-[#00674C]" />
                  </div>
                </div>
                {/* </a> */}
              </Card>
            )
            // ) : (
            //   <h3></h3>
            // )
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default MonitoringStage;
