/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC } from "react";
import { toast, Toaster } from "react-hot-toast";
import * as Yup from "yup";
import axios from "axios";
import Modal from "@components/application/Modal";
import { Button, SubmitButton } from "@components/application/base/Button";
import { Formik } from "formik";
import BaseFormInput from "@components/application/base/form/BaseFormInput";
import { retrieveToken } from "@lib/helper";
import requestQueries from "@lib/queries/requests";
import { useRouter } from "next/router";
interface IProps {
  earlyID: any;
  showModal: any;
  action: string;
  // setShowModal: any;
}

const AcceptRejectEarlyNotificationModal: FC<IProps> = ({
  earlyID,
  showModal,
  action,
}: IProps) => {
  const { mutate } = requestQueries.handleEarlyRequest(action);
  // const [showCopyModal, setShowCopyModal] = useState(false);
  const userId = retrieveToken("userId");
  const userType = retrieveToken("userType");
  // const eID = retrieveToken("eID");
  const router = useRouter();

  const handleAction = () => {
    const values = {
      id: earlyID,
      status: action,
      users_id: userId,
    };

    mutate(values);
    // handleModal();
  };

  // const handleModal = () => {
  //   setShowCopyModal((prev) => !prev);
  // };

  const defaultPayload = {
    comment: "",
    comment_type: "early_notifications",
    type_id: earlyID,
    user_title: userType,
    approval_type: action,
  };

  const handleComment = async (values: any, action: any) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/process/create_comment.php`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      switch (action) {
        case "Approved":
          toast.success("Commented on approval successfully!!! 🎉");
          break;
        case "Rejected":
          toast.success("Commented on rejection successfully!!! 🎉");
          break;
        default:
          break;
      }
    } else {
      toast.error("Unable to comment, try again!");
    }
    return response;
  };

  const onSubmit = async (values: {
    comment_type: string;
    type_id: any;
    comment: string;
    user_title: any;
    approval_type: any;
  }) => {
    await handleComment(values, action);
    // setShowModal(false);
    setTimeout(() => {
      handleAction();
    }, 2000);
  };

  const schema = Yup.object({
    comment_type: Yup.string(),
    type_id: Yup.string(),
    comment: Yup.string().required("Required"),
    user_title: Yup.string(),
    approval_type: Yup.string(),
  });

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Modal
        label="Add Comment"
        showModal={showModal}
        // onClose={() => setShowModal(false)}
      >
        <div className="">
          <Formik
            enableReinitialize
            initialValues={defaultPayload}
            validationSchema={schema}
            onSubmit={async (values, { resetForm }) => {
              await onSubmit(values);
              resetForm();
            }}
          >
            {(formik) => {
              const { handleSubmit, values, handleChange } = formik;
              return (
                <div className="px-6 py-4">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-2 mt-5">
                      <BaseFormInput
                        type="textarea"
                        label={`Add reasons for ${
                          action === "Approved" ? "approving" : "rejecting"
                        }`}
                        name="comment"
                        value={values.comment}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex justify-start items-center gap-x-5 py-5 border-t">
                      <SubmitButton
                        type="submit"
                        className="bg-green text-white "
                      >
                        Add Comment
                      </SubmitButton>
                      <Button
                        onClick={() => {
                          router.reload();
                        }}
                        className="border-[1px] border-outline-gray"
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

export default AcceptRejectEarlyNotificationModal;
