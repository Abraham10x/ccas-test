/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
// import reportQueries from "@lib/queries/report";
import BaseFormInput from "../../application/base/form/BaseFormInput";
import { Button, SubmitButton } from "../../application/base/Button";
import { errorParser, readableDate } from "@lib/helper";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import ReactToPrint from "react-to-print";

const ReportForm = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [type, setType] = useState("");
  const [reportResult, setReportResult] = useState<any>([]);

  const componentRef = useRef(null);

  const reportRequest = async (values: any) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/reports/get_reports.php`;
    const res = await axios.post(url, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setReportResult(res.data.report);
    return res;
  };

  // const firstObject = reportResult[0];

  // const { mutate, data } = reportQueries.create();
  const defaultPayload = {
    form_type: "",
    from_date: "",
    to_date: "",
  };

  const schema = Yup.object({
    form_type: Yup.string(),
    from_date: Yup.string(),
    to_date: Yup.string(),
  });

  const onSubmit = async (values: {
    form_type: string;
    from_date: any;
    to_date: any;
  }) => {
    // handle form submission here
    await reportRequest(values);
    // mutate(values);
  };

  const firstObject: Object = reportResult[0];

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="">
        <Formik
          initialValues={defaultPayload}
          validationSchema={schema}
          onSubmit={async (values) => {
            await onSubmit(values);
            // resetForm();
          }}
        >
          {(formik) => {
            const { handleSubmit, values, errors, touched, handleChange } =
              formik;
            return (
              <div className="px-6 py-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-x-6 mt-6">
                    <div className="mt-5">
                      <label className="text-sm block font-bold text-gray-700">
                        Select a feature
                      </label>
                      <select
                        name="form_type"
                        className="block w-full rounded-md border-[1px] py-3 px-4 text-sm text-gray-600 bg-gray-100"
                        onChange={(e: any) => {
                          handleChange(e);
                          setType(e.target.value);
                        }}
                        value={values.form_type}
                      >
                        <option>Please select</option>
                        <option value="early_notifications">
                          Early Notifications
                        </option>
                        <option value="notification">Notification</option>
                        <option value="legal_adviser">Legal Adviser</option>
                        <option value="monitoring_stage">
                          Monitoring Stage
                        </option>
                        <option value="lessons_learnt">Lessons Learnt</option>
                      </select>
                    </div>
                    <BaseFormInput
                      type="date"
                      label="Start Date"
                      name="from_date"
                      value={values.from_date}
                      onChange={(e: any) => {
                        handleChange(e);
                        setFrom(e.target.value);
                      }}
                      error={errorParser(errors, touched, "from_date")}
                    />
                    <BaseFormInput
                      type="date"
                      label="End Date"
                      name="to_date"
                      value={values.to_date}
                      onChange={(e: any) => {
                        handleChange(e);
                        setTo(e.target.value);
                      }}
                      error={errorParser(errors, touched, "to_date")}
                    />
                  </div>
                  <div className="flex justify-start items-center gap-x-5 py-5 border-t">
                    <SubmitButton
                      type="submit"
                      className="bg-green text-white "
                    >
                      Generate Report
                    </SubmitButton>
                  </div>
                </form>
              </div>
            );
          }}
        </Formik>
      </div>
      {reportResult.length > 0 ? (
        <div
          className="h-auto"
          style={{
            width: "100%",
          }}
        >
          {" "}
          <ReactToPrint
            trigger={() => (
              <div className="text-center">
                <Button className="bg-green text-white">Download PDF</Button>
              </div>
            )}
            content={() => componentRef.current}
          />
          <div>
            {/* <Print
              from={from}
              to={to}
              reportResult={reportResult}
              type={type}
              ref={componentRef}
            /> */}
            <div ref={componentRef}>
              <div className="mx-8 mt-10 mb-10">
                <div className="flex justify-between items-center">
                  <div className="">
                    <img src="/img/brand-Identity.png" alt="Logo" />
                  </div>
                  <div className="lg:flex space-x-3 items-center">
                    <h1
                      style={{ fontSize: "20px", textAlign: "right" }}
                      className="font-bold"
                    >
                      {type === "early_notifications"
                        ? "Early Notifications"
                        : type === "notification"
                        ? "Notification"
                        : type === "monitoring_stage"
                        ? "Monitoring Stage"
                        : type === "lessons_learnt"
                        ? "Lessons Learnt"
                        : type === "legal_adviser"
                        ? "Legal Adviser"
                        : ""}{" "}
                      <br />{" "}
                      {to !== "" ? (
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "normal",
                            textAlign: "center",
                          }}
                        >
                          Report from{" "}
                          <i style={{ color: "green" }}>{readableDate(from)}</i>{" "}
                          to{" "}
                          <i style={{ color: "green" }}>{readableDate(to)}</i>
                        </span>
                      ) : (
                        <></>
                      )}
                    </h1>
                  </div>
                  {/* <div className="flex flex-row-reverse sm:flex-row sm:gap-6">
              <Button className="bg-green text-white">Download PDF</Button>
            </div> */}
                </div>
                <br />
                <br />
                <br />
                <div className="">
                  <table id="customers">
                    <thead>
                      <th>S/N</th>

                      {Object.keys(firstObject).map((key, index) => (
                        <th key={index}>{key}</th>
                      ))}
                    </thead>
                    <tbody>
                      {reportResult.length > 0 ? (
                        reportResult.map((result: any, index: any) => (
                          <tr key={index}>
                            <td>{Number(index) + 1}</td>
                            {Object.values(result).map((cell: any) => (
                              <td key={index}>{cell}</td>
                            ))}
                          </tr>
                        ))
                      ) : (
                        <p className="text-center font-bold">No Report Yet</p>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-10">
          <p className="text-center font-bold text-gray-500 text-base sm:text-xl lg:text-2xl">
            No Report Found
          </p>
        </div>
      )}
    </>
  );
};

// eslint-disable-next-line react/display-name
// const Print =  React.forwardRef((props, ref) => {

//   const firstObject: Object = props.reportResult[0]
//   return (
//     <div ref={ref}>
//       <div className="mx-8 mt-10">
//         <div className="flex justify-between items-center">
//           <div className="">
//             <img src="/img/brand-Identity.png" alt="Logo" />
//           </div>
//           <div className="lg:flex space-x-3 items-center">
//             <h1
//               style={{ fontSize: "20px", textAlign: "right" }}
//               className="font-bold"
//             >
//               {props.type === "early_notifications"
//                 ? "Early Notifications"
//                 : props.type === "notification"
//                 ? "Notification"
//                 : props.type === "monitoring_stage"
//                 ? "Monitoring Stage"
//                 : props.type === "lessons_learnt"
//                 ? "Lessons Learnt"
//                 : props.type === "legal_adviser"
//                 ? "Legal Adviser"
//                 : ""}{" "}
//               <br />{" "}
//               {props.to !== "" ? (
//                 <span
//                   style={{
//                     fontSize: "12px",
//                     fontWeight: "normal",
//                     textAlign: "center",
//                   }}
//                 >
//                   Report from{" "}
//                   <i style={{ color: "green" }}>{readableDate(props.from)}</i>{" "}
//                   to{" "}
//                   <i style={{ color: "green" }}>{readableDate(props.to)}</i>
//                 </span>
//               ) : (
//                 <></>
//               )}
//             </h1>
//           </div>
//           {/* <div className="flex flex-row-reverse sm:flex-row sm:gap-6">
//             <Button className="bg-green text-white">Download PDF</Button>
//           </div> */}
//         </div>
//         <br />
//         <br />
//         <br />
//         <div className="">
//           <table id="customers">
//             <thead>
//               <th>S/N</th>

//                   {Object.keys(firstObject).map((key, index) => (
//                     <th key={index}>{key}</th>
//                   ))}

//             </thead>
//             <tbody>
//               {

//                 props.reportResult.map((result: any, index: any) => (
//                   <tr key={index}>
//                     <td>{Number(index) + 1}</td>
//                     {Object.values(result).map((cell) => (

//                         <td key={index}>{cell}</td>
//                     ))}
//                   </tr>
//                 ))
//               }
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// })

export default ReportForm;
