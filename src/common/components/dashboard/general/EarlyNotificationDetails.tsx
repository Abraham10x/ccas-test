import { FC, useEffect, useRef, useState } from "react";
import { formatAmount, readableDate, retrieveToken } from "@lib/helper";
import axios from "axios";
import { Button, SubmitButton } from "@components/application/base/Button";
import { Box } from "@mui/system";
// import commentQueries from "@lib/queries/comment";
import EarlyNotificationUpload from "@components/dashboard/system-authorizer/upload/UploadCopyModal";
import Comment from "../reviewers/Comment";
import ReactToPrint from "react-to-print";
import EarlyNotification from "./print/EarlyNotification";
import Accordion from "@components/application/PrintAccordion";
import { useRouter } from "next/router";
import EarlyNotificationCertificate from "./EarlyNotificationCertificate";
import EarlyNotiCertificateForm from "../system-authorizer/certitificate/EarlyNotiCertificateForm";
import authQueries from "@lib/queries/auth";
import certificateQueries from "@lib/queries/certificate-print";
import SignedCertificateForm from "../system-authorizer/certitificate/SignedCertificateForm";
import commentQueries from "@lib/queries/comment";

const EarlyNotificationDetails: FC = () => {
  const userId = retrieveToken("userId");
  const earlyID = retrieveToken("earlyID");
  const [earlyData, setEarlyData] = useState<any>();
  const userType = retrieveToken("userType");
  const response = certificateQueries.getEarlyCertificate(earlyID);
  const reviewer = commentQueries.getReviewer(earlyID, "early_notification");
  const [showModal, setShowModal] = useState(false);
  const [actionStatus, setActionStatus] = useState<any>("");
  const user = authQueries.getUser(userId);
  const [authorizerForm, setAuthorizerForm] = useState(false);
  const [uploadForm, setUploadForm] = useState(false);
  // const comment = commentQueries.getComment("early_notifications", earlyID);
  const certifyData =
    response?.data?.data === undefined ? {} : response?.data?.data;

  // const commentData = comment?.data?.data?.comments[0];
  useEffect(() => {
    const getLesson = async () => {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/get_single_early_notification.php?notification_id=${earlyID}`
      );
      const response = data?.data;
      setEarlyData(response);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getLesson();
  }, []);

  const handleModal = (status: any) => {
    setActionStatus(status);
    setShowModal((prev) => !prev);
  };

  const handleAuthorizerForm = () => {
    setAuthorizerForm((prev) => !prev);
  };

  const handleUploadForm = () => {
    setUploadForm((prev) => !prev);
  };

  const componentRef = useRef(null);
  const certificateRef = useRef(null);
  const router = useRouter();

  const handleEditForm = () => {
    router.push({
      pathname: "/dashboard/legal-adviser/editEarlyNotification",
    });
  };

  return (
    <div className="mt-5 sm:mt-10">
      <div className="flex flex-col sm:flex-row justify-between gap-y-4">
        <div>
          <h3 className="text-lg sm:text-xl uppercase font-semibold mb-4 sm:mb-0">
            {earlyData?.title}
          </h3>

          <p>
            Status: &nbsp;
            <button
              className={`rounded-xl py-2 px-5 ${
                earlyData?.status === "Approved"
                  ? "bg-green/10 text-green "
                  : earlyData?.status === "Rejected"
                  ? "bg-[#F86652]/10 text-[#F86652]"
                  : earlyData?.status === "PENDING"
                  ? "bg-[#FFFED6] text-[#8D8A00]"
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
            </button>
          </p>
        </div>
        <div>
          <ReactToPrint
            trigger={() => (
              <div className="text-center">
                <Button className="bg-green text-white text-center">
                  Print PDF
                </Button>
              </div>
            )}
            content={() => componentRef.current}
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            documenTitle={`${earlyData?.title} Early Not.`}
          />
        </div>
      </div>
      <div>
        <EarlyNotificationUpload
          id={earlyData?.id}
          status={actionStatus}
          stage={"early_notifications"}
          showModal={showModal}
        />
      </div>

      <div className="border flex flex-col w-full lg:w-1/2 gap-8 border-gray-400 rounded-3xl py-10 px-4 sm:px-12 mt-12">
        {/* {earlyNotifyData.map((data) => ( */}
        <div className="flex flex-col gap-1">
          <h5 className="text-base font-semibold">Contract Title</h5>
          <p className="text-base font-normal text-tx-light-dark">
            {earlyData?.title}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="text-base font-semibold">Final Comment</h5>
          <p className="text-base font-normal text-tx-light-dark">
            {earlyData?.final_comment}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="text-base font-semibold">Addendum/Novation</h5>
          <p className="text-base font-normal text-tx-light-dark">
            {earlyData?.analog_contract}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="text-base font-semibold">Contract Details</h5>
          <p className="text-base font-normal text-tx-light-dark">
            {earlyData?.details ?? "No details"}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="text-base font-semibold">Date Created</h5>
          <p className="text-base font-normal text-tx-light-dark">
            {readableDate(earlyData?.date_created)}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="text-base font-semibold">Date of Approval</h5>
          <p className="text-base font-normal text-tx-light-dark">
            {readableDate(earlyData?.approved_at)}
          </p>
        </div>
        {/* <div className="flex flex-col gap-1">
          <h5 className="text-base font-semibold">Lesson Learnt</h5>
          <p className="text-base font-normal text-tx-light-dark">
            {earlyData?.lesson_learnt ?? "No lesson learnt"}
          </p>
        </div> */}
        <div className="flex flex-col gap-1">
          <h5 className="text-base font-semibold">Contract Value</h5>
          <p className="text-base font-normal text-tx-light-dark">
            {formatAmount(earlyData?.contract_value)}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="text-base font-semibold">Funding Source</h5>
          <p className="text-base font-normal text-tx-light-dark">
            {earlyData?.funding_source}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="text-base font-semibold">User Department</h5>
          <p className="text-base font-normal text-tx-light-dark">
            {earlyData?.user_department}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="text-base font-semibold">Appropriation Document</h5>
          {earlyData?.appropriation_document === "" ? (
            <p>No file uploaded</p>
          ) : (
            <p style={{ textDecoration: "underline", color: "blue" }}>
              <a
                target="_blank"
                rel="noreferrer noopener"
                className="text-base font-normal"
                href={earlyData?.appropriation_document}
              >
                Click to view & download
              </a>
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="text-base font-semibold">Need Assessment</h5>
          {earlyData?.need_assessment === "" ? (
            <p>No file uploaded</p>
          ) : (
            <p style={{ textDecoration: "underline", color: "blue" }}>
              <a
                target="_blank"
                rel="noreferrer noopener"
                className="text-base font-normal"
                href={earlyData?.need_assessment}
              >
                Click to view & download
              </a>
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="text-base font-semibold">Feasibility Study</h5>
          {earlyData?.feasibility_study === "" ? (
            <p>No file uploaded</p>
          ) : (
            <p style={{ textDecoration: "underline", color: "blue" }}>
              <a
                target="_blank"
                rel="noreferrer noopener"
                className="text-base font-normal"
                href={earlyData?.feasibility_study}
              >
                Click to view & download
              </a>
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="text-base font-semibold">Other Documents</h5>
          {earlyData?.feasibility_study === "" ? (
            <p>No file uploaded</p>
          ) : (
            <p style={{ textDecoration: "underline", color: "blue" }}>
              <a
                target="_blank"
                rel="noreferrer noopener"
                className="text-base font-normal"
                href={earlyData?.other_file_uploaded}
              >
                Click to view & download
              </a>
            </p>
          )}
        </div>
        {userType === "Legal Adviser" && earlyData?.signed_copy && (
          <div className="flex flex-col gap-1">
            <h5 className="text-base font-semibold">
              Signed Early Notification Copy
            </h5>
            {earlyData?.signed_copy === "" ? (
              <p>No file uploaded</p>
            ) : (
              <p style={{ textDecoration: "underline", color: "blue" }}>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-base font-normal"
                  href={earlyData?.signed_copy}
                >
                  Click to view & download
                </a>
              </p>
            )}
          </div>
        )}
        {/* ))} */}
        {/* <h5 className="text-base font-semibold">Comments</h5>
        <p className="text-base font-normal text-tx-light-dark">
          {commentData?.comment ??
            "No comments yet, until it is approved or rejected"}
        </p> */}
      </div>
      <div className="border flex flex-col w-full lg:w-1/2 gap-8 border-gray-400 rounded-3xl py-10 px-4 sm:px-12 my-12">
        <h4 className="text-lg font-semibold">Assigned Reviewers</h4>

        {reviewer?.data?.data?.reviewers &&
        reviewer.data.data.reviewers.length > 0 ? (
          <div className="space-y-4">
            {reviewer.data.data.reviewers.map(
              (reviewer: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green/20 flex items-center justify-center">
                    <span className="text-green font-semibold">
                      {reviewer.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-tx-dark">{reviewer.name}</p>
                    <p className="text-sm text-tx-light-dark">
                      {reviewer.title}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <p className="text-base font-normal text-tx-light-dark">
            No reviewers assigned yet
          </p>
        )}
      </div>
      <Box>
        <div className="flex justify-start items-center py-5 border-t gap-8">
          {userType === "FMOJ system authorizer" &&
          (earlyData?.status === "PENDING" ||
            earlyData?.status === "Rejected") ? (
            <SubmitButton
              type="button"
              className="bg-green text-white"
              onClick={() => {
                handleModal("Approved");
              }}
            >
              Accept Form
            </SubmitButton>
          ) : (
            <></>
          )}
          {userType === "FMOJ system authorizer" &&
          earlyData?.status === "PENDING" ? (
            <Button
              onClick={() => {
                handleModal("Rejected");
              }}
              className="bg-red text-white"
              // onClick={handleModal}
            >
              Return Form
            </Button>
          ) : (
            <></>
          )}
          {userType === "Legal Adviser" && earlyData?.status === "Rejected" ? (
            <SubmitButton
              type="button"
              className="bg-green text-white"
              onClick={() => {
                handleEditForm();
              }}
            >
              Edit Form
            </SubmitButton>
          ) : (
            <></>
          )}
          {userType === "FMOJ system authorizer" &&
          earlyData?.status === "Approved" &&
          !certifyData?.signature ? (
            <Button
              onClick={() => {
                handleAuthorizerForm();
              }}
              className="bg-green text-white"
              // onClick={handleModal}
            >
              Certificate Form
            </Button>
          ) : (
            <></>
          )}
          {userType === "FMOJ system authorizer" &&
          earlyData?.status === "Approved" &&
          certifyData?.signature &&
          !earlyData?.uploaded_copy ? (
            <Button
              onClick={() => {
                handleUploadForm();
              }}
              className="bg-green text-white"
              // onClick={handleModal}
            >
              Upload Certificate
            </Button>
          ) : (
            <></>
          )}
          {userType === "FMOJ system authorizer" &&
          certifyData?.signature &&
          !earlyData?.uploaded_copy ? (
            <ReactToPrint
              trigger={() => (
                <div className="text-center">
                  <Button className="bg-green text-white text-center">
                    Print Certificate
                  </Button>
                </div>
              )}
              content={() => certificateRef.current}
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              documenTitle={`eFCAS APPROVAL TO PROCEED TO FEC`}
            />
          ) : (
            <></>
          )}
          {(userType === "FMOJ system authorizer" ||
            userType === "Legal Adviser" ||
            userType === "Procurement") &&
          certifyData?.signature &&
          earlyData?.uploaded_copy ? (
            <div className="text-center">
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={earlyData?.uploaded_copy}
              >
                <Button className="bg-green text-white text-center">
                  Download Certificate
                </Button>
              </a>
            </div>
          ) : (
            <></>
          )}
        </div>
        <Accordion>
          <div className={`mx-10 mt-10 mb-10`} ref={componentRef}>
            <EarlyNotification earlyData={earlyData} />
          </div>
        </Accordion>
        {userType === "FMOJ system authorizer" ? (
          <EarlyNotiCertificateForm
            user={user}
            setShowModal={setAuthorizerForm}
            showModal={authorizerForm}
          />
        ) : (
          <></>
        )}
        {userType === "FMOJ system authorizer" ? (
          <SignedCertificateForm
            setShowModal={setUploadForm}
            showModal={uploadForm}
            ID={earlyID}
            stage="early_notifications"
          />
        ) : (
          <></>
        )}
        {earlyData?.status === "Approved" && (
          <Accordion>
            <div className="mx-5 mt-10 mb-10" ref={certificateRef}>
              <EarlyNotificationCertificate
                contract={earlyData}
                certify={certifyData}
              />
            </div>
          </Accordion>
        )}
        <div>
          {userType === "FMOJ Reviewer" ||
          userType === "FMOJ system authorizer" ||
          userType === "external reviewer" ||
          userType === "Procurement" ||
          userType === "Legal Adviser" ||
          userType === "Legal Director" ? (
            <Comment commentType="early_notifications" typeId={earlyID} />
          ) : (
            <></>
          )}
        </div>
      </Box>
    </div>
  );
};

export default EarlyNotificationDetails;
