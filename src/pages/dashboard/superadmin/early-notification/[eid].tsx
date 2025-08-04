import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdminMenu from "../../../../common/lib/dashboard/menu/admin.menu.json";
import Header from "@components/dashboard/Header";
import { Button } from "@components/application/base/Button";
import { useRouter } from "next/router";
import EarlyNotificationDetails from "@components/dashboard/general/EarlyNotificationDetails";

const EarlyNotify: NextPage = () => {
  const router = useRouter();

  return (
    <Dashboard navMenu={AdminMenu}>
      <Seo templateTitle="Early Notification Details" />
      <Header />
      <div className="px-5 sm:px-10 mt-5 sm:mt-10">
        <div className="flex flex-col sm:flex-row gap-5 justify-between my-5 py-5">
          <div>
            <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
              Early Notification Form Details
            </h1>
            <p className="text-sm sm:text-base font-medium text-tx-light-dark">
              Below is the details of the form
            </p>
          </div>
          <Button
            className="bg-green text-white"
            onClick={() => {
              router.back();
            }}
          >
            Go back
          </Button>
        </div>
        <EarlyNotificationDetails />
      </div>
    </Dashboard>
  );
};

export default EarlyNotify;
