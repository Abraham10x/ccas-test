/* eslint-disable @next/next/no-img-element */
import Seo from "@components/application/Seo";
import Header from "@components/dashboard/Header";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import authQueries from "@lib/queries/auth";
import Reviewer from "../../../common/lib/dashboard/menu/reviewer.menu.json";
import Card from "@components/application/Card";
import { retrieveToken } from "@lib/helper";
import Statistics from "@components/dashboard/reviewers/Statistics";
import ContractsTable from "@components/dashboard/general/ContractsTable";

const FMOJReviewer: NextPage = () => {
  const userId = retrieveToken("userId");
  const user = authQueries.getUser(userId);
  return (
    <Dashboard navMenu={Reviewer}>
      <Seo templateTitle={user.data?.user_details?.role} />
      <Header />

      {/* starts here */}
      <div className="px-5 sm:px-10">
        <div className="my-5 py-5">
          <h1 className="font-extrabold text-xl text-tx-dark">Dashboard</h1>
          <p className="text-sm sm:text-base font-medium capitalize text-tx-light-dark">
            Welcome to {user.data?.user_details?.role} Dashboard
          </p>
        </div>

        <div>
          <h3 className="text-md text-tx-dark font-bold">Statistics</h3>
          <Statistics />
        </div>
        <div className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex space-x-4 items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={
                      user.data?.user_details?.profile_picture === null ||
                      user.data?.user_details?.profile_picture === ""
                        ? `/img/auth/login.png`
                        : user.data?.user_details?.profile_picture
                    }
                    alt="Profile Picture"
                  />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg text-tx-dark font-bold">
                    {user.data?.user_details?.fullname}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:space-x-4 text-tx-light-dark text-xs sm:text-sm sm:items-center">
                    <p className="bg-outline-gray py-1 px-4 rounded-lg">
                      {user.data?.user_details?.role}
                    </p>
                    {/* <p className="">
                      Last Login:{" "}
                      <span className="font-semibold">Yesterday</span>
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="mb-6 mt-12 flex flex-col gap-4">
          <h3 className="font-bold text-xl">Contracts</h3>
        </div>
        <div>
          <ContractsTable />
        </div>
      </div>
      {/* ends */}
    </Dashboard>
  );
};

export default FMOJReviewer;
