/* eslint-disable @typescript-eslint/no-floating-promises */
import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import DirectorMenu from "../../../common/lib/dashboard/menu/legal.director.menu.json";
import Header from "@components/dashboard/Header";
import { Button } from "@components/application/base/Button";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TbArrowBarRight } from "react-icons/tb";
import Image from "next/image";
import BaseFormInput from "@components/application/base/form/BaseFormInput";
import Card from "@components/application/Card";
import contractRegQueries from "@lib/queries/contract-reg";
import { readableDate, retrieveToken, storeToken } from "@lib/helper";
import { useRouter } from "next/router";

const MonitoringStage: NextPage = () => {
  const mda = retrieveToken("mda");
  const response = contractRegQueries.readByOnlyMda(mda);

  const data =
    response?.data?.data?.contracts === undefined
      ? []
      : response?.data?.data?.contracts;

  const router = useRouter();
  const handleRoute = (id: any, title: any) => {
    storeToken("title", title);
    storeToken("contractId", id);
    router.push({
      pathname: `/dashboard/legal-director/monitoring/${id}`,
      // query: {
      //   id,
      // },
    });
  };

  return (
    <Dashboard navMenu={DirectorMenu}>
      <Seo templateTitle="Monitoring Stage" />
      <Header />
      <div className="px-5 sm:px-10 mt-5 sm:mt-10">
        <div className="my-5 py-5">
          <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
            Monitoring Stage
          </h1>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            Pick a contract then proceed with the monitoring stage
          </p>
        </div>
        <div className="my-6 flex flex-col sm:flex-row justify-between align-middle gap-4">
          <div className="flex flex-col sm:flex-row sm:px-3 gap-4 align-middle">
            <BaseFormInput
              name="search"
              placeholder="Search"
              className="w-full sm:w-96 h-full"
            />
            <Button className="flex flex-row px-2 gap-2 border border-gray-200">
              <Image
                className="my-auto"
                src="/img/icons/filter.svg"
                alt="filter icon"
                width={20}
                height={20}
              />
              <p className="text-base">Filter</p>
              <MdKeyboardArrowDown className="h-5 w-5 my-auto" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mt-20">
          {data.map((item: any) => (
            <Card
              key={item.id}
              className="p-10 hover:bg-[#CCF2D080] cursor-pointer"
            >
              {/* <a href={`/dashboard/legal-adviser/MonitoringExtra?id=${item.id}`}> */}
              <div
                className="flex flex-col gap-7"
                onClick={() => handleRoute(item.id, item.title)}
              >
                <div className="flex flex-row justify-between">
                  <HiOutlineDocumentText className="w-10 h-10" />
                </div>
                <p className="text-sm font-medium">{item.title}</p>
                <div className="flex flex-row justify-between align-middle">
                  <div className="flex flex-row gap-3">
                    <div className="p-2 rounded-xl bg-[#18BB0C1A]">
                      <p className="text-sm text-green">{item.status}</p>
                    </div>
                    <p className="text-sm font-bold my-auto">
                      {readableDate(item.created_at)}
                    </p>
                  </div>
                  <TbArrowBarRight className="my-auto w-6 h-6 text-[#00674C]" />
                </div>
              </div>
              {/* </a> */}
            </Card>
          ))}
        </div>
      </div>
    </Dashboard>
  );
};

export default MonitoringStage;
