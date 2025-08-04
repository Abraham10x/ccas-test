import Image from "next/image";
import { FC } from "react";
import FooterContact from "./FooterContact";

const Footer: FC = () => {
  return (
    <footer className="bg-[#FFC200] border-t-8 border-green">
      <div className="container pt-16 mx-auto pb-8 px-5 sm:px-10 2xl:px-0">
        <div className="flex flex-col sm:flex-row justify-between pb-10 text-center sm:text-left gap-y-10">
          <div className="basis-1/2">
            <figure>
              <div className="relative h-20 mx-auto sm:mx-0 sm:h-20 w-full">
                <Image
                  src="/img/landing/FCAS-logo.png"
                  alt="company logo"
                  width={150}
                  height={150}
                />
              </div>
            </figure>
            <p className="text-black text-left font-normal font-serif text-base sm:text-lg lg:text-xl mt-12 w-full xl:w-[80%]">
              © 2023. FCAS. All Right Reserved.
            </p>
          </div>
          <div>
            <FooterContact />
          </div>
        </div>
      </div>
      <div className="py-5 border-t border-gray-500 flex flex-row justify-center items-center border-lime-900">
        <hr className="bg-white" />
        <p className="font-normal mr-2 text-center uppercase text-base sm:text-lg font-sans text-black">
          Created by{" "}
          <span className="underline text-[#004B08] hover:text-green duration-150 font-bold">
            <a href="#" rel="noreferer noopener" target="_blank">
              Aberdeen Commercial
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
