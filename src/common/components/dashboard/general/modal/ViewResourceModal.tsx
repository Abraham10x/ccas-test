/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { FC, useState } from "react";
import Modal from "@components/application/Modal";
import { Button } from "../../../application/base/Button";
import { Toaster } from "react-hot-toast";
import Card from "@components/application/Card";
import { TbArrowBarRight } from "react-icons/tb";
// import Image from "next/image";
import axios from "axios";
import { readableDate } from "@lib/helper";

interface IProps {
  icon: any;
  title: string;
  date: string;
  id: any;
}

const ViewResourceModal: FC<IProps> = ({ title, date, icon, id }: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const [resource, setResource] = useState<any>({});

  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  const getResource = async (id: any) => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/training/get_training_resource.php?id=${id}`
    );
    setResource(data?.data?.training_resource);
  };
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Card
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          getResource(id);
          setShowModal(true);
        }}
        className="p-10 hover:bg-[#CCF2D080] cursor-pointer"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">{icon}</div>
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
        label={resource.title}
        showModal={showModal}
        onClose={() => setShowModal(false)}
      >
        <div className="mt-8">
          <div className="flex flex-col gap-8 pb-10">
            <p className="text-gray-400 text-sm">{resource.description}</p>
            {/* <figure>
              <Image
                className="w-full h-72 object-cover rounded-3xl"
                src="/img/dashboard/general/dog-video.png"
                alt="Dog video"
                width={1000}
                height={1000}
              />
            </figure> */}
            <p className="text-blue text-sm underline">
              <a
                href={resource.training}
                rel="noopeneer noreferrer"
                target="_blank"
                download={resource.training}
              >
                Click to open and download file
              </a>
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="text-sm font-bold my-auto">
              Date created: {readableDate(resource.created_at)}
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

export default ViewResourceModal;
