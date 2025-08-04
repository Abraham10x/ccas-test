import Image from "next/image";
import Link from "next/link";
import { readableDate } from "@lib/helper";
import React, { FC } from "react";

interface IProps {
  contract: any;
  certify: any;
  title: string;
}

const KickoffCertificate: FC<IProps> = ({
  contract,
  title,
  certify,
}: IProps) => {
  const Certificatedata = [
    {
      id: 1,
      title: "Unique eFCAS ID",
      body: contract?.efcas_id,
    },
    {
      id: 2,
      title: "Contract Title",
      body: title,
    },
    {
      id: 3,
      title: "MDA",
      body: contract?.mda,
    },
    {
      id: 4,
      title: "Date Of Submission",
      body: readableDate(contract?.created_at),
    },
    {
      id: 5,
      title: "Date Of Clearance",
      body: readableDate(contract?.approved_at),
    },
    {
      id: 6,
      title: "Name of Approver",
      body: certify?.name_of_approver,
    },
    {
      id: 7,
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
        <table className="w-[90%] table-fixed border-collapse border border-gray-900 border-slate-500 mx-10 my-3">
          <thead>
            <tr>
              <th
                colSpan={2}
                className=" border border-gray-900 border-slate-500 font-bold text-sm pt-3 pb-1"
              >
                eFCAS CLEARANCE CERTIFICATE
              </th>
            </tr>
          </thead>
          <tbody>
            {Certificatedata.map((data) => (
              <tr key={data.id}>
                <td
                  className={`border-collapse border border-gray-900 border-slate-500 p-2 w-1/2 text-xs ${
                    data.id > 8 ? "font-bold px-6 text-center" : "text-center"
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
        <div className="mt-2 mx-10">
          <p className="font-normal px-5 py-3 text-xs">
            The Honorable Attorney General of the Federation having scrupulously
            examined the executed contract is satisfied that:
          </p>
          <ol className="font-normal text-xs list-decimal pl-12">
            <li>
              The final copy has adequately incorporated the observations made
              in respect of the draft;
            </li>
            <li className="my-2">
              The risk management and implementation plans are adequate to
              address post execution issues;
            </li>
            <li>
              The executed contract has therefore substantially complied with
              all conditions necessary to protect the Federal Government of
              Nigeria against unnecessary exposures.
            </li>
          </ol>
        </div>
        <div className="flex flex-row my-3 justify-between mx-10 mt-10">
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

export default KickoffCertificate;
