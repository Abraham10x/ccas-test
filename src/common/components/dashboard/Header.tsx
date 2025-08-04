/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import BaseFormInput from "@components/application/base/form/BaseFormInput";
import authQueries from "@lib/queries/auth";
// import { useRouter } from "next/router";
import { retrieveToken } from "@lib/helper";
import { Toaster } from "react-hot-toast";
import ChangePasswordModal from "./general/modal/ChangePassword";
import Notification from "./Notification";

const Header = () => {
  const userId = retrieveToken("userId");
  const user = authQueries.getUser(userId);
  const sessionID = retrieveToken("sessionID");
  const { mutate } = authQueries.logout();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    mutate({ session_id: sessionID });
  };

  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white px-5 sm:px-10 py-6 sticky top-0 shadow-sm z-10">
        <div className="flex justify-between items-center">
          <div className="hidden sm:block">
            <img src="/img/brand-Identity.png" alt="Logo" />
          </div>
          <div className="hidden lg:flex space-x-3 items-center">
            <BaseFormInput
              name="search"
              placeholder="Search"
              className="w-96 bg-gray-200"
            />
          </div>
          <div className="flex flex-row-reverse sm:flex-row sm:gap-6">
            <Notification />
            <div className="hs-dropdown relative inline-flex">
              <button
                id="hs-dropdown-default"
                className="hs-dropdown-toggle flex items-center text-sm font-medium text-gray-900 rounded-full cursor-pointer"
                type="button"
              >
                <div className="mr-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                  <img
                    src={
                      (user.data?.user_details?.profile_picture === null ||
                      user.data?.user_details?.profile_picture === "")
                        ? `/img/auth/login.png`
                        : user.data?.user_details?.profile_picture
                    }
                    alt="Profile Picture"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm sm:text-base">
                    {user.data?.user_details?.fullname}
                  </p>
                  <p className="text-xs sm:text-sm font-light hidden sm:block">
                    {user.data?.user_details?.email}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 mx-1.5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] hs-dropdown-open:opacity-100 opacity-0 w-48 sm:w-56 hidden z-10 mt-2 bg-white shadow-md rounded-lg py-1 px-0.5 sm:py-2 sm:px-2"
                aria-labelledby="hs-dropdown-default"
              >
                <p
                  onClick={handleModal}
                  style={{ cursor: "pointer" }}
                  className="nav-color py-2 px-3 text-sm sm:text-base hover:bg-green hover:text-white"
                >
                  Change Password
                </p>
                <p
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                  className="nav-color py-2 px-3 text-sm sm:text-base hover:bg-green hover:text-white"
                >
                  Logout
                </p>
              </div>
            </div>
            <ChangePasswordModal
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
