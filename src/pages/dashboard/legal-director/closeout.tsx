/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import DirectorMenu from "../../../common/lib/dashboard/menu/legal.director.menu.json";
import Header from "@components/dashboard/Header";
import CloseOutTable from "@components/dashboard/general/CloseOutTable";

const CloseOut: NextPage = () => {
  return (
    <Dashboard navMenu={DirectorMenu}>
      <Seo templateTitle="Close out Forms" />
      <Header />
      <div className="px-5 sm:px-10 mt-5 sm:mt-10">
        <div className="flex items-center justify-between my-5 py-5">
          <div>
            <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
              Close Out Forms
            </h1>
            <p className="text-sm sm:text-base font-medium text-tx-light-dark">
              Fill in the close out form details
            </p>
          </div>
        </div>
        <div className="mt-5">
          <div
            className="h-auto"
            style={{
              width: "100%",
            }}
          >
            <CloseOutTable />
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default CloseOut;
