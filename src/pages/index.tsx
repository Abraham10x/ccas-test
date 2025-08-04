import { NextPage } from "next";
import React from "react";
import Seo from "@components/application/Seo";
import Link from "next/link";
import Image from "next/image";
import { Layout } from "@components/landing/layouts/default";
import {
  DesktopComputerIcon,
  DocumentReportIcon,
  EyeIcon,
} from "@heroicons/react/outline";

const index: NextPage = () => {
  return (
    <Layout>
      <Seo templateTitle="Home" />
      {/* Hero Section */}
      <div className="bg-hero bg-cover bg-top w-full h-[45rem]">
        <div className="flex flex-col justify-center align-middle gap-8 text-center h-full text-white">
          <h1 className="text-3xl lg:text-5xl font-extrabold">
            Federal Contracts Administration System(FCAS)
          </h1>
          <p className="font-medium text-base sm:text-lg w-11/12 lg:w-2/4 mx-auto">
            The objective of the FCAS Framework is to establish a seamless
            contract administration process for all federal government contracts
            that will achieve the best possible value for money with due regard
            to integrity,documentation, efficiency, speed, performance and
            regulatory compliance.
          </p>
          <Link
            legacyBehavior
            href="/login"
            className="text-xl md:my-8 sm:my-0 my-7"
          >
            <a className="pointer text-center text-white rounded-lg focus:outline-none bg-green border-green border-2 py-2 shadow-lg hover:bg-green/80 hover:scale-110 transition delay-150 duration-300 ease-in-out hover:border-green/80 font-bold text-lg w-32 mx-auto">
              Login
            </a>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div id="details" className="my-28 relative">
        <Image
          className="absolute right-0 top-0 -z-10"
          src="/img/landing/icons/teal-circle.svg"
          alt="decoration icon"
          width={800}
          height={800}
        />
        <Image
          className="absolute left-0 bottom-0 -z-10"
          src="/img/landing/icons/red-circle.svg"
          alt="decoration icon"
          width={800}
          height={800}
        />
        <div className="container pt-16 mx-auto pb-8 px-5 sm:px-10 2xl:px-0">
          <h2 className="text-3xl font-bold text-center">
            Principal Components of the system
          </h2>
          <div className="flex flex-col sm:px-12 lg:px-0 lg:flex-row gap-y-9 gap-x-8 mx-auto container mt-10">
            <div className="rounded-xl bg-white px-5 py-10 shadow-xl lg:w-1/3 hover:scale-105 duration-100 cursor-pointer">
              <DesktopComputerIcon
                width={60}
                className="text-green text-right"
              />
              <h3 className="text-xl font-semibold my-6">
                Electronic Contract Administration System
              </h3>
              <p>
                All contracts entered into by MDAs on behalf of the Federal
                Government are to be vetted and reviewed by the Solicitors’
                Department of the FMOJ. Pursuant to the PPA and rules on public
                procurement, all contracts within the threshold of the Federal
                Executive Council (FEC) or Public-Private Partnership requiring
                the Council’s approval shall comply with the FCAS process from
                project conception to completion. These contracts are usually of
                high value, high risk and oftentimes, high complexity and should
                be managed and monitored with a high sense of responsibility
              </p>
            </div>
            <div className="rounded-xl bg-white px-5 py-10 shadow-xl lg:w-1/3 hover:scale-105 duration-100 cursor-pointer">
              <DocumentReportIcon width={60} className="text-green" />
              <h3 className="text-xl font-semibold my-6">
                Post Award Contract Administration System
              </h3>
              <p>
                A post-award administration system is crucial to the successful
                implementation/completion of contracts. At the project kick-off
                stage, after the execution of the contract document, the
                executed contract, and its accompanying documents (Contract
                Registration Form, PACAP, Risk management plan etc) are uploaded
                on the eFCAS by the MDA’s LA not later than two days after the
                contract execution. The hard copy documents shall be submitted
                at the FMOJ and a file opened for the contract administration. A
                unique eFCAS No shall be generated for every contract registered
                in the system. The open file shall also have written on it the
                unique eFCAS No for ease of tracking.
              </p>
            </div>
            <div className="rounded-xl bg-white px-5 py-10 shadow-xl lg:w-1/3 hover:scale-105 duration-100 cursor-pointer">
              <EyeIcon width={60} className="text-green" />
              <h3 className="text-xl font-semibold my-6">
                Contract Monitoring
              </h3>
              <p>
                The contract monitoring phase is tracked on the eFCAS portal by
                the ‘traffic light’ performance markers (green, amber & red).
                These markers show the state of a given contract at the time of
                monitoring and evaluation.
                <br /> •Green: this indicates a contract/project that is on
                track based on pre-contract implementation plan, or
                completed/closed out contract.
                <br />
                •Amber: this indicates a failing contract.
                <br />
                •Red: this indicates a completely failed contract
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div id="gallery" className="bg-white my-28">
        <div className="my-20 container pt-16 mx-auto pb-8 px-5 sm:px-10 2xl:px-0">
          <h2 className="text-3xl font-bold text-center">System Snapshots</h2>
          <div className="flex flex-col sm:px-12 lg:px-0 lg:flex-row gap-y-9 gap-x-8 mx-auto container mt-10">
            <div className="w-full lg:w-1/3 rounded-xl relative overflow-hidden cursor-pointer">
              <Image
                className="w-full h-full"
                src="/img/landing/contract.png"
                alt="FCAS Contract page"
                width={300}
                height={300}
              />
              <div className="hover:bg-opacity-50 hover:bg-green text-white hover:text-white hover:text-opacity-100 text-opacity-0 absolute top-0 left-0 w-full h-full duration-100 text-center flex justify-center align-middle">
                <p className="font-semibold text-2xl top-0 left-0 w-full h-full translate-y-[40%]">
                  Contract
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/3 rounded-xl relative overflow-hidden cursor-pointer">
              <Image
                className="w-full h-full"
                src="/img/landing/monitoring.png"
                alt="FCAS Monitoring page"
                width={300}
                height={300}
              />
              <div className="hover:bg-opacity-50 hover:bg-green text-white hover:text-white hover:text-opacity-100 text-opacity-0 absolute top-0 left-0 w-full h-full duration-100 text-center flex justify-center align-middle">
                <p className="font-semibold text-2xl top-0 left-0 w-full h-full translate-y-[40%]">
                  Monitoring
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/3 rounded-xl relative overflow-hidden cursor-pointer">
              <Image
                className="w-full h-full"
                src="/img/landing/template.png"
                alt="FCAS Template page"
                width={300}
                height={300}
              />
              <div className="hover:bg-opacity-50 hover:bg-green text-white hover:text-white hover:text-opacity-100 text-opacity-0 absolute top-0 left-0 w-full h-full duration-100 text-center flex justify-center align-middle">
                <p className="font-semibold text-2xl top-0 left-0 w-full h-full translate-y-[40%]">
                  Templates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-[#4b4000] mt-20 pb-20">
        <div className="container mx-auto pb-8 px-5 sm:px-10 2xl:px-0">
          <h2 className="text-xl font-bold text-center pt-12 text-green">
            About
          </h2>
          <h2 className="text-3xl font-bold text-center pb-12 pt-2 text-white">
            Aberdeen Commercial
          </h2>
          <div className="flex flex-col sm:px-12 lg:px-0 lg:flex-row justify-between gap-y-10 mt-10">
            <Image
              className="w-full basis-1/2"
              src="/img/landing/aberdeen mockup.png"
              alt="Aberdeen commercial"
              width={500}
              height={500}
            />
            <p className="text-lg font-medium text-white my-auto basis-1/2">
              At Aberdeen Commercial, our aim is simple: help our clients become
              industry leaders by deploying world-class standard processes and
              procedures that are globally applicable, competitive and would
              produce more value for the organisations. We are also particular
              about sustainable relationships, achievable through our mentoring
              and continuous update.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;
