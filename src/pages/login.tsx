import { NextPage } from "next";
import Link from "next/link";
import AuthLoginForm from "@components/application/auth/AuthLoginForm";
import Seo from "@components/application/Seo";
import Image from "next/image";

const Login: NextPage = () => {
  return (
    <div>
      <Seo templateTitle="Login" />
      <main>
        <div className="flex flex-col sm:flex-row overflow-y-hidden">
          <div className="bg-auth relative bg-no-repeat h-auto bg-cover basis-5/12 pb-20 sm:pb-0 p-10 2xl:px-20">
            {/* <Link href="/">
              <figure>
                <Image
                  src="/img/brand-identity-2.png"
                  alt="logo"
                  className="w-1/2 z-[999]"
                  width={500}
                  height={500}
                />
              </figure>
            </Link> */}
          </div>
          <div className="basis-7/12 h-screen overflow-y-scroll">
            <div className=" relative bg-white w-9/12 lg:w-8/12 2xl:w-7/12  sm:p-8 my-7 mx-auto h-auto">
              <Link legacyBehavior href="/">
                {/* <figure> */}
                <Image
                  src="/img/brand-identity-3.png"
                  alt="logo"
                  className="w-1/2 z-[999]"
                  width={200}
                  height={200}
                />
                {/* </figure> */}
              </Link>
              <div className="relative z-20">
                <div className=" mx-auto py-[90px] lg:py-[150px] xl:py-[90px] 2xl:py-[165px]">
                  <h2 className="text-[2rem] text-gray-900 font-extrabold font-sans mb-8">
                    Login to Your <br /> Account
                  </h2>
                  <AuthLoginForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
