import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdviserMenu from "../../../../common/lib/dashboard/menu/legal.adviser.menu.json";
import Header from "@components/dashboard/Header";
import MultiStepForm from "@components/dashboard/legal-adviser/edit-contract/MultiStepForm";
import { Button } from "@components/application/base/Button";
import router from "next/router";

const ContractRegistrationForm: NextPage = () => {
  return (
    <Dashboard navMenu={AdviserMenu}>
      <Seo templateTitle="Manage Contracts" />
      <Header />
      <div className="px-5 sm:px-10 mt-5 sm:mt-10">
        <div className="my-5 py-5 flex flex-col sm:flex-row justify-between gap-y-2">
          <div>
            <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
              Edit Contract Registration Form
            </h1>
            <p className="text-sm sm:text-base font-medium text-tx-light-dark">
              Fill in the new contract details
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
        <MultiStepForm />
      </div>
    </Dashboard>
  );
};

export default ContractRegistrationForm;
