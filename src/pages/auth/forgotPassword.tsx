import Form from "../../common/components/application/auth/AuthForgotForm";
import React from "react";
// import Image from "next/image";

const ResetPassword: React.FC = () => {
  return (
    <div>
      <div className="bg-password grid grid-cols-1 justify-centern align-middle relative bg-no-repeat h-screen bg-cover overflow-y-hidden">
        <div className="my-auto px-6 w-full sm:w-2/3 lg:w-6/12 xl:w-5/12 2xl:w-[30%] mx-auto">
          <div className=" bg-white rounded-xl p-8 m sm:mx-4">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
