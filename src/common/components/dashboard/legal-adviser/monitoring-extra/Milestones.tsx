/* eslint-disable react/jsx-key */
import { CalendarMonth, Edit, Visibility } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem, GridRowParams } from "@mui/x-data-grid";
import React, { FC, useEffect, useRef, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import AddMilestone from "./AddMilestone";
// import { useRouter } from "next/router";
import { readableDate, retrieveToken } from "@lib/helper";
import monitorQueries from "@lib/queries/monitoring";
import CompleteMilestone from "./CompleteMilestone";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import EditMilestone from "./EditMilestone";
import { toast, Toaster } from "react-hot-toast";
import MonitoringStage from "@components/dashboard/general/print/MonitoringStage";
import ReactToPrint from "react-to-print";
import { Button } from "@components/application/base/Button";
import Accordion from "@components/application/PrintAccordion";
// import EditMilestone from "./EditMilestone";

const Milestones: FC = () => {
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [myMilestones, setMyMilestones] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [kpiData, setKpiData] = useState<any>();
  const [kpiId, setKpiId] = useState<any>();

  const contractId = retrieveToken("contractId");
  const userType = retrieveToken("userType");
  const apiResponse = monitorQueries.readByContractId(contractId);
  const componentRef = useRef(null);

  const milestones =
    apiResponse?.data?.data?.contractStatus === undefined
      ? []
      : apiResponse?.data?.data?.contractStatus;

  const title = retrieveToken("title");

  useEffect(() => {
    const getMilestones = async () => {
      setMyMilestones(milestones);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getMilestones();
  }, [milestones]);

  const getKPIDetails = async (id: any) => {
    setShowDetails(true);
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/get_single_contract_status.php?status_id=${id}`;
    const response = await axios.get(url);
    setKpiData(response?.data);
    return response;
  };

  const handleCompleteStatus = (id: any) => {
    setShowModal((prev) => !prev);
    setKpiId(id);
  };

  // const handleEditMilestone = (id: any) => {
  //   setShowModal((prev) => !prev);
  //   setKpiId(id);
  // }

  const handleExtendDate = async (id: any) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/extend_time.php?id=${id}`;
      const res = await axios.get(url);
      if (res.status === 200) toast.success("Date extended successfully!!! 🎉");
    } catch (err: any) {
      toast.error("Error! Could not extend date.");
    }
  };

  const columns = [
    {
      field: "",
      type: "actions",
      headerName: "Action",
      width: 100,
      getActions: (params: any) => [
        <GridActionsCellItem
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/promise-function-async, @typescript-eslint/no-floating-promises
            getKPIDetails(params.id);
          }}
          icon={<Visibility />}
          label="View KPI Details"
          showInMenu
        />,
        userType === "FMOJ system authorizer" ? (
          <GridActionsCellItem
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => await handleExtendDate(params.row.id)}
            icon={<CalendarMonth />}
            label="Extend Due date"
            showInMenu
          />
        ) : (
          <></>
        ),
        userType === "Legal Adviser" &&
        (params.row.performance_comment === "" ||
          params.row.performance_comment === null) ? (
          <GridActionsCellItem
            onClick={() => handleCompleteStatus(params.row.id)}
            icon={<Edit />}
            label="Complete Status"
            showInMenu
          />
        ) : (
          <></>
        ),
        // <GridActionsCellItem icon={<Edit />} label="Edit Item" showInMenu />,
      ],
    },
    {
      field: "milestone",
      headerName: "KPI",
      sortable: true,
      renderCell: ({ row }: Partial<GridRowParams>) => (
        <div className="flex flex-row justify-start gap-3">
          <div
            className={`rounded-full my-auto w-4 h-4 ${
              row.status_color === "green"
                ? "bg-[#00674C]"
                : row.status_color === "yellow"
                ? "bg-[#FFCC29]"
                : row.status_color === "red"
                ? "bg-[#C71700]"
                : ""
            }`}
          ></div>
          <p className="text-black text-sm">{row.milestone}</p>
        </div>
      ),
      width: 300,
    },
    {
      field: "due_date",
      headerName: "Due date",
      sortable: true,
      renderCell: ({ row }: Partial<GridRowParams>) => (
        <div className="flex flex-row justify-start gap-2">
          <BiCalendar className="text-green text-lg" />
          <p className=" text-gray-600 text-sm">{readableDate(row.due_date)}</p>
        </div>
      ),
      width: 150,
    },
  ];

  return (
    <div className="mt-5">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col sm:flex-row justify-between gap-y-4">
        <div>
          <h3 className="text-lg sm:text-xl uppercase font-semibold">
            {title}
          </h3>
          <div className="flex flex-row align-middle my-3">
            <div
              className={`rounded-full mr-3 my-auto w-4 h-4 ${
                kpiData?.status_color === "green"
                  ? "bg-[#00674C]"
                  : kpiData?.status_color === "yellow"
                  ? "bg-[#FFCC29]"
                  : kpiData?.status_color === "red"
                  ? "bg-[#C71700]"
                  : ""
              }`}
            ></div>
            <p className="text-base text-gray-500">
              {kpiData?.status_color === "green"
                ? "On Track"
                : kpiData?.status_color === "yellow"
                ? "Delayed"
                : kpiData?.status_color === "red"
                ? "Critical"
                : ""}
            </p>
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
            documenTitle={`${title} Monitoring.`}
          />
        </div>
      </div>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sm={6}>
            <div className="border border-gray-400 rounded-3xl sm:my-12">
              <div className="border-b border-gray-400 px-6 flex flex-col sm:flex-row gap-3 justify-between align-middle py-8">
                <div className="flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold">
                    Key Performance Indicators
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500">
                    Fill in the Key Performance Indicators and their due dates
                  </p>
                </div>

                {/* <EditMilestone
                  show={showModal}
                  milestone={kpiData?.milestone}
                  dueDate={kpiData?.due_date}
                /> */}
                {userType === "Legal Adviser" ? (
                  <div>
                    <AddMilestone id={"hs-add-milestone"} />
                    <CompleteMilestone
                      id={kpiId}
                      show={showModal}
                      setShow={setShowModal}
                    />
                    <EditMilestone />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="pt-3 pb-10 px-8">
                <DataGrid
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[5, 10, 20, 50, 100]}
                  autoHeight
                  rows={myMilestones}
                  columns={columns}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6} sm={6}>
            {showDetails ? (
              <div className="border border-gray-400 rounded-3xl my-12">
                <div className="border-b border-gray-400 px-6 justify-between align-middle py-8">
                  {/* {kpiDetails.map((details) => ( */}
                  <div className="flex flex-col mb-6">
                    <h3 className="text-base sm:text-xl font-bold">KPI</h3>
                    <p className="text-sm sm:text-base text-gray-500">
                      {kpiData?.milestone}
                    </p>
                  </div>
                  <div className="flex flex-col mb-6">
                    <h3 className="text-base sm:text-xl font-bold">Due Date</h3>
                    <p className="text-sm sm:text-base text-gray-500">
                      {readableDate(kpiData?.due_date)}
                    </p>
                  </div>
                  <div className="flex flex-col mb-6">
                    <h3 className="text-sm sm:text-xl font-bold">KPI Status</h3>
                    <div className="flex flex-row align-middle my-1">
                      <div
                        className={`rounded-full mr-3 my-auto w-4 h-4 ${
                          kpiData?.status_color === "green"
                            ? "bg-[#00674C]"
                            : kpiData?.status_color === "yellow"
                            ? "bg-[#FFCC29]"
                            : kpiData?.status_color === "red"
                            ? "bg-[#C71700]"
                            : ""
                        }`}
                      ></div>
                      <p className="text-sm sm:text-base text-gray-500">
                        {kpiData?.status_color === "green"
                          ? "On Track"
                          : kpiData?.status_color === "yellow"
                          ? "Delayed"
                          : kpiData?.status_color === "red"
                          ? "Critical"
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col mb-6">
                    <h3 className="text-base sm:text-xl font-bold">
                      Performance Comment
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500">
                      {kpiData?.performance_comment ??
                        "Status not completed yet"}
                    </p>
                  </div>
                  <div className="flex flex-col mb-6">
                    <h3 className="text-base sm:text-xl font-bold">Evidence</h3>
                    {kpiData?.evidence === null ? (
                      "Status not completed yet"
                    ) : (
                      <a
                        href={kpiData?.evidence}
                        rel="noreferrer noopener"
                        target="_blank"
                        download
                      >
                        <p
                          style={{ color: "blue", textDecoration: "underline" }}
                          className="text-sm sm:text-base font-normal text-tx-light-dark"
                        >
                          Click to view & download
                        </p>
                      </a>
                    )}
                  </div>
                  {/* ))} */}
                </div>
              </div>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
        <Accordion>
          <div className="mx-10 mt-10 mb-10" ref={componentRef}>
            <MonitoringStage milestone={myMilestones} />
          </div>
        </Accordion>
      </Box>
    </div>
  );
};

export default Milestones;
