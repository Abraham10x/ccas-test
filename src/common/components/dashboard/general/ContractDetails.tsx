import { FC, useRef, useState } from "react";
import { formatAmount, readableDate, retrieveToken } from "@lib/helper";
import contractRegQueries from "@lib/queries/contract-reg";
import {
  Box,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SubmitButton, Button } from "@components/application/base/Button";
import Comment from "../reviewers/Comment";
import Contract from "./print/Contract";
import ReactToPrint from "react-to-print";
import PrintAccordion from "@components/application/PrintAccordion";
import NotificationUpload from "@components/dashboard/system-authorizer/upload/UploadCopyModal";
import requestQueries from "@lib/queries/requests";
import commentQueries from "@lib/queries/comment";

const ContractDetails: FC = () => {
  const userId = retrieveToken("userId");
  const [showModal, setShowModal] = useState(false);
  const contractID = retrieveToken("contractID");
  const reviewer = commentQueries.getReviewer(contractID, "contract");
  const userType = retrieveToken("userType");
  const response = contractRegQueries.readSingle(contractID);
  const [actionStatus, setActionStatus] = useState<any>("");
  const { mutate } = requestQueries.handleContractRequest(actionStatus);
  const data =
    response?.data?.data?.contract_details === undefined
      ? {}
      : response?.data?.data?.contract_details;

  const handleModal = (status: any) => {
    setActionStatus(status);
    setShowModal((prev) => !prev);
    const values = {
      id: contractID,
      status,
      users_id: userId,
    };

    mutate(values);
  };

  const componentRef = useRef(null);

  return (
    <div className="">
      <Box>
        <div className="flex flex-col sm:flex-row gap-y-4 justify-between">
          <p>
            Status: &nbsp;
            <button
              className={`rounded-xl py-2 px-5 ${
                data.status === "Approved"
                  ? "bg-green/10 text-green "
                  : data.status === "Rejected"
                  ? "bg-[#F86652]/10 text-[#F86652]"
                  : data.status === "PENDING"
                  ? "bg-[#FFFED6] text-[#8D8A00]"
                  : ""
              }`}
            >
              {data.status === "Approved"
                ? "Approved Contract Document"
                : data.status === "Rejected"
                ? "Rejected Contract Document"
                : data.status === "PENDING"
                ? "Pending Contract Document"
                : ""}
            </button>
          </p>
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
            documenTitle={`${data?.title} Contract.`}
          />
        </div>
        <br />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h1 style={{ fontSize: "16px" }} className="font-extrabold">
              Contract
            </h1>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3} className="mt-5">
              <Grid item xs={12} sm={12} md={12}>
                <h3 className="font-bold">Contract Title</h3>
                <p>{data.title}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Typology 1</h3>
                <p>{data.bpp}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Typology 2</h3>
                <p>{data.typology}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Amount approved by MTB</h3>
                <p>{formatAmount(data.amount_mtb)}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">VAT</h3>
                <p>{data.vat}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Witholding Tax</h3>
                <p>{formatAmount(data.withholding_tax)}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Advance Payment</h3>
                <p>{data.advance_payment}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Headline Scope</h3>
                <p>{data.scope}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Contract Duration</h3>
                <p>{data.duration}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Contract Location</h3>
                <p>{data.location}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Date Created</h3>
                <p>{readableDate(data.created_at)}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Date of Approval</h3>
                <p>{readableDate(data.approved_at)}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">MDA</h3>
                <p>{data.mda}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Final Comment</h3>
                <p>{data.final_comment}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Signed Contract Copy</h3>
                {data.signed_copy === "" ? (
                  <p>No file uploaded</p>
                ) : (
                  <p style={{ textDecoration: "underline", color: "blue" }}>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={data.signed_copy}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <h1 style={{ fontSize: "16px" }} className="font-extrabold">
              Contract Sponsor/Administrator
            </h1>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3} className="mt-5">
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Accounting Officer Name (MDA)</h3>
                <p>{data.mdax1_name}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Accounting Officer Phone (MDA)</h3>
                <p>{data.mdax1_phone}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Accounting Officer Email (MDA)</h3>
                <p>{data.mdax1_email}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Accounting Officer Position (MDA)</h3>
                <p>{data.mdax1_position}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">
                  {" "}
                  Director User Department Name (MDA)
                </h3>
                <p>{data.mdax2_name}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">
                  {" "}
                  Director User Department Phone (MDA)
                </h3>
                <p>{data.mdax2_phone}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">
                  {" "}
                  Director User Department Email (MDA)
                </h3>
                <p>{data.mdax2_email}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">
                  {" "}
                  Director User Department Position (MDA)
                </h3>
                <p>{data.mdax2_position}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Legal Adviser Person Name</h3>
                <p>{data.mda_lfp_name}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Legal Adviser Person Phone</h3>
                <p>{data.mda_lfp_phone}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Legal Adviser Person Email</h3>
                <p>{data.mda_lfp_email}</p>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <h3 className="font-bold">Legal Adviser Person Position</h3>
                <p>{data.mda_lfp_position}</p>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <h1 style={{ fontSize: "16px" }} className="font-extrabold">
              Contractor Details
            </h1>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3} className="mt-5">
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Contractor Type</h3>
                <p>{data.ct_type}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Contractor Name</h3>
                <p>{data.ct_name}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">CAC Registration Number</h3>
                <p>{data.ct_cac_reg_number}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Website</h3>
                <p>{data.ct_web}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Office Address</h3>
                <p>{data.ct_office_address}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Phone Number</h3>
                <p>{data.ct_phone}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Email Address</h3>
                <p>{data.ct_email}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Tax Identification Number</h3>
                <p>{data.ct_taxid}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Project Office Details</h3>
                <p>{data.ct_project_office}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Name of MD/CEO</h3>
                <p>{data.ct_rep_name}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">CEO Address</h3>
                <p>{data.ct_rep_address}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">CEO Phone Number</h3>
                <p>{data.ct_rep_phone}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">CEO Email</h3>
                <p>{data.ct_rep_email}</p>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <h1 style={{ fontSize: "16px" }} className="font-extrabold">
              Contractor Team
            </h1>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3} className="mt-5">
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Contractor Team Rep 1 Name</h3>
                <p>{data.ct_rep1_name}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Contractor Team Rep 1 Address</h3>
                <p>{data.ct_rep1_address}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Contractor Team Rep 1 Phone</h3>
                <p>{data.ct_rep1_phone}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Contractor Team Rep 1 Email</h3>
                <p>{data.ct_rep1_email}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Contractor Team Rep 1 Position</h3>
                <p>{data.ct_rep1_position}</p>
              </Grid>

              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Contractor Team Rep 2 Name</h3>
                <p>{data.ct_rep2_name}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Contractor Team Rep 2 Address</h3>
                <p>{data.ct_rep2_address}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Contractor Team Rep 2 Phone</h3>
                <p>{data.ct_rep2_phone}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Contractor Team Rep 2 Email</h3>
                <p>{data.ct_rep2_email}</p>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Contractor Team Rep 2 Position</h3>
                <p>{data.ct_rep2_position}</p>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <h1 style={{ fontSize: "16px" }} className="font-extrabold">
              Uploads
            </h1>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3} className="mt-5">
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Draft contract</h3>
                {data.draft_contract_upload === "" ? (
                  <p>No file uploaded</p>
                ) : (
                  <p style={{ textDecoration: "underline", color: "blue" }}>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={data.draft_contract_upload}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">BPP NO Objection</h3>
                {data.bpp_no_objection === "" ? (
                  <p>No file uploaded</p>
                ) : (
                  <p style={{ textDecoration: "underline", color: "blue" }}>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={data.bpp_no_objection}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Letter of Award</h3>
                {data.letter_of_award === "" ? (
                  <p>No file uploaded</p>
                ) : (
                  <p style={{ textDecoration: "underline", color: "blue" }}>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={data.letter_of_award}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">
                  Draft Post-Award Contract Administration Plan
                </h3>
                {data.draft_pacap_upload === "" ? (
                  <p>No file uploaded</p>
                ) : (
                  <p style={{ textDecoration: "underline", color: "blue" }}>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={data.draft_pacap_upload}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Draft Risk Management Plan</h3>
                {data.draft_rmp_upload === "" ? (
                  <p>No file uploaded</p>
                ) : (
                  <p style={{ textDecoration: "underline", color: "blue" }}>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={data.draft_rmp_upload}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Due Diligence Report</h3>
                {data.cac_reg_upload === "" ? (
                  <p>No file uploaded</p>
                ) : (
                  <p style={{ textDecoration: "underline", color: "blue" }}>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={data.cac_reg_upload}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Letter of Acceptance</h3>
                {data.letter_of_acceptance === "" ? (
                  <p>No file uploaded</p>
                ) : (
                  <p style={{ textDecoration: "underline", color: "blue" }}>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={data.letter_of_acceptance}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">ICRC Compliance</h3>
                {data.icrc === "" ? (
                  <p>No file uploaded</p>
                ) : (
                  <p style={{ textDecoration: "underline", color: "blue" }}>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={data.icrc}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">
                  Means of National Identification of MD/CEO
                </h3>
                {data.ni_rep_upload === "" ? (
                  <p>No file uploaded</p>
                ) : (
                  <p style={{ textDecoration: "underline", color: "blue" }}>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={data.ni_rep_upload}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">
                  Means of National Identification of Contractor Team
                </h3>
                {data.ni_rep1_upload === "" ? (
                  <p>No file uploaded</p>
                ) : (
                  <p style={{ textDecoration: "underline", color: "blue" }}>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={data.ni_rep1_upload}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">FEC Extract</h3>
                {data.fec_extract === "" ? (
                  <p>No file uploaded</p>
                ) : (
                  <p style={{ textDecoration: "underline", color: "blue" }}>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={data.fec_extract}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">NITDA Certificate</h3>
                {data.nitda === "" ? (
                  <p>No file uploaded</p>
                ) : (
                  <p style={{ textDecoration: "underline", color: "blue" }}>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={data.nitda}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <h3 className="font-bold">Other upload</h3>
                {data.other_uploads === "" ? (
                  <p>No file uploaded</p>
                ) : (
                  <p style={{ textDecoration: "underline", color: "blue" }}>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={data.other_uploads}
                    >
                      Click to view
                    </a>
                  </p>
                )}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
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
                      <p className="font-medium text-tx-dark">
                        {reviewer.name}
                      </p>
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
        {userType === "FMOJ system authorizer" ? (
          <div>
            <NotificationUpload
              id={data.id}
              status={actionStatus}
              stage={"contracts"}
              showModal={showModal}
            />
          </div>
        ) : (
          <></>
        )}
      </Box>
      <Box>
        <div className="flex justify-start items-center gap-x-5 py-5 border-t">
          {userType === "FMOJ system authorizer" &&
          (data.status === "PENDING" || data.status === "Rejected") ? (
            <SubmitButton
              type="button"
              className="bg-green text-white"
              onClick={() => {
                handleModal("Approved");
              }}
            >
              Approve Contract
            </SubmitButton>
          ) : (
            <></>
          )}
          {userType === "FMOJ system authorizer" &&
          data.status === "PENDING" ? (
            <Button
              onClick={() => {
                handleModal("Rejected");
              }}
              className="bg-red text-white"
              // onClick={handleModal}
            >
              Reject Contract
            </Button>
          ) : (
            <></>
          )}
        </div>
      </Box>
      <PrintAccordion>
        <div className="mx-10 mt-10 mb-10" ref={componentRef}>
          <Contract data={data} />
        </div>
      </PrintAccordion>
      {userType === "FMOJ system authorizer" ||
      userType === "FMOJ Reviewer" ||
      userType === "Procurement" ||
      userType === "external reviewer" ||
      userType === "Legal Adviser" ||
      userType === "Legal Director" ? (
        <Comment commentType="contract" typeId={contractID} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ContractDetails;
