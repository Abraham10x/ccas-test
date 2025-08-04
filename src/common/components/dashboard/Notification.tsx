/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from "react";
import router from "next/router";
import { retrieveToken } from "@lib/helper";
import notificationQueries from "@lib/queries/notification";

const Notification = () => {
  const userId = retrieveToken("userId");
  const mda = retrieveToken("mda");
  const userType = retrieveToken("userType");
  const allNotification = notificationQueries.getAllNotification({
    user_type:
      userType === "FMOJ Reviewer" || userType === "external reviewer"
        ? "reviewer"
        : userType,
    users_id: userId,
    mda:
      userType === "Super Admin" ||
      userType === "FMOJ system authorizer" ||
      userType === "FMOJ Reviewer" ||
      userType === "external reviewer"
        ? ""
        : mda,
  });
  const { mutate } = notificationQueries.updateNotification();

  const notification = allNotification?.data?.data?.notifications;

  let unread;

  if (notification) {
    unread = notification.filter(
      (notify: { status: string }) => notify.status === "unread"
    );
  }

  const handleView = (id: any, notificationType: string) => {
    if (notificationType === "early_notifications") {
      let url;

      switch (userType) {
        case "Legal Adviser":
          url = `/dashboard/legal-adviser/earlytNotification`;
          break;
        case "FMOJ system authorizer":
          url = `/dashboard/system-authorizer/requests`;
          break;
        case "Legal Director":
          url = `/dashboard/legal-director/earlytNotification`;
          break;
        case "FMOJ Reviewer":
          url = `/dashboard/reviewer/requests`;
          break;
        case "external reviewer":
          url = `/dashboard/reviewer/requests`;
          break;
        default:
          break;
      }
      void router.push({
        pathname: url,
      });
    } else if (notificationType === "contracts") {
      let url;

      switch (userType) {
        case "Super Admin":
          url = `/dashboard/superadmin/manageContracts`;
          break;
        case "Legal Adviser":
          url = `/dashboard/legal-adviser/notification`;
          break;
        case "FMOJ system authorizer":
          url = `/dashboard/system-authorizer/contracts`;
          break;
        case "Legal Director":
          url = `/dashboard/legal-director/contracts`;
          break;
        case "FMOJ Reviewer":
          url = `/dashboard/reviewer/contracts`;
          break;
        case "external reviewer":
          url = `/dashboard/reviewer/contracts`;
          break;
        default:
          break;
      }
      void router.push({
        pathname: url,
      });
    } else if (notificationType === "kpi") {
      let url;

      switch (userType) {
        case "Legal Adviser":
          url = `/dashboard/legal-adviser/monitoringStage`;
          break;
        case "FMOJ system authorizer":
          url = `/dashboard/system-authorizer/monitoringStage`;
          break;
        case "Legal Director":
          url = `/dashboard/legal-director/monitoringStage`;
          break;
        case "FMOJ Reviewer":
          url = `/dashboard/reviewer/monitoringStage`;
          break;
        case "external reviewer":
          url = `/dashboard/reviewer/monitoringStage`;
          break;
        default:
          break;
      }
      void router.push({
        pathname: url,
      });
    } else if (notificationType === "close_out") {
      let url;

      switch (userType) {
        case "Legal Adviser":
          url = `/dashboard/legal-adviser/closeout`;
          break;
        case "FMOJ system authorizer":
          url = `/dashboard/system-authorizer/closeout`;
          break;
        case "Legal Director":
          url = `/dashboard/legal-director/closeout`;
          break;
        case "FMOJ Reviewer":
          url = `/dashboard/reviewer/closeout`;
          break;
        case "external reviewer":
          url = `/dashboard/reviewer/closeout`;
          break;
        default:
          break;
      }
      void router.push({
        pathname: url,
      });
    }

    mutate({ id });
  };

  return (
    <>
      <div className="hs-dropdown my-auto mx-auto inline-flex">
        <button
          id="hs-dropdown-default"
          className="hs-dropdown-toggle inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none"
          type="button"
        >
          <svg
            className="w-7 h-7 sm:w-9 sm:h-9"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
          </svg>
          <div className="relative flex">
            <div
              className={`relative inline-flex text-center text-white text-sm ${
                unread?.length
                  ? "bg-red-red-500 w-6 h-6 -top-2 right-5"
                  : "bg-blue-500 w-4 h-4 -top-2 right-4"
              } border-2 border-white rounded-full -top-2 right-5 justify-center align-middle`}
            >
              {unread?.length
                ? unread.length > 99
                  ? "99+"
                  : unread.length
                : ""}
            </div>
          </div>
        </button>

        <div
          className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] hs-dropdown-open:opacity-100 opacity-0 w-72 hidden z-10 mt-2 sm:w-[21rem] bg-white shadow-md rounded-lg mx-auto"
          aria-labelledby="hs-dropdown-default"
        >
          <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50">
            Notifications
          </div>
          <div className="mb-6 max-h-96 overflow-y-auto">
            {unread?.length ? (
              unread.map((notify: any) => (
                <div
                  onClick={() =>
                    handleView(notify.id, notify.notification_type)
                  }
                  className="divide-y divide-gray-100 cursor-pointer"
                  key={notify.id}
                >
                  <div className="flex px-4 py-3 hover:bg-gray-100">
                    <div className="w-full pl-3">
                      <div className="text-gray-500 text-sm mb-1.5">
                        {notify.message}
                      </div>
                      <span className="font-semibold text-sm text-gray-900">
                        {notify.notification_type}
                      </span>
                      <div className="flex flex-row gap-3">
                        <div className="text-xs text-blue-600">
                          {notify.created_on}
                        </div>
                        <div className="text-xs text-green-green-600">
                          {notify.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-700 font-medium text-sm">
                No Notification Found
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
