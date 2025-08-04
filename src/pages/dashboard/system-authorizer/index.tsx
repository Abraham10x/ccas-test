/* eslint-disable @next/next/no-img-element */
import Seo from "@components/application/Seo";
import Header from "@components/dashboard/Header";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AuthorizerMenu from "../../../common/lib/dashboard/menu/authorizer.menu.json";
import Card from "@components/application/Card";
import authQueries from "@lib/queries/auth";
// import { Button } from "@components/application/base/Button";
// import RequestsTable from "@components/dashboard/general/RequestsTable";
import FormTable from "@components/dashboard/general/EarlyNotificationTable";
import { retrieveToken } from "@lib/helper";
// import ContractsTable from "@components/dashboard/legal-adviser/ContractsTable";

const SystemAuthorizer: NextPage = () => {
  const userId = retrieveToken("userId");
  const user = authQueries.getUser(userId);

  return (
    <Dashboard navMenu={AuthorizerMenu}>
      <Seo templateTitle="System Authorizer" />
      <Header />

      {/* starts here */}
      <div className="px-5 sm:px-10">
        <div className="my-5 py-5">
          <h1 className="font-extrabold text-xl text-tx-dark">Dashboard</h1>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            Welcome to System Authorizer Dashboard
          </p>
        </div>

        <div className="my-5 sm:my-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
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

          {/* <Card className="bg-[#CCF2D06B] shadow-xl rounded-md py-8 px-14 flex flex-row justify-between">
            <div className="flex flex-col gap-3 basis-2/4">
              <h3 className="font-bold text-base">Pending Requests (4)</h3>
              <p className="text-sm font-medium">
                Mr. Niyi Fawemi (Legal Director) from Ministry of Works requests
                an approval
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button className="bg-green bg-green/70 rounded-lg font-semibold text-white text-sm">
                Accept
              </Button>
              <Button className="bg-[#C71700] bg-[#C71700]/80 rounded-lg font-semibold text-white text-sm">
                Reject
              </Button>
            </div>
          </Card> */}
        </div>
        <div className="mb-6 mt-12 flex flex-col gap-4">
          <h3 className="font-bold text-base sm:text-xl">
            Early Notification Requests
          </h3>
          <FormTable />
        </div>
        {/* <div className="mb-6 mt-12 flex flex-col gap-4">
          <h3 className="font-bold text-xl">Contracts Requests</h3>
          <ContractsTable />
        </div> */}
      </div>

      {/* ends */}
    </Dashboard>
  );
};

export default SystemAuthorizer;
