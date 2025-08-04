/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { retrieveToken } from "@lib/helper";
import axios from "axios";
import { FC, useEffect, useRef, useState } from "react";
import { Button } from "@components/application/base/Button";
import { useRouter } from "next/router";
import CloseOut from "../general/print/CloseOut";
import Comment from "@components/dashboard/reviewers/Comment";
import ReactToPrint from "react-to-print";
import Accordion from "@components/application/PrintAccordion";

const CloseOutDetails: FC = () => {
  const closeId = retrieveToken("closeId");
  const userType = retrieveToken("userType");
  const [close, setClose] = useState<any>();
  const [reviewer, setReviewer] = useState<any>();

  console.log(reviewer);

  const router = useRouter();
  useEffect(() => {
    const getCloseOut = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/get_close_out_single.php?close_out_id=${closeId}`
      );
      const closeout = response?.data;
      const reviewers = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/get_reviewers.php?id=${closeout?.contracts_id}&form_type=close_out`
      );
      setReviewer(reviewers?.data);
      setClose(closeout);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getCloseOut();
  }, []);

  const componentRef = useRef(null);

  const lessonData = [
    {
      id: 2,
      title: "Contract Scope",
      body: close?.contract_scope,
    },
    {
      id: 3,
      title: "Start Date",
      body: close?.start_date,
    },
    {
      id: 4,
      title: "End Date",
      body: close?.end_date,
    },
    {
      id: 5,
      title: "Contractor Name",
      body: close?.contractors_name,
    },
    {
      id: 6,
      title: "Contractor Company Address",
      body: close?.contractor_company_address,
    },
    {
      id: 7,
      title: "Contractor Phone",
      body: close?.contractor_phone,
    },
    {
      id: 8,
      title: "Contractor Email",
      body: close?.contractor_email,
    },
    {
      id: 9,
      title: "Contractor Representative",
      body: close?.contractor_representatives,
    },
    {
      id: 10,
      title: "Initial Duration",
      body: close?.initial_period,
    },
    {
      id: 11,
      title: "Actual Duration",
      body: close?.actual_period,
    },
  ];
  return (
    <div className="px-5 sm:px-10 mt-5 sm:mt-10">
      <div className="my-5 py-5 flex flex-col sm:flex-row justify-between">
        <div>
          <h1 className="font-extrabold text-sm sm:text-2xl text-tx-dark">
            Close Out Forms
          </h1>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            Fill in the close out form details
          </p>
        </div>
        <div>
          <Button onClick={() => router.back()} className="bg-green text-white">
            Go back
          </Button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-5 justify-between mt-5">
        <h3 className="text-xl uppercase font-semibold">
          {close?.contract_title}
          <div className="flex flex-row align-middle my-3">
            <input
              type="radio"
              name="hs-default-radio"
              className="shrink-0 mt-1 border-green rounded-full text-green pointer-events-none focus:ring-green text-2xl"
              id="hs-checked-radio"
              checked
            />
            <label
              htmlFor="hs-checked-radio"
              className="text-base text-side-light ml-2 my-auto font-semibold"
            >
              On Track
            </label>
          </div>
        </h3>
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
          documenTitle={`${close?.contract_title} CloseOut.`}
        />
      </div>

      <div className="border flex flex-col gap-8 border-gray-400 rounded-3xl py-8 sm:py-10 px-5 sm:px-12 my-12">
        {lessonData.map((data) => (
          <div key={data.id} className="flex flex-col gap-1">
            <h5 className="text-sm sm:text-base font-semibold">{data.title}</h5>
            <p className="text-sm sm:text-base font-normal text-tx-light-dark">
              {data.body}
            </p>
          </div>
        ))}
      </div>

      <div className="border flex flex-col w-full lg:w-1/2 gap-8 border-gray-400 rounded-3xl py-10 px-4 sm:px-12 my-12">
        <h4 className="text-lg font-semibold">Assigned Reviewers</h4>

        {reviewer?.reviewers && reviewer.reviewers.length > 0 ? (
          <div className="space-y-4">
            {reviewer.reviewers.map((reviewer: any, index: number) => (
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
                  <p className="text-sm text-tx-light-dark">{reviewer.title}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-base font-normal text-tx-light-dark">
            No reviewers assigned yet
          </p>
        )}
      </div>
      <Accordion>
        <div className="mx-10 mt-10 mb-10" ref={componentRef}>
          <CloseOut close={close} />
        </div>
      </Accordion>
      <div>
        {userType === "FMOJ Reviewer" ||
        userType === "FMOJ system authorizer" ||
        userType === "external reviewer" ||
        userType === "Procurement" ||
        userType === "Legal Adviser" ||
        userType === "Legal Director" ? (
          <Comment commentType="close_out" typeId={closeId} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CloseOutDetails;
