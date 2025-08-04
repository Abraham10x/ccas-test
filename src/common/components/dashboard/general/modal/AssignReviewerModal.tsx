/* eslint-disable array-callback-return */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import Modal from "@components/application/Modal";
import { Button, SubmitButton } from "@components/application/base/Button";
import roleQueries from "@lib/queries/role";
import { errorParser, retrieveToken } from "@lib/helper";
import BaseFormSelectSearch from "@components/application/base/form/BaseFormSelectSearch";
import axios from "axios";
interface IProps {
  contractId: any;
  title: string;
  formType: string;
  showModal: boolean;
  setShowModal: any;
}

const AssignReviewerModal: FC<IProps> = ({
  title,
  formType,
  showModal,
  setShowModal,
}: IProps) => {
  const allReviewers = roleQueries.getReviewers();

  const eID = retrieveToken("eID");

  const getAllReviewers = () => {
    const reviewerArr: any[] = [];
    allReviewers.data?.data?.user_details.forEach((item: any) => {
      reviewerArr.push({ id: item.id, fullname: item.fullname });    });

    return { reviewerArr };
  };

  const { reviewerArr } = getAllReviewers();

  const arrangeValue = () => {
    const optionArr: any[] = [];
    reviewerArr.map((data) => {
      optionArr.push({ value: data.id, label: data.fullname });
    });
    return optionArr;
  };

  const handleReviewer = async (values: any) => {
    let response;
    try {
      response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/assign_reviewer.php`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Assigned successfully!!! 🎉");
      }
    } catch (err: any) {
      toast.error(
        err.response.data.message ? err.response.data.message : err.message
      );
    }
    return response;
  };

  const defaultPayload = {
    users_id: "",
    id: eID ?? "",
    form_type: formType,
  };

  // const [payload] = useState(defaultPayload);

  const onSubmit = async (values: {
    id: any;
    users_id: any;
    form_type: string;
  }) => {
    // handle form submission here
    values.id = defaultPayload.id;
    await handleReviewer(values);
    setShowModal(false);
  };

  const optionArr = arrangeValue();

  const schema = Yup.object({
    id: Yup.string(),
    user_id: Yup.string(),
    form_type: Yup.string(),
  });

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Modal
        label="Assign Reviewer"
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <div className="">
          <Formik
            initialValues={defaultPayload}
            validationSchema={schema}
            onSubmit={async (values, { resetForm }) => {
              await onSubmit(values);
              resetForm();
            }}
          >
            {(formik) => {
              const {
                handleSubmit,
                values,
                touched,
                errors,
                handleBlur,
                setFieldValue,
              } = formik;
              return (
                <div className="px-6 py-4">
                  <p className="font-bold text-xl sm:text-2xl">{title}</p>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-2 mt-5">
                      <BaseFormSelectSearch
                        instanceId={"select-reviewer"}
                        placeholder="Select Reviewer"
                        label="Reviewers"
                        options={optionArr}
                        value={values.users_id}
                        onBlur={handleBlur}
                        onChange={(value: any) => {
                          setFieldValue("users_id", value.value);
                        }}
                        error={errorParser(errors, touched, "users_id")}
                      />
                    </div>
                    <div className="flex justify-start items-center gap-x-5 py-5 border-t">
                      <SubmitButton
                        type="submit"
                        className="bg-green text-white"
                      >
                        Assign
                      </SubmitButton>
                      <Button
                        className="border-[1px] border-outline-gray"
                        onClick={() => {
                          setShowModal(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              );
            }}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default AssignReviewerModal;
