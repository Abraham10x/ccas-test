import { FC } from "react";
import { readableDate, retrieveToken } from "@lib/helper";
import contractorEvalQueries from "@lib/queries/contractor-evaluation";
import {
  Box,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const EvaluationDetails: FC = () => {
  const contractID = retrieveToken("contractID");
  //   const userType = retrieveToken("userType");
  const response = contractorEvalQueries.read(contractID);
  // const router = useRouter();
  const data =
    response?.data?.data?.Evaluation === undefined
      ? {}
      : response?.data?.data?.Evaluation;

  const contractorEvaluator = [
    {
      title: "Contract Title",
      details: data?.contract_title,
    },
    {
      title: "Evaluator Name",
      details: data?.evaluator_name,
    },
    {
      title: "Evaluator Phone",
      details: data?.evaluator_phone,
    },
    {
      title: "Evaluator Email",
      details: data?.evaluator_email,
    },
    {
      title: "Evaluator Designation",
      details: data?.evaluator_designation,
    },
    {
      title: "Start Date",
      details: readableDate(data?.start_date),
    },
    {
      title: "End Date",
      details: readableDate(data?.end_date),
    },
    {
      title: "General Comments",
      details: data?.general_comments,
    },
  ];

  const projectManagemnt = [
    {
      title: "Provided proper oversight of the project",
      details: data?.proper_oversight,
    },
    {
      title: "Reasons for unsatisfactory on proper oversight provided",
      details: data?.proper_oversight_comment,
    },
    {
      title: "Billings were complete and accurate",
      details: data?.billing_accuracy,
    },
    {
      title: "Reasons for unsatisfactory on billing accuracy",
      details: data?.billing_accuracy_comment,
    },
    {
      title: "Provided timely notice, prior to incurrence, of extra costs",
      details: data?.timely_notice,
    },
    {
      title: "Reasons for unsatisfactory on timely notice",
      details: data?.timely_notice_comment,
    },
    {
      title: "Knowledge of the Work performed",
      details: data?.knowledge_work,
    },
    {
      title: "Reasons for unsatisfactory on knowledge work",
      details: data?.knowledge_work_comment,
    },
    {
      title: "Provided adequate, experienced, qualified staff",
      details: data?.qualified_staff,
    },
    {
      title: "Reasons for unsatisfactory on qualified staff",
      details: data?.qualified_staff_comment,
    },
    {
      title:
        "Payment was made to subcontractors in accordance with contract terms",
      details: data?.subcontractors_payment,
    },
    {
      title: "Reasons for unsatisfactory on subcontractors payment",
      details: data?.subcontractors_payment_comment,
    },
    {
      title: "Mitigated Change Order work wherever possible",
      details: data?.mitigated_change,
    },
    {
      title: "Reasons for unsatisfactory on mitigated change",
      details: data?.mitigated_change_comment,
    },
    {
      title:
        "Change Order Proposals submitted were within contract time period and the proposed costs were not excessive",
      details: data?.change_order_proposals,
    },
    {
      title: "Reasons for unsatisfactory on change order proposals",
      details: data?.change_order_proposals_comment,
    },
  ];

  const scheduling = [
    {
      title:
        "Contractor's initial schedules approved pursuant to contract documents",
      details: data?.intial_schedule,
    },
    {
      title: "Reasons for unsatisfactory on initial schedule",
      details: data?.intial_schedule_comment,
    },
    {
      title:
        "Scheduling updates were proper, adequate, and submitted on time per contract",
      details: data?.schedule_updates,
    },
    {
      title: "Reasons for unsatisfactory on schedule updates",
      details: data?.schedule_updates_comment,
    },
    {
      title: "Maintained adherence to all schedules",
      details: data?.maintained_adherence,
    },
    {
      title: "Reasons for unsatisfactory on maintained adherence",
      details: data?.maintained_adherence_comment,
    },
    {
      title: "Project completed on time as defined by the contract",
      details: data?.timely_completion,
    },
    {
      title: "Reasons for unsatisfactory on timely completion",
      details: data?.timely_completion_comment,
    },
  ];

  const performance = [
    {
      title: "Responded to directives in accordance with contract terms",
      details: data?.directives_response,
    },
    {
      title: "Reasons for unsatisfactory on directives response",
      details: data?.directives_response_comment,
    },
    {
      title:
        "Approval of Coordination/Shop Drawings Comments received prior to starting that work (If applicable)",
      details: data?.cordination,
    },
    {
      title: "Reasons for unsatisfactory on cordination",
      details: data?.cordination_comment,
    },
    {
      title: "Contractor complied with all contract terms",
      details: data?.terms_compliance,
    },
    {
      title: "Reasons for unsatisfactory on terms complaince",
      details: data?.terms_compliance_comment,
    },
    {
      title:
        "Contractor collaborated with the State and all other parties of interest",
      details: data?.state_collaboration,
    },
    {
      title: "Reasons for unsatisfactory on state collaboration",
      details: data?.state_collaboration_comment,
    },
    {
      title: "Ability to work within the contract's alloted costs",
      details: data?.work_with_cost,
    },
    {
      title: "Reasons for unsatisfactory on contract allocated cost",
      details: data?.work_with_cost_comment,
    },
    {
      title: "Adherence to Plans and Specifications",
      details: data?.adherence_to_plans,
    },
    {
      title: "Reasons for unsatisfactory on plans and specifications",
      details: data?.adherence_to_plans_comment,
    },
  ];

  const safety = [
    {
      title:
        "Complied with Safety Requirements in accordance with the contract",
      details: data?.safety_requirements,
    },
    {
      title: "Reasons for unsatisfactory on safety requirements",
      details: data?.safety_requirements_comment,
    },
    {
      title: "Had no HSSE violations on this project",
      details: data?.hsse_violations,
    },
    {
      title: "Reasons for unsatisfactory on HSSE violations",
      details: data?.hsse_violations_comment,
    },
    {
      title: "Project site cleanliness maintained per contract documents",
      details: data?.site_cleanliness,
    },
    {
      title: "Reasons for unsatisfactory on site cleanliness",
      details: data?.site_cleanliness_comment,
    },
  ];

  const projectOperations = [
    {
      title: "Quality of the Work performed",
      details: data?.quality_work,
    },
    {
      title: "Reasons for unsatisfactory on quality of work performed",
      details: data?.quality_work_comment,
    },
    {
      title:
        "Contractor provided adequate materials and equipment to perform the Work",
      details: data?.contractor_provided,
    },
    {
      title: "Reasons for unsatisfactory on provided adequate materials",
      details: data?.contractor_provided_comment,
    },
    {
      title:
        "No more than one reinspection required to correct unsatisfactory work",
      details: data?.reinspection_required,
    },
    {
      title: "Reasons for unsatisfactory on reinspection required",
      details: data?.reinspection_required_comment,
    },
    {
      title: "Substantial Completion granted upon initial inspection",
      details: data?.substantial_completion,
    },
    {
      title: "Reasons for unsatisfactory on substantial completion",
      details: data?.substantial_completion_comment,
    },
    {
      title: "Execution of site logistics",
      details: data?.execution_site,
    },
    {
      title: "Reasons for unsatisfactory on execution of site logistics",
      details: data?.execution_site_comment,
    },
  ];

  const projectCloseout = [
    {
      title:
        "Commissioning and equipment start-up accomplished pursuant to contract",
      details: data?.comminsioning_equipment,
    },
    {
      title:
        "Reasons for unsatisfactory on commissioning and equipment start-up",
      details: data?.comminsioning_equipment_comment,
    },
    {
      title: "Project closed out in accordance with the contract conditions",
      details: data?.project_closed,
    },
    {
      title: "Reasons for unsatisfactory on project closed",
      details: data?.project_closed_comment,
    },
    {
      title:
        "Contractor's Close-Out Package delivered to the Consultant within the contractually specified time",
      details: data?.contractor_closeout,
    },
    {
      title: "Reasons for unsatisfactory on contractor closeout",
      details: data?.contractor_closeout_comment,
    },
  ];

  const compliance = [
    {
      title:
        "Complied with statutory and regulatory requirements, including environmental compliance",
      details: data?.compiled_satutory,
    },
    {
      title: "Reasons for unsatisfactory on compiled statutory",
      details: data?.compiled_satutory_comment,
    },
    {
      title: "Had no Labor Law violations on this project",
      details: data?.labor_violations,
    },
    {
      title: "Reasons for unsatisfactory on labor law violations",
      details: data?.labor_violations_comment,
    },
    {
      title: "Met Contract compliance requirements",
      details: data?.contract_compliance,
    },
    {
      title: "Reasons for unsatisfactory on contractor closeout",
      details: data?.contract_compliance_comment,
    },
    {
      title: "Met Set-aside Requirements",
      details: data?.set_aside_requirements,
    },
    {
      title: "Reasons for unsatisfactory on set-aside requirements",
      details: data?.set_aside_requirements_comment,
    },
  ];

  return (
    <div className="">
      <Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h1 style={{ fontSize: "16px" }} className="font-extrabold">
              Contractor Evaluator
            </h1>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3} className="mt-5">
              {contractorEvaluator?.map((data, index) => (
                <Grid key={index} item xs={12} sm={6} md={6}>
                  <h3 className="font-bold">{data.title}</h3>
                  <p>{data.details}</p>
                </Grid>
              ))}
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
              Project Management
            </h1>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3} className="mt-5">
              {projectManagemnt?.map((data, index) => (
                <Grid key={index} item xs={12} sm={6} md={6}>
                  <h3 className="font-bold">{data.title}</h3>
                  <p>{data.details}</p>
                </Grid>
              ))}
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
              Scheduling
            </h1>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3} className="mt-5">
              {scheduling?.map((data, index) => (
                <Grid key={index} item xs={12} sm={6} md={6}>
                  <h3 className="font-bold">{data.title}</h3>
                  <p>{data.details}</p>
                </Grid>
              ))}
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
              Performance
            </h1>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3} className="mt-5">
              {performance?.map((data, index) => (
                <Grid key={index} item xs={12} sm={6} md={6}>
                  <h3 className="font-bold">{data.title}</h3>
                  <p>{data.details}</p>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5a-content"
            id="panel5a-header"
          >
            <h1 style={{ fontSize: "16px" }} className="font-extrabold">
              Safety
            </h1>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3} className="mt-5">
              {safety?.map((data, index) => (
                <Grid key={index} item xs={12} sm={6} md={6}>
                  <h3 className="font-bold">{data.title}</h3>
                  <p>{data.details}</p>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6a-content"
            id="panel6a-header"
          >
            <h1 style={{ fontSize: "16px" }} className="font-extrabold">
              Project Operations
            </h1>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3} className="mt-5">
              {projectOperations?.map((data, index) => (
                <Grid key={index} item xs={12} sm={6} md={6}>
                  <h3 className="font-bold">{data.title}</h3>
                  <p>{data.details}</p>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7a-content"
            id="panel7a-header"
          >
            <h1 style={{ fontSize: "16px" }} className="font-extrabold">
              Project Closeout
            </h1>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3} className="mt-5">
              {projectCloseout?.map((data, index) => (
                <Grid key={index} item xs={12} sm={6} md={6}>
                  <h3 className="font-bold">{data.title}</h3>
                  <p>{data.details}</p>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7a-content"
            id="panel7a-header"
          >
            <h1 style={{ fontSize: "16px" }} className="font-extrabold">
              Compliance
            </h1>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3} className="mt-5">
              {compliance?.map((data, index) => (
                <Grid key={index} item xs={12} sm={6} md={6}>
                  <h3 className="font-bold">{data.title}</h3>
                  <p>{data.details}</p>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
};

export default EvaluationDetails;
