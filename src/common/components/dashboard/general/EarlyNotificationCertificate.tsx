import Image from "next/image";
import Link from "next/link";
import { readableDate } from "@lib/helper";
import React, { FC } from "react";

interface IProps {
  contract: any;
  certify: any;
}

const EarlyNotificationCertificate: FC<IProps> = ({
  contract,
  certify,
}: IProps) => {
  const Certificatedata = [
    {
      id: 1,
      title: "Unique eFCAS ID",
      body: contract?.contract_id,
    },
    {
      id: 2,
      title: "Proposed Contract Title",
      body: contract?.title,
    },
    {
      id: 3,
      title: "Proposed Contract Details",
      body: contract?.details ? "YES" : "NO",
    },
    {
      id: 4,
      title: "Proposed Contract Value",
      body: contract?.contract_value,
    },
    {
      id: 5,
      title: "Addendum/Novation",
      body: contract?.analog_contract,
    },
    {
      id: 6,
      title: "Funding Source",
      body: contract?.funding_source,
    },
    {
      id: 7,
      title: "User Department",
      body: contract?.user_department,
    },
    {
      id: 8,
      title: "Need Assessment",
      body: contract?.need_assessment ? "YES" : "NO",
    },
    {
      id: 9,
      title: "Feasibility Study",
      body: contract?.feasibility_study ? "YES" : "NO",
    },
    {
      id: 10,
      title: "Appropriation Document",
      body: contract?.appropriation_document ? "YES" : "NO",
    },
    {
      id: 11,
      title: "Other File Uploaded",
      body: contract?.file ? "YES" : "NO",
    },
    {
      id: 12,
      title: "Date Created",
      body: readableDate(contract?.date_created),
    },
    {
      id: 13,
      title: "Date Of Approval",
      body: readableDate(contract?.approved_at),
    },
    {
      id: 14,
      title: "Name of Approver",
      body: certify?.name_of_approver,
    },
    {
      id: 15,
      title: "Signature",
      body: "",
    },
  ];
  return (
    <div className="m-5 relative">
      <h1 className="font-medium uppercase text-[7rem] -z-10 opacity-30 absolute top-[25rem] left-20 bottom-0 transform -rotate-[30deg]">
        CONFIDENTIAL
      </h1>
      <div className="border border-gray-900 relative">
        <div className="flex flex-row m-4 justify-between">
          <div></div>
          <div>
            <Image
              className="object-cover"
              src="/img/dashboard/general/coat-arms.png"
              alt="Nigerian coat of arms"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="flex flex-row mx-10 my-3 justify-between">
          <div></div>
          <div className="w-4/12">
            <h1 className="font-extrabold text-sm">
              Federal Ministry of Justice, HQ Plot 71B Shehu Shagari Way,
              Maitama, Abuja
            </h1>
          </div>
        </div>
        <div className="flex mx-auto my-3 items-center justify-center">
          <div>
            <Image
              className="object-cover"
              src="/img/brand-Identity.png"
              alt="Efcas logo"
              width={120}
              height={120}
            />
          </div>
        </div>
        <table className="table-fixed border-collapse border border-gray-900 border-slate-500 mx-10 my-3">
          <thead>
            <tr>
              <th
                colSpan={2}
                className=" border border-gray-900 border-slate-500 font-bold text-sm pt-3 pb-1"
              >
                eFCAS APPROVAL TO PROCEED TO FEC
              </th>
            </tr>
            <tr>
              <th
                colSpan={2}
                className="border-collapse border-gray-900 border border-slate-500 font-normal px-5 py-3 text-xs"
              >
                The Honorable Attorney General of the Federation having
                critically examined the information hereunder and the
                accompanying documents is satisfied that the (MDA) having
                complied with eFCAS early notification process may now proceed
                to obtain BPP Due Process Certification and/or ICRC Compliance
                certificate, as applicable, and thereafter proceed to FEC.
              </th>
            </tr>
          </thead>
          <tbody>
            {Certificatedata.map((data) => (
              <tr key={data.id}>
                <td
                  className={`border-collapse border border-gray-900 border-slate-500 p-2 w-1/2 text-xs ${
                    data.id > 11 ? "font-bold text-center" : "text-center"
                  }`}
                >
                  {data?.title}
                </td>
                <td className="border-collapse border border-gray-900 border-slate-500 text-center w-1/2 text-xs">
                  {data?.body}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-row my-3 justify-between mx-10">
          <p className="font-medium text-xs">Phone: (234) 817 759 3311 </p>
          <a
            href="mailto:info@justice.gov.ng"
            className="font-medium text-xs text-gray-900"
          >
            Email:
            <span className="text-blue-700 hover:text-blue-600 duration-100">
              info@justice.gov.ng
            </span>
          </a>
          <Link href={"https://justice.gov.ng"} legacyBehavior>
            <a
              className="font-medium text-xs text-blue-700 hover:text-blue-600 duration-100"
              href="https://justice.gov.ng"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://justice.gov.ng
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EarlyNotificationCertificate;
