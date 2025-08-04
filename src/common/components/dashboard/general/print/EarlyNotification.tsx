import { FC } from "react";
import { Box } from "@mui/system";
import { formatAmount, readableDate, retrieveToken } from "@lib/helper";
import Image from "next/image";
import commentQueries from "@lib/queries/comment";

interface Iprops {
  earlyData: any;
}

const EarlyNotification: FC<Iprops> = ({ earlyData }: Iprops) => {
  const userType = retrieveToken("userType");
  const earlyID = retrieveToken("earlyID");
  const legal =
    userType === "Legal Adviser" || userType === "Legal Director"
      ? "legal"
      : "";
  const comments = commentQueries.getComment(
    "early_notifications",
    earlyID,
    legal
  );
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
                  Early Notifications
                  <br />{" "}
                </h1>
                <p className="text-sm font-normal text-green">
                  {readableDate(earlyData?.date_created)}
                </p>
              </div>
            </div>
            <div className="mt-20 grid grid-cols-4 gap-y-5 justify-between w-full">
              {userType === "Legal Adviser" || userType === "Legal Director" ? (
                <></>
              ) : (
                <div className="flex flex-col gap-1">
                  <h5 className="text-sm font-semibold">Unique FCAS ID</h5>
                  <p className="text-sm font-normal text-tx-light-dark break-words">
                    {earlyData?.contract_id}
                  </p>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <h5 className="text-sm font-semibold">Contract Title</h5>
                <p className="text-sm font-normal text-tx-light-dark break-words">
                  {earlyData?.title}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h5 className="text-sm font-semibold">Status</h5>
                <p className="text-sm font-normal text-tx-light-darkbreak-words">
                  <div
                    className={`${
                      earlyData?.status === "Approved"
                        ? "text-green"
                        : earlyData?.status === "Rejected"
                        ? "text-[#F86652]"
                        : earlyData?.status === "PENDING"
                        ? "text-[#8D8A00]"
                        : ""
                    }`}
                  >
                    {earlyData?.status === "Approved"
                      ? "Accepted"
                      : earlyData?.status === "Rejected"
                      ? "Returned"
                      : earlyData?.status === "PENDING"
                      ? "Pending"
                      : ""}
                  </div>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h5 className="text-sm font-semibold">Addendum/Novation</h5>
                <p className="text-sm font-normal text-tx-light-dark break-words">
                  {earlyData?.analog_contract}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h5 className="text-sm font-semibold">Contract Details</h5>
                <p className="text-sm font-normal text-tx-light-dark break-words">
                  {earlyData?.details ?? "No details"}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h5 className="text-sm font-semibold">Date Created</h5>
                <p className="text-sm font-normal text-tx-light-dark break-words">
                  {readableDate(earlyData?.date_created)}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h5 className="text-sm font-semibold">Date of Approval</h5>
                <p className="text-sm font-normal text-tx-light-dark break-words">
                  {readableDate(earlyData?.approved_at)}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h5 className="text-sm font-semibold">Contract Value</h5>
                <p className="text-sm font-normal text-tx-light-dark break-words">
                  {formatAmount(earlyData?.contract_value)}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h5 className="text-sm font-semibold">Funding Source</h5>
                <p className="text-sm font-normal text-tx-light-dark break-words">
                  {earlyData?.funding_source}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h5 className="text-sm font-semibold">User Department</h5>
                <p className="text-sm font-normal text-tx-light-dark break-words">
                  {earlyData?.user_department}
                </p>
              </div>
              <div>
                <h3 className="font-bold text-sm">Appropriation Document</h3>
                {earlyData?.appropriation_document === "" ? (
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
                      href={earlyData?.appropriation_document}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </div>
              <div>
                <h3 className="font-bold text-sm">Need Assessment</h3>
                {earlyData?.need_assessment === "" ? (
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
                      href={earlyData?.need_assessment}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </div>
              <div>
                <h3 className="font-bold text-sm">Feasibility Study</h3>
                {earlyData?.feasibility_study === "" ? (
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
                      href={earlyData?.feasibility_study}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </div>
              <div>
                <h3 className="font-bold text-sm">Other Documents</h3>
                {earlyData?.other_file_uploaded === "" ? (
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
                      href={earlyData?.other_file_uploaded}
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
                  {earlyData?.final_comment && (
                    <div className="flex flex-col gap-1">
                      <h5 className="text-sm font-semibold">Final Comment</h5>
                      <p className="text-sm font-normal text-tx-light-dark break-words">
                        {earlyData?.final_comment}
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

export default EarlyNotification;
