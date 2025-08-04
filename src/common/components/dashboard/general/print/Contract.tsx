/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { formatAmount, readableDate, retrieveToken } from "@lib/helper";
import { FC } from "react";
import Image from "next/image";
import commentQueries from "@lib/queries/comment";

interface IProps {
  data: any;
}

const Contract: FC<IProps> = ({ data }: IProps) => {
  const userType = retrieveToken("userType");
  const contractID = retrieveToken("contractID");
  const legal =
    userType === "Legal Adviser" || userType === "Legal Director"
      ? "legal"
      : "";
  const comments = commentQueries.getComment("contract", contractID, legal);
  const commentData = comments?.data?.data?.comments;
  const contractInfo = [
    {
      id: 1,
      title: "Unique FCAS ID",
      body: data?.contract_id,
    },
    {
      id: 2,
      title: "Contract Title",
      body: data?.title,
    },
    {
      id: 3,
      title: "Status",
      body: data?.status,
    },
    {
      id: 4,
      title: "Typology 1",
      body: data?.bpp,
    },
    {
      id: 5,
      title: "Typology 2",
      body: data?.typology,
    },
    {
      id: 6,
      title: "Amount approved by MTB",
      body: formatAmount(data?.amount_mtb),
    },
    {
      id: 7,
      title: "VAT",
      body: data?.vat,
    },
    {
      id: 8,
      title: "Withholding Tax",
      body: formatAmount(data?.withholding_tax),
    },
    {
      id: 9,
      title: "Advance Payment",
      body: data?.advance_payment,
    },
    {
      id: 10,
      title: "Headline Scope",
      body: data?.scope,
    },
    {
      id: 11,
      title: "Contract Duration",
      body: data?.duration,
    },
    {
      id: 12,
      title: "Contract Location",
      body: data?.location,
    },
    {
      id: 13,
      title: "Date Created",
      body: data?.created_at,
    },
    {
      id: 14,
      title: "Date of Approval",
      body: data?.approved_at,
    },
    {
      id: 15,
      title: "MDA",
      body: data?.mda,
    },
  ];

  const contractSponsor = [
    {
      id: 1,
      title: "Accounting Officer Name (MDA)",
      body: data?.mdax1_name,
    },
    {
      id: 2,
      title: "Accounting Officer Phone (MDA)",
      body: data?.mdax1_phone,
    },
    {
      id: 3,
      title: "Accounting Officer Email (MDA)",
      body: data?.mdax1_email,
    },
    {
      id: 4,
      title: "Accounting Officer Position (MDA)",
      body: data?.mdax1_position,
    },
    {
      id: 5,
      title: "Director User Department Name (MDA)",
      body: data?.mdax2_name,
    },
    {
      id: 6,
      title: "Director User Department Phone (MDA)",
      body: data?.mdax2_phone,
    },
    {
      id: 7,
      title: "Director User Department Email (MDA)",
      body: data?.mdax2_email,
    },
    {
      id: 8,
      title: "Director User Department Position (MDA)",
      body: data?.mdax2_position,
    },
    {
      id: 9,
      title: "Legal Adviser Person Name",
      body: data?.mda_lfp_name,
    },
    {
      id: 10,
      title: "Legal Adviser Person Phone",
      body: data?.mda_lfp_phone,
    },
    {
      id: 11,
      title: "Legal Adviser Person Email",
      body: data?.mda_lfp_email,
    },
    {
      id: 12,
      title: "Legal Adviser Person Postion",
      body: data?.lfp_position,
    },
  ];

  const ContractorDetails = [
    {
      id: 1,
      title: "Contractor Type",
      body: data?.ct_type,
    },
    {
      id: 2,
      title: "Contractor Name",
      body: data?.ct_name,
    },
    {
      id: 3,
      title: "CAC Registration Number",
      body: data?.ct_cac_reg_number,
    },
    {
      id: 4,
      title: "Website",
      body: data?.ct_web,
    },
    {
      id: 5,
      title: "Office Address",
      body: data?.ct_office_address,
    },
    {
      id: 6,
      title: "Phone Number",
      body: data?.ct_phone,
    },
    {
      id: 7,
      title: "Email Address",
      body: data?.ct_email,
    },
    {
      id: 8,
      title: "Tax Identification Number",
      body: data?.ct_taxid,
    },
    {
      id: 9,
      title: "Project Office Details",
      body: data?.ct_project_office,
    },
    {
      id: 10,
      title: "Name of MD/CEO",
      body: data?.ct_rep_name,
    },
    {
      id: 11,
      title: "CEO Address",
      body: data?.ct_rep_address,
    },
    {
      id: 12,
      title: "CEO Phone Number",
      body: data?.ct_rep_phone,
    },
    {
      id: 13,
      title: "CEO Email Address",
      body: data?.ct_rep_email,
    },
  ];

  const ContractorTeam = [
    {
      id: 1,
      title: "Contractor Team Rep 1 Name",
      body: data?.ct_rep1_name,
    },
    {
      id: 2,
      title: "Contractor Team Rep 1 Adderss",
      body: data?.ct_rep1_address,
    },
    {
      id: 3,
      title: "Contractor Team Rep 1 Phone",
      body: data?.ct_rep1_phone,
    },
    {
      id: 4,
      title: "Contractor Team Rep 1 Email",
      body: data?.ct_rep1_email,
    },
    {
      id: 5,
      title: "Contractor Team Rep 1 Position",
      body: data?.ct_rep1_position,
    },
    {
      id: 6,
      title: "Contractor Team Rep 2 Name",
      body: data?.ct_rep2_name,
    },
    {
      id: 7,
      title: "Contractor Team Rep 2 Adderss",
      body: data?.ct_rep2_address,
    },
    {
      id: 8,
      title: "Contractor Team Rep 2 Phone",
      body: data?.ct_rep2_phone,
    },
    {
      id: 9,
      title: "Contractor Team Rep 2 Email",
      body: data?.ct_rep2_email,
    },
    {
      id: 10,
      title: "Contractor Team Rep 2 Position",
      body: data?.ct_rep2_position,
    },
  ];

  const ContractUploads = [
    {
      id: 1,
      title: "Draft contract",
      link: data?.draft_contract_upload,
    },
    {
      id: 2,
      title: "BPP NO Objection",
      link: data?.bpp_no_objection,
    },
    {
      id: 3,
      title: "Letter of Award",
      link: data?.letter_of_award,
    },
    {
      id: 4,
      title: "Draft Post-Award Contract Administration Plan",
      link: data?.draft_pacap_upload,
    },
    {
      id: 5,
      title: "Draft Risk Management Plan",
      link: data?.draft_rmp_upload,
    },
    {
      id: 6,
      title: "Due Diligence Report",
      link: data?.cac_reg_upload,
    },
    {
      id: 7,
      title: "Letter of Acceptance",
      link: data?.letter_of_acceptance,
    },
    {
      id: 8,
      title: "ICRC Compliance",
      link: data?.icrc,
    },
    {
      id: 9,
      title: "Means of National Identification of MD/CEO",
      link: data?.ni_rep_upload,
    },
    {
      id: 10,
      title: "Means of National Identification of Contractor Team",
      link: data?.ni_rep1_upload,
    },
    {
      id: 11,
      title: "FEC Extract",
      link: data?.fec_extract,
    },
    {
      id: 12,
      title: "NITDA Certificate",
      link: data?.nitda,
    },
    {
      id: 13,
      title: "Other Documents",
      link: data?.other_uploads,
    },
  ];
  return (
    <div className="mt-10 mb-10">
      <div className="flex justify-between s-center">
        <div className="">
          <Image
            src="/img/brand-Identity.png"
            alt="Logo"
            width={180}
            height={180}
          />
        </div>
        <div>
          <h1
            style={{ fontSize: "23px", textAlign: "right" }}
            className="font-bold"
          >
            Contract
            <br />{" "}
          </h1>
          <div className="flex flex-row gap-3 w-full">
            <p className="text-base font-normal text-green">
              {readableDate(data?.created_at)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 mx-4">
        <h2 className="font-extrabold text-lg">Contract</h2>
        <div className="mt-6 grid grid-cols-4 gap-5 justify-between w-full">
          {contractInfo.map((data) => (
            <>
              {(data?.id === 1 && userType === "Legal Adviser") ||
              userType === "Legal Director" ? (
                <></>
              ) : (
                <div key={data.id} className="flex flex-col gap-1">
                  <h5 className="text-sm font-semibold">{data.title}</h5>
                  <p className="text-sm font-normal text-tx-light-dark">
                    {data.body}
                  </p>
                </div>
              )}
            </>
          ))}
        </div>
      </div>

      <div className="mt-16 mx-4">
        <h2 className="font-extrabold text-lg">
          Contract Sponsor/Administrator
        </h2>
        <div className="mt-6 grid grid-cols-4 gap-5 justify-between w-full">
          {contractSponsor.map((data) => (
            <div key={data.id} className="flex flex-col gap-1">
              <h5 className="text-sm font-semibold">{data.title}</h5>
              <p className="text-sm font-normal text-tx-light-dark break-words">
                {data.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-48 mx-4">
        <h2 className="font-extrabold text-lg">Contractor Details</h2>
        <div className="mt-6 grid grid-cols-4 gap-5 justify-between w-full">
          {ContractorDetails.map((data) => (
            <div key={data.id} className="flex flex-col gap-1">
              <h5 className="text-sm font-semibold">{data.title}</h5>
              <p className="text-sm font-normal text-tx-light-dark break-words">
                {data.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 mx-4">
        <h2 className="font-extrabold text-lg">Contractor Team</h2>
        <div className="mt-6 grid grid-cols-4 gap-5 justify-between w-full">
          {ContractorTeam.map((data) => (
            <div key={data.id} className="flex flex-col gap-1">
              <h5 className="text-sm font-semibold">{data.title}</h5>
              <p className="text-sm font-normal text-tx-light-dark break-words">
                {data.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-60 mx-4">
        <h2 className="font-extrabold text-lg">Uploads</h2>
        <div className="mt-6 grid grid-cols-4 gap-5 justify-between w-full">
          {ContractUploads.map((data) => (
            <div key={data.id}>
              <h3 className="font-bold text-sm">{data.title}</h3>
              {data.link === "" ? (
                <p className="text-sm">No file uploaded</p>
              ) : (
                <p
                  style={{ textDecoration: "underline", color: "blue" }}
                  className="text-sm"
                >
                  <a target="_blank" rel="noreferrer noopener" href={data.link}>
                    Click to view
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
        {userType === "FMOJ Reviewer" ||
        userType === "FMOJ system authorizer" ||
        userType === "external reviewer" ? (
          <div className="mt-10">
            <h3 className="text-base font-extrabold">Comments</h3>
            <div className="mt-5 grid grid-cols-1 gap-y-5 justify-between w-full">
              {data?.final_comment && (
                <div className="flex flex-col gap-1">
                  <h5 className="text-sm font-semibold">Final Comment</h5>
                  <p className="text-sm font-normal text-tx-light-dark break-words">
                    {data?.final_comment}
                  </p>
                </div>
              )}
              {commentData?.length > 0 ? (
                commentData?.map((data: any, index: any) => (
                  <div key={index} className="flex flex-col gap-1">
                    <h5 className="font-semibold">{data?.name}</h5>
                    <h5 className="text-sm font-semibold mb-1">
                      {data?.user_title}
                    </h5>
                    <div
                      className="font-normal text-tx-light-dark"
                      dangerouslySetInnerHTML={{ __html: data?.comment }}
                    />
                  </div>
                ))
              ) : (
                <p className="text-sm">No comments yet</p>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {userType === "Legal Adviser" || userType === "Legal Director" ? (
        <></>
      ) : (
        <div className="flex flex-col gap-12 mt-20">
          <div className="basis-1/2 mx-4">
            <div className="flex flex-row gap-3">
              <h5 className="text-base font-semibold">Name:</h5>
              <div className="flex flex-col relative w-full">
                <p className="font-bold text-xs">HAGF/SGF/PS</p>
                <hr className="h-0.5 bg-black w-full mt-4 absolute bottom-0.5" />
              </div>
            </div>
          </div>
          <div className="basis-1/2 mx-4">
            <div className="flex flex-row gap-3">
              <h5 className="text-base font-semibold">Signature:</h5>
              <hr className="h-0.5 bg-black w-full mt-4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contract;
