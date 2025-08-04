/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC } from "react";
import Image from "next/image";
import { readableDate, retrieveToken } from "@lib/helper";
import { Box } from "@mui/material";
import commentQueries from "@lib/queries/comment";

interface IProps {
  kickoff: any;
}

const Kickoff: FC<IProps> = ({ kickoff }: IProps) => {
  const kickoffId = retrieveToken("kickoffId");
  const userType = retrieveToken("userType");
  const legal =
    userType === "Legal Adviser" || userType === "Legal Director"
      ? "legal"
      : "";
  const comments = commentQueries.getComment("kickoff", kickoffId, legal);
  const commentData = comments?.data?.data?.comments;
  return (
    <div>
      <Box>
        <div>
          <div className="mt-10 mb-10">
            <div className="flex justify-between items-center">
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
                  style={{ fontSize: "20px", textAlign: "right" }}
                  className="font-bold"
                >
                  Kickoff
                  <br />{" "}
                </h1>
                <p className="text-sm font-normal text-green">
                  {readableDate(kickoff?.created_at)}
                </p>
              </div>
            </div>
            <div className="mt-20 grid grid-cols-4 gap-y-5 justify-between w-full">
              {userType === "Legal Adviser" || userType === "Legal Director" ? (
                <></>
              ) : (
                <div className="flex flex-col gap-1">
                  <h5 className="text-sm font-semibold">Unique FCAS ID</h5>
                  <p className="text-sm font-normal text-tx-light-dark">
                    {kickoff?.efcas_id}
                  </p>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <h5 className="text-sm font-semibold">Status</h5>
                <p className="text-sm font-normal text-tx-light-dark break-words">
                  <div
                    className={`${
                      kickoff?.status === "Approve"
                        ? "text-green"
                        : kickoff?.status === "Reject"
                        ? "text-[#F86652]"
                        : kickoff?.status === "PENDING"
                        ? "text-[#8D8A00]"
                        : ""
                    }`}
                  >
                    {kickoff?.status === "Approve"
                      ? "Accepted"
                      : kickoff?.status === "Reject"
                      ? "Returned"
                      : kickoff?.status === "PENDING"
                      ? "Pending"
                      : ""}
                  </div>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h5 className="text-sm font-semibold">MDA</h5>
                <p className="text-sm font-normal break-words text-tx-light-dark">
                  {kickoff?.mda}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h5 className="text-sm font-semibold">Date Created</h5>
                <p className="text-sm font-normal text-tx-light-dark break-words">
                  {readableDate(kickoff?.created_at)}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h5 className="text-sm font-semibold">Date of Approval</h5>
                <p className="text-sm font-normal text-tx-light-dark break-words">
                  {readableDate(kickoff?.approved_at)}
                </p>
              </div>
              <div>
                <h3 className="font-bold text-sm">Post Award Plan</h3>
                {kickoff?.final_post_award_plan === "" ? (
                  <p className="text-sm font-normal text-tx-light-dark break-words">
                    No file uploaded
                  </p>
                ) : (
                  <p
                    style={{ textDecoration: "underline", color: "blue" }}
                    className="text-sm"
                  >
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={kickoff?.final_post_award_plan}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </div>
              <div>
                <h3 className="font-bold text-sm">Risk Management Plan</h3>
                {kickoff?.final_risk_management_plan === "" ? (
                  <p className="text-sm font-normal text-tx-light-dark">
                    No file uploaded
                  </p>
                ) : (
                  <p
                    style={{ textDecoration: "underline", color: "blue" }}
                    className="text-sm"
                  >
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={kickoff?.final_risk_management_plan}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </div>
              <div>
                <h3 className="font-bold text-sm">Other Documents</h3>
                {kickoff?.other_documents === "" ? (
                  <p className="text-sm font-normal text-tx-light-dark">
                    No file uploaded
                  </p>
                ) : (
                  <p
                    style={{ textDecoration: "underline", color: "blue" }}
                    className="text-sm"
                  >
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={kickoff?.other_documents}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </div>
            </div>
            {userType === "FMOJ Reviewer" ||
            userType === "FMOJ system authorizer" ||
            userType === "external reviewer" ? (
              <div className="mt-10">
                <h3 className="text-base font-extrabold">Comments</h3>
                <div className="mt-5 grid grid-cols-1 gap-y-5 justify-between w-full">
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
            {userType === "Legal Adviser" || userType === "Legal Director" ? (
              <></>
            ) : (
              <div className="flex flex-col gap-12 mt-20">
                <div className="basis-1/2 mx-4">
                  <div className="flex flex-row gap-3">
                    <h5 className="text-sm font-semibold">Name:</h5>
                    <div className="flex flex-col relative w-full">
                      <p className="font-bold text-xs">HAGF/SGF/PS</p>
                      <hr className="h-0.5 bg-black w-full mt-4 absolute bottom-0.5" />
                    </div>
                  </div>
                </div>
                <div className="basis-1/2 mx-4">
                  <div className="flex flex-row gap-3">
                    <h5 className="text-sm font-semibold">Signature:</h5>
                    <hr className="h-0.5 bg-black w-full mt-4" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Kickoff;
