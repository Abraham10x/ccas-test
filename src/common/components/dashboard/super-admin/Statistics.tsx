/* eslint-disable react/jsx-key */
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
// import authQueries from "@lib/queries/auth";
import axios from "axios";

const Statistics: FC = () => {
  const [records, setRecords] = useState<any>();

  useEffect(() => {
    const getStats = async () => {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reports/get_statictics_by_user.php?user_type=super_admin&mda=`
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
      title: "Users",
      icon: "record",
      total: records?.users,
    },
    {
      title: "Contracts",
      icon: "certification",
      total: records?.contracts,
    },
    {
      title: "Traning Resources",
      icon: "job",
      total: records?.training,
    },
    {
      title: "Lessons Learnt",
      icon: "skill",
      total: records?.lessons_learnt,
    },
    {
      title: "Contract Templates",
      icon: "training",
      total: records?.contract_template,
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 my-4">
        {statistics.map((stat: any, index: any) => (
          <div
            key={index}
            className="flex justify-between bg-[#fff] shadow-md py-6 px-3 rounded-lg"
          >
            <div>
              <h2 className="text-xl font-extrabold">{stat.total}</h2>
              <p className="text-tx-light-dark text-xs sm:font-bold">
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
