/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "@components/application/Modal";
import BaseFormInput, {
  LinearProgressWithLabel,
} from "../../../application/base/form/BaseFormInput";
import { Button, SubmitButton } from "../../../application/base/Button";
import { errorParser, retrieveToken } from "@lib/helper";
import { Toaster } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import resourceQueries from "@lib/queries/training-resource";
import useUpload from "@lib/hooks/useUpload";
import { Box } from "@mui/material";

interface IProps {
  id?: any;
}

const userId = retrieveToken("userId");
const userType = retrieveToken("userType");

const AddTrainingModal: FC<IProps> = ({ id }: IProps) => {
  // const [payload] = useState(defaultPayload);
  const [showModal, setShowModal] = useState(false);
  const { mutate } = resourceQueries.createResource();
  const [attach, setAttach] = useState<any>();
  const { data, uploaded, upload, progress, uploadFile } = useUpload();

  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  const defaultPayload = {
    users_id: userId,
    title: "",
    description: "",
    file: attach?.file_url ?? "",
  };

  const schema = Yup.object({
    users_id: Yup.string(),
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    file: Yup.string(),
  });

  const onSubmit = async (values: {
    users_id: string;
    title: string;
    description: string;
    file: any;
  }) => {
    // handle form submission here
    values.file = defaultPayload.file;
    mutate(values);
    handleModal();
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {userType === "Super Admin" ? (
        <Button
          className="bg-green text-white flex items-center gap-x-2 w-fit sm:gap-x-4"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <IoMdAdd className="h-5 w-5" />
          <p>Add Resource</p>
        </Button>
      ) : (
        ""
      )}
      <Modal
        label="Add Training Resource"
        showModal={showModal}
        onClose={() => setShowModal(false)}
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
              const { handleSubmit, values, errors, touched, handleChange } =
                formik;
              return (
                <div className="px-6 py-4">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-2 mt-5">
                      <BaseFormInput
                        type="text"
                        label="Resource Title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "title")}
                      />
                      <BaseFormInput
                        type="text"
                        label="Description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        error={errorParser(errors, touched, "description")}
                      />
                      <BaseFormInput
                        type="file"
                        label="Attachment"
                        name="file"
                        value={""}
                        isUploaded={
                          data?.message === "success" &&
                          data?.file_url !== null &&
                          uploaded === 1 ? (
                            <p style={{ color: "green" }}>Uploaded! ✅</p>
                          ) : (
                            ""
                          )
                        }
                        progressValue={
                          upload === 1 ? (
                            <Box sx={{ width: "100%" }}>
                              <LinearProgressWithLabel
                                color="success"
                                value={progress}
                              />
                            </Box>
                          ) : (
                            <></>
                          )
                        }
                        onChange={async (
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          if (event.currentTarget.files != null) {
                            // setFile(event.currentTarget.files[0]);
                            // eslint-disable-next-line @typescript-eslint/no-floating-promises
                            const fileData = await uploadFile(event, 1);
                            setAttach(fileData);
                          }
                        }}
                        error={errorParser(errors, touched, "file")}
                      />
                    </div>
                    <div className="flex justify-start flex-col sm:flex-row gap-x-5 gap-y-4 py-5 border-t">
                      <SubmitButton
                        data-hs-overlay={`#${id}`}
                        type="submit"
                        className="bg-green text-white "
                      >
                        Add Resource
                      </SubmitButton>
                      <Button
                        className="border-[1px] border-outline-gray"
                        onClick={handleModal}
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

export default AddTrainingModal;
