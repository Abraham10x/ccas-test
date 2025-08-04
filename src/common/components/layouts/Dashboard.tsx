/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import DashboardNavigation from "@components/dashboard/Navigation";
import { storeToken } from "@lib/helper";
import { useState } from "react";

interface Props {
  children?: React.ReactNode;
  navMenu: any;
}

const Dashboard = ({ children, navMenu }: Props) => {
  const [open, setOpen] = useState(false);

  const menuHandler = () => {
    setOpen(!open);
    storeToken("navbar", open);
  };

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-[4rem]"
        } duration-300 h-screen bg-side-green text-white relative p-3 overflow-x-hidden
        `}
      >
        <DashboardNavigation
          navMenu={navMenu}
          isOpen={open}
          menuHandler={menuHandler}
        />
      </div>
      <div className="flex-1 h-screen bg-dash-white overflow-y-auto">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
