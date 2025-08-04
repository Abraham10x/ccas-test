/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC, useState } from "react";
import { Toaster } from "react-hot-toast";
import Card from "@components/application/Card";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TbArrowBarRight } from "react-icons/tb";
import axios from "axios";
import Modal from "@components/application/Modal";
import { Button } from "@components/application/base/Button";
import { readableDate } from "@lib/helper";
interface IProps {
  id: any;
  title: string;
  description: string;
  date: string;
}
const ViewTemplateModal: FC<IProps> = ({ id, title, date }: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const [template, setTemplate] = useState<any>({});

  const handleModal = () => {
    setShowModal((prev) => !prev);
  };
  const getTemplate = async (id: any) => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/get_contract_template.php?template_id=${id}`
    );
    setTemplate(data?.data);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Card
        className="p-10 hover:bg-[#CCF2D080] cursor-pointer"
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          getTemplate(id);
          setShowModal(true);
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <HiOutlineDocumentText className="w-10 h-10" />
          </div>
          <p className="text-sm font-medium">{title.substring(0, 50)}...</p>
          <div className="flex flex-row justify-between align-middle">
            <div className="flex flex-row gap-3">
              <p className="text-sm font-bold my-auto">{readableDate(date)}</p>
            </div>
            <TbArrowBarRight className="my-auto w-6 h-6" />
          </div>
        </div>
      </Card>
      <Modal
        label={template.title}
        showModal={showModal}
        onClose={() => setShowModal(false)}
      >
        <div className="mt-8">
          <div className="flex flex-col gap-8 pb-10">
            <p className="text-gray-400 text-sm">{template.description}</p>
            <p className="text-blue text-sm underline">
              <a
                href={template.template}
                rel="noopeneer noreferrer"
                target="_blank"
                download={template.template}
              >
                Click to open and download file
              </a>
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="text-sm font-bold my-auto">
              Date created: {readableDate(template.created_at)}
            </p>
          </div>
          <div className="flex justify-start items-center gap-x-5 py-5 border-t">
            <Button
              onClick={handleModal}
              type="submit"
              className="bg-green text-white "
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewTemplateModal;
