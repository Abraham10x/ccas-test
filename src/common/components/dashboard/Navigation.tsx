import React from "react";
import MenuItems from "./MenuItems";
import { HiOutlineMenu } from "react-icons/hi";
interface Props {
  menuHandler: any;
  isOpen: boolean;
  navMenu: any;
}

const DashboardNavigation = ({ menuHandler, isOpen, navMenu }: Props) => {
  return (
    <div className="sticky">
      <div className="flex items-center gap-x-3">
        {/* <img
          alt="company-logo"
          src="/img/dashboard/ncdmblogo.png"
          className={`cursor-pointer duration-500 ${
            isOpen && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white origin-left font-extrabold duration-300 text-xs leading-4 ${
            !isOpen && "scale-0"
          }`}
        >
          E-FCAS
        </h1> */}
      </div>
      <div className="flex flex-row justify-between align-middle">
        <h4
          className={`text-white px-2 text-xl font-medium my-auto ${
            !isOpen && "hidden"
          }`}
        >
          MENU
        </h4>
        <div
          className="border-2 border-side-green bg-white p-2 sm:p-3 rounded-full cursor-pointer"
          onClick={menuHandler}
        >
          <HiOutlineMenu className="h-5 w-5 text-black" />
        </div>
      </div>

      <ul className="">
        {navMenu.map((menu: any, index: number) => (
          <MenuItems key={index} items={menu} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default DashboardNavigation;
