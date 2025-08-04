/* eslint-disable @next/next/no-img-element */
import Card from "@components/application/Card";
import Seo from "@components/application/Seo";
import Header from "@components/dashboard/Header";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdminMenu from "../../../common/lib/dashboard/menu/admin.menu.json";
import Table from "@components/dashboard/super-admin/UserTable";
import authQueries from "@lib/queries/auth";
import Statistics from "@components/dashboard/super-admin/Statistics";
import { retrieveToken } from "@lib/helper";

const SuperAdmin: NextPage = () => {
  const userId = retrieveToken("userId");
  const user = authQueries.getUser(userId);

  return (
    <Dashboard navMenu={AdminMenu}>
      <Seo templateTitle="Super Admin Dashboard" />

      <Header />

      <div className="px-5 sm:px-10">
        <div className="my-5 py-5">
          <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            Welcome to e-FCAS Admin Dashboard
          </p>
        </div>

        <div>
          <h3 className="text-md text-tx-dark font-bold">Statistics</h3>
          <Statistics />
        </div>

        <div className="my-10 grid grid-cols-1 sm:grid-cols-2">
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
                  <h3 className="text-sm sm:text-lg text-tx-dark font-bold">
                    {user.data?.user_details?.fullname}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:space-x-4 text-tx-light-dark text-xs sm:text-sm sm:items-center">
                    <p className="bg-outline-gray py-1 px-2 sm:px-4 rounded-lg">
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

        <div className="my-6 flex flex-col gap-4">
          <h3 className="font-bold text-xl">Users</h3>
          {/* <div className="flex flex-row px-3 gap-4 align-middle">
            <BaseFormInput
              name="search"
              placeholder="Search"
              className="w-96 h-full"
            />
            <Button className="flex flex-row px-2 gap-2 border border-gray-200">
              <Image
                className="my-auto"
                src="/img/icons/filter.svg"
                alt="filter icon"
                width={20}
                height={20}
              />
              <p className="text-base">Filter</p>
              <MdKeyboardArrowDown className="h-5 w-5 my-auto" />
            </Button>
          </div> */}
        </div>
        <div>
          <Table />
        </div>
      </div>
    </Dashboard>
  );
};

export default SuperAdmin;
