import { useState } from "react";
import StepOne from "./StepOne";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  return (
    <div className="flex items-center justify-center">
      <div className="sm:px-5 lg:px-10 xl:px-28 mt-4 sm:mt-10 w-full">
        <div className="flex flex-row gap-3 sm:gap-0 justify-center mb-4">
          <div className="flex flex-row justify-center align-middle">
            <div className="flex flex-col gap-2 justify-center">
              <div
                className={`w-9 sm:w-12 h-9 sm:h-12 rounded-full flex justify-center border border-gray-400 ${
                  step === 1 ? "bg-green text-white" : "bg-gray-100 text-green"
                } p-1.5 sm:p-3 text-center cursor-pointer`}
                // onClick={() => setStep(1)}
              >
                1
              </div>
              <p
                className={`hidden sm:block text-sm 2xl:text-base ${
                  step === 1 ? "text-green" : "text-gray-400"
                }`}
              >
                Step 1
              </p>
            </div>
            <hr
              className={`hidden sm:block w-20 xl:w-48 h-1 my-6 ${
                step === 1 ? "bg-green" : "bg-gray-300"
              }`}
            />
          </div>
          <div className="flex flex-row justify-center align-middle">
            <div className="flex flex-col gap-2 justify-center">
              <div
                className={`w-9 sm:w-12 h-9 sm:h-12 rounded-full flex justify-center border border-gray-400 ${
                  step === 2 ? "bg-green text-white" : "bg-gray-100 text-green"
                } p-1.5 sm:p-3 text-center cursor-pointer`}
                // onClick={() => setStep(2)}
              >
                2
              </div>
              <p
                className={`hidden sm:block text-sm 2xl:text-base ${
                  step === 2 ? "text-green" : "text-gray-400"
                }`}
              >
                Step 2
              </p>
            </div>
            <hr
              className={`hidden sm:block w-20 xl:w-48 h-1 my-6 ${
                step === 2 ? "bg-green" : "bg-gray-300"
              }`}
            />
          </div>
          <div className="flex flex-row justify-center align-middle">
            <div className="flex flex-col gap-2 justify-center">
              <div
                className={`w-9 sm:w-12 h-9 sm:h-12 rounded-full flex justify-center border border-gray-400 ${
                  step === 3 ? "bg-green text-white" : "bg-gray-100 text-green"
                } p-1.5 sm:p-3 text-center cursor-pointer`}
                // onClick={() => setStep(3)}
              >
                3
              </div>
              <p
                className={`hidden sm:block text-sm 2xl:text-base ${
                  step === 3 ? "text-green" : "text-gray-400"
                }`}
              >
                Step 3
              </p>
            </div>
            <hr
              className={`hidden sm:block w-20 xl:w-48 h-1 my-6 ${
                step === 3 ? "bg-green" : "bg-gray-300"
              }`}
            />
          </div>
          <div className="flex flex-row justify-center align-middle">
            <div className="flex flex-col gap-2 justify-center">
              <div
                className={`w-9 sm:w-12 h-9 sm:h-12 rounded-full flex justify-center border border-gray-400 ${
                  step === 4 ? "bg-green text-white" : "bg-gray-100 text-green"
                } p-1.5 sm:p-3 text-center cursor-pointer`}
                // onClick={() => setStep(4)}
              >
                4
              </div>
              <p
                className={`hidden sm:block text-sm 2xl:text-base ${
                  step === 4 ? "text-green" : "text-gray-400"
                }`}
              >
                Step 4
              </p>
            </div>
            <hr
              className={`hidden sm:block w-20 xl:w-48 h-1 my-6 ${
                step === 4 ? "bg-green" : "bg-gray-300"
              }`}
            />
          </div>
          <div className="flex flex-row justify-center align-middle">
            <div className="flex flex-col gap-2 justify-center">
              <div
                className={`w-9 sm:w-12 h-9 sm:h-12 rounded-full flex justify-center border border-gray-400 ${
                  step === 5 ? "bg-green text-white" : "bg-gray-100 text-green"
                } p-1.5 sm:p-3 text-center cursor-pointer`}
                // onClick={() => setStep(5)}
              >
                5
              </div>
              <p
                className={`hidden sm:block text-sm 2xl:text-base ${
                  step === 5 ? "text-green" : "text-gray-400"
                }`}
              >
                Step 5
              </p>
            </div>
          </div>
        </div>
        {step === 1 ? (
          <StepOne step={step} next={handleNext} />
        ) : step === 2 ? (
          <StepOne step={step} back={handleBack} next={handleNext} />
        ) : step === 3 ? (
          <StepOne step={step} back={handleBack} next={handleNext} />
        ) : step === 4 ? (
          <StepOne step={step} back={handleBack} next={handleNext} />
        ) : (
          <StepOne step={step} back={handleBack} next={handleNext} />
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
