/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdviserMenu from "../../../common/lib/dashboard/menu/legal.adviser.menu.json";
import Header from "@components/dashboard/Header";
import CloseOutModal from "@components/dashboard/legal-adviser/close-form/CloseOutModal";
import CloseOutTable from "@components/dashboard/general/CloseOutTable";

const CloseOut: NextPage = () => {
  return (
    <Dashboard navMenu={AdviserMenu}>
      <Seo templateTitle="Close out Forms" />
      <Header />
      <div className="px-5 sm:px-10 mt-5 sm:mt-10">
        <div className="flex flex-col sm:flex-row justify-between gap-5 my-5 py-5">
          <div>
            <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
              Close Out Forms
            </h1>
            <p className="text-sm sm:text-base font-medium text-tx-light-dark">
              Fill in the close out form details
            </p>
          </div>
          <CloseOutModal id={"hs-close-out-form"} />
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
