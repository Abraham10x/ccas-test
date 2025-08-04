import { NextPage } from "next";
import AuthRegisterForm from "@components/application/auth/AuthRegisterForm";
import Seo from "@components/application/Seo";
import Image from "next/image";
import Link from "next/link";

const Register: NextPage = () => {
  return (
    <div>
      <Seo templateTitle="Login" />
      <main>
        <div className="flex flex-col sm:flex-row overflow-y-hidden">
          <div className="bg-auth relative bg-no-repeat h-auto bg-cover basis-5/12 pb-20 sm:pb-0 p-10 2xl:px-20">
            <Link href="/">
              <figure>
                <Image
                  src="/img/home/brand-identity.png"
                  alt="logo"
                  className="w-1/2 z-[999]"
                  width={500}
                  height={500}
                />
              </figure>
            </Link>
            <p className="text-white font-sans font-extrabold text-2xl 2xl:pr-28 mt-10 sm:absolute sm:top-[30rem] lg:top-[42rem] xl:top-[34rem] 2xl:top-[42rem]">
              Create an individual profile on the NOGICJQS platform to access
              amazing opportunities within the Nigerian oil and gas industry.
            </p>
          </div>
          <div className="basis-7/12 h-screen overflow-y-scroll">
            <div className=" relative bg-white w-9/12 lg:w-8/12 2xl:w-7/12 sm:p-8 my-7 mx-auto h-auto">
              <div className="relative z-20">
                <div className=" mx-auto">
                  <AuthRegisterForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
