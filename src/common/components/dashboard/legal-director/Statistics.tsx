/* eslint-disable react/jsx-key */
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { retrieveToken } from "@lib/helper";

const Statistics: FC = () => {
  const [records, setRecords] = useState<any>();
  const mda = retrieveToken("mda");
  useEffect(() => {
    const getStats = async () => {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reports/get_statictics_by_user.php?user_type=other&mda=${mda}`
      );
      const record = data?.data?.records;
      setRecords(record);
      return data?.data?.records;
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getStats();
  }, []);

  const statistics = [
    {
      title: "Early Notification",
      icon: "record",
      total: records?.early_notification,
    },
    {
      title: "Contracts",
      icon: "certification",
      total: records?.contracts,
    },
    {
      title: "KPIs",
      icon: "job",
      total: records?.monitoring_stage,
    },
    {
      title: "Close Out",
      icon: "skill",
      total: records?.close_out,
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-4">
        {statistics.map((stat: any, index: any) => (
          <div
            key={index}
            className="flex justify-between bg-[#fff] shadow-md py-6 px-3 rounded-lg"
          >
            <div>
              <h2 className="text-lg sm:text-xl font-bold sm:font-extrabold">
                {stat.total}
              </h2>
              <p className="text-tx-light-dark text-xs font-bold">
                {stat.title}
              </p>
            </div>
            <div>
              <Image
                alt={stat.title}
                src={`/img/dashboard/stats-icons/${stat.icon}.svg`}
                className="fill-current text-red"
                height={35}
                width={35}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Statistics;
