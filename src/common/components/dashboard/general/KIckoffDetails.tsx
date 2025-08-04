import { FC, useRef, useState } from "react";
import Comment from "@components/dashboard/reviewers/Comment";
import EditKickoff from "@components/dashboard/legal-adviser/kickoff/EditKickoff";
import kickoffQueries from "@lib/queries/kickoff";
import { retrieveToken } from "@lib/helper";
import { Button, SubmitButton } from "@components/application/base/Button";
import requestQueries from "@lib/queries/requests";
import ReactToPrint from "react-to-print";
import Kickoff from "./print/Kickoff";
import Accordion from "@components/application/PrintAccordion";
import KickoffUpload from "@components/dashboard/system-authorizer/upload/UploadCopyModal";
import KickoffCertificate from "./KickoffCertificate";
import authQueries from "@lib/queries/auth";
import KickoffCertificateForm from "../system-authorizer/certitificate/KickoffCertificateForm";
import certificateQueries from "@lib/queries/certificate-print";
import SignedCertificateForm from "../system-authorizer/certitificate/SignedCertificateForm";
import { useRouter } from "next/router";

const KickoffDetails: FC = () => {
  const router = useRouter();
  const kickoffId = retrieveToken("kickoffId");
  const kickoffTitle = retrieveToken("kickoffTitle");
  const userType = retrieveToken("userType");
  const userId = retrieveToken("userId");
  const kickoff = kickoffQueries.readSingle(kickoffId);
  const response = certificateQueries.getKickoffCertificate(kickoffId);
  const data = kickoff?.data?.data;
  const componentRef = useRef(null);
  const certificateRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [actionStatus, setActionStatus] = useState<any>("");
  const { mutate } = requestQueries.handleKickoffRequest(actionStatus);
  const user = authQueries.getUser(userId);
  const [authorizerForm, setAuthorizerForm] = useState(false);
  const [uploadForm, setUploadForm] = useState(false);
  const certifyData =
    response?.data?.data === undefined ? {} : response?.data?.data;

  const handleAction = (action: string) => {
    setActionStatus(action);
    setShowModal((prev) => !prev);
    const values = {
      id: kickoffId,
      users_id: userId,
      status: action,
    };
    mutate(values);
  };

  const handleAuthorizerForm = () => {
    setAuthorizerForm((prev) => !prev);
  };

  const handleUploadForm = () => {
    setUploadForm((prev) => !prev);
  };

  const kickOffData = [
    {
      id: 1,
      type: "text",
      title: "MDA",
      body: data?.mda,
    },
    {
      id: 2,
      type: "file",
      title: "Final Risk Management Plan",
      body: data?.final_risk_management_plan,
    },
    {
      id: 3,
      type: "file",
      title: "Final Post Award Plan",
      body: data?.final_post_award_plan,
    },
    {
      id: 6,
      type: "file",
      title: "Signed Contract Document",
      body: data?.signed_contract_document,
    },
    {
      id: 7,
      type: "file",
      title: "Other Document",
      body: data?.other_documents,
    },
  ];
  return (
    <div className="px-5 sm:px-10 mt-5 sm:mt-10">
      <div className="flex flex-col sm:flex-row gap-5 justify-between my-5 py-5">
        <div>
          <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
            Kickoff
          </h1>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            View and add Kickoff Document
          </p>
        </div>
        <div>
          <Button
            className="bg-green text-white"
            onClick={() => {
              router.back();
            }}
          >
            Go back
          </Button>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-8">
        <div className="flex flex-col sm:flex-row gap-y-3 justify-between">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-col gap-y-1">
              <h2 className="font-bold text-lg sm:text-xl text-tx-dark">
                {kickoffTitle}
              </h2>
              <p>
                status: &nbsp;
                <button
                  className={`rounded-xl py-2 px-5 ${
                    data?.status === "Approve"
                      ? "bg-green/10 text-green "
                      : data?.status === "Reject"
                      ? "bg-[#F86652]/10 text-[#F86652]"
                      : data?.status === "PENDING"
                      ? "bg-[#FFFED6] text-[#8D8A00]"
                      : ""
                  }`}
                >
                  {data?.status === "Approve"
                    ? "Approved Kickoff Document"
                    : data?.status === "Reject"
                    ? "Rejected Kickoff Document"
                    : data?.status === "PENDING"
                    ? "Pending Kickoff Document"
                    : ""}
                </button>
              </p>
            </div>
          </div>
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
            documenTitle={`${data?.title} Early Not.`}
          />
        </div>
      </div>
      {/* <div className="my-6 flex flex-row justify-start align-middle gap-4"> */}
      <div className="border flex flex-col w-full lg:w-1/2 gap-8 border-gray-400 rounded-3xl py-10 px-4 sm:px-12 mt-12">
        {/* {earlyNotifyData.map((data) => ( */}
        {kickOffData.map((data) => (
          <div key={data.id}>
            {data.type === "text" ? (
              <div className="flex flex-col gap-1">
                <h5 className="text-base font-semibold">{data?.title}</h5>
                <p className="text-base font-normal text-tx-light-dark">
                  {data?.body}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <h5 className="text-base font-semibold">{data?.title}</h5>
                {data?.body === "" ? (
                  <p>No file uploaded</p>
                ) : (
                  <p style={{ textDecoration: "underline", color: "blue" }}>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-base font-normal"
                      href={data?.body}
                    >
                      Click to view & download
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-start py-5 border-t">
        <EditKickoff />
        {userType === "FMOJ system authorizer" &&
        (data?.status === "PENDING" || data?.status === "Reject") ? (
          <SubmitButton
            type="button"
            className="bg-green text-white"
            onClick={() => {
              handleAction("Approve");
            }}
          >
            Accept Form
          </SubmitButton>
        ) : (
          <></>
        )}
        {userType === "FMOJ system authorizer" && data?.status === "PENDING" ? (
          <Button
            onClick={() => {
              handleAction("Reject");
            }}
            className="bg-red text-white"
            // onClick={handleModal}
          >
            Return Form
          </Button>
        ) : (
          <></>
        )}
        {userType === "FMOJ system authorizer" &&
        data?.status === "Approve" &&
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
        data?.status === "Approve" &&
        certifyData?.signature &&
        !data?.uploaded_copy ? (
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
        data?.status === "Approve" &&
        certifyData?.signature &&
        !data?.uploaded_copy ? (
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
            documenTitle={`eFCAS CLEARANCE CERTIFICATE`}
          />
        ) : (
          <></>
        )}
        {(userType === "FMOJ system authorizer" ||
          userType === "Legal Adviser" ||
          userType === "Procurement") &&
        certifyData?.signature &&
        data?.uploaded_copy ? (
          <div className="text-center">
            <a
              target="_blank"
              rel="noreferrer noopener"
              href={data?.uploaded_copy}
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
          <Kickoff kickoff={data} />
        </div>
      </Accordion>
      {userType === "FMOJ system authorizer" ? (
        <KickoffCertificateForm
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
          ID={data?.id}
          stage="kick_off"
        />
      ) : (
        <></>
      )}
      {userType === "FMOJ system authorizer" ? (
        <div>
          <KickoffUpload
            id={data?.id}
            status={actionStatus}
            stage={"kick_off"}
            showModal={showModal}
          />
        </div>
      ) : (
        <></>
      )}
      {data?.status === "Approve" && (
        <Accordion>
          <div className="mx-5 mt-10 mb-10" ref={certificateRef}>
            <KickoffCertificate
              contract={data}
              title={kickoffTitle}
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
          <Comment commentType="kickoff" typeId={kickoffId} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default KickoffDetails;
