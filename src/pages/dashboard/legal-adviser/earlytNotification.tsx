import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdviserMenu from "../../../common/lib/dashboard/menu/legal.adviser.menu.json";
import Header from "@components/dashboard/Header";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@components/application/base/Button";
import FormTable from "@components/dashboard/general/EarlyNotificationTable";
import NotificationForm from "@components/dashboard/legal-adviser/early-notification/NotificationForm";

const EarlyNotification: NextPage = () => {
  return (
    <Dashboard navMenu={AdviserMenu}>
      <Seo templateTitle="Early Notifications" />
      <Header />
      <div className="px-5 sm:px-10 mt-5 sm:mt-10">
        <div className="flex flex-col sm:flex-row gap-5 justify-between my-5 py-5">
          <div>
            <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
              Early Notifications
            </h1>
            <p className="text-sm sm:text-base font-medium text-tx-light-dark">
              Kindly view and/or fill in the early notification form
            </p>
          </div>
          {/* <h2 className="font-semibold text-xl text-gray-900 mb-5">Forms</h2> */}
          {/* <div className="my-6 flex flex-row justify-start align-middle gap-4"> */}
          <Button
            dataOverlay={"#hs-notification-form-modal"}
            className="bg-green text-white flex items-center gap-x-4 btn-shadow"
          >
            <IoMdAdd className="h-5 w-5" />
            <p>Add Form</p>
          </Button>
        </div>
        <div className="my-6">
          <FormTable />
        </div>
        <NotificationForm id="hs-notification-form-modal" />
      </div>
    </Dashboard>
  );
};

export default EarlyNotification;
