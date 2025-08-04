import Image from "next/image";
import Link from "next/link";
import { readableDate } from "@lib/helper";
import React, { FC } from "react";

interface IProps {
  certificate: any;
  contract: any;
}

const Certificate: FC<IProps> = ({ certificate, contract }: IProps) => {
  const Certificatedata = [
    {
      id: 1,
      title: "Title of Contract/Project",
      body: contract?.title,
    },
    {
      id: 2,
      title: "Unique eFCAS Number",
      body: contract?.contract_id,
    },
    {
      id: 3,
      title: "Proposing MDA",
      body: contract?.mda,
    },
    {
      id: 4,
      title: "Date Draft Contract was submitted to FMOJ for review/go-ahead",
      body: readableDate(contract?.created_at),
    },
    {
      id: 5,
      title: "Post-Award Contract Implementation Plan Has Been Attached ?",
      body: certificate?.post_award,
    },
    {
      id: 6,
      title: "Risks Management Has Been Attached?",
      body: certificate?.risk_management,
    },
    {
      id: 7,
      title:
        "Draft Contract based on FCAS approved Standard Template Has Been Attached?",
      body: certificate?.draft_contract,
    },
    {
      id: 8,
      title:
        "FMOJ-DS having reviewed the draft contract and the implementation plans confirms:",
      body: certificate?.fmoj_ds,
    },
    {
      id: 9,
      title: "CONDITION FOR ISSUANCE (if any):",
      body: certificate?.issuance_condition,
    },
    {
      id: 10,
      title: "Date Of Approval",
      body: readableDate(contract?.approved_at),
    },
    // {
    //   id: 11,
    //   title: "Signature, Name and Designation of Approving Authority",
    //   body: certificate?.signature,
    // },
    {
      id: 11,
      title: "Name of Approver",
      body: certificate?.approver_name,
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
                eFCAS Unique Contract Identifier Go-Ahead
              </th>
            </tr>
            <tr>
              <th
                colSpan={2}
                className="border-collapse border-gray-900 border border-slate-500 font-normal px-5 py-3 text-xs"
              >
                The Federal Ministry of Justice having critically analysed the
                below named draft contract document and the accompanying outline
                post-award implementation & risks plans and monitoring points
                and make the following confirmations before the Contract request
                proceeds to the Federal Executive Council (FEC) Approval for
                award of the contract.
              </th>
            </tr>
          </thead>
          <tbody>
            {Certificatedata.map((data) => (
              <tr key={data.id}>
                <td
                  className={`border-collapse border border-gray-900 border-slate-500 p-2 w-1/2 text-xs ${
                    data.id > 8 ? "font-bold text-left px-6" : "text-center"
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

export default Certificate;
