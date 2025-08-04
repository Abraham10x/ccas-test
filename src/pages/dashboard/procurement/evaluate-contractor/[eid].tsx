import { useState } from "react";
import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import ProcurementMenu from "../../../../common/lib/dashboard/menu/procurement.menu.json";
import Header from "@components/dashboard/Header";
import { Button } from "@components/application/base/Button";
import { useRouter } from "next/router";
import EvaluateContractorForm from "@components/dashboard/system-authorizer/contractor-evaluation/Form";

const EvaluateContractor: NextPage = () => {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <Dashboard navMenu={ProcurementMenu}>
      <Seo templateTitle="Early Notification Details" />
      <Header />
      <div className="px-5 sm:px-10 mt-5 sm:mt-10">
        <div className="flex flex-col sm:flex-row gap-5 justify-between my-5 py-5">
          <div>
            <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
              Evaluate Contractor
            </h1>
            <p className="text-sm sm:text-base font-medium text-tx-light-dark">
              Kindly fill evaluation form accurately
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
        {step === 1 ? (
          <EvaluateContractorForm step={step} next={handleNext} />
        ) : step === 2 ? (
          <EvaluateContractorForm
            step={step}
            back={handleBack}
            next={handleNext}
          />
        ) : step === 3 ? (
          <EvaluateContractorForm
            step={step}
            back={handleBack}
            next={handleNext}
          />
        ) : step === 4 ? (
          <EvaluateContractorForm
            step={step}
            back={handleBack}
            next={handleNext}
          />
        ) : step === 5 ? (
          <EvaluateContractorForm
            step={step}
            back={handleBack}
            next={handleNext}
          />
        ) : step === 6 ? (
          <EvaluateContractorForm
            step={step}
            back={handleBack}
            next={handleNext}
          />
        ) : step === 7 ? (
          <EvaluateContractorForm
            step={step}
            back={handleBack}
            next={handleNext}
          />
        ) : (
          <EvaluateContractorForm
            step={step}
            back={handleBack}
            next={handleNext}
          />
        )}
      </div>
    </Dashboard>
  );
};

export default EvaluateContractor;
