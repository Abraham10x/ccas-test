import Seo from "@components/application/Seo";
import Header from "@components/dashboard/Header";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AdminMenu from "../../../common/lib/dashboard/menu/admin.menu.json";
import AddUserForm from "@components/dashboard/super-admin/add-user/AddUserForm";
import CreateMdaModal from "@components/dashboard/general/modal/CreateMdaModal";
import { useState } from "react";
import { Button } from "@components/application/base/Button";
import { IoMdAdd } from "react-icons/io";

const AddUser: NextPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <Dashboard navMenu={AdminMenu}>
      <Seo templateTitle="Add Users" />
      <Header />

      {/* starts here */}
      <div className="px-5 sm:px-10">
        <div className="my-5 py-5">
          <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
            Add User
          </h1>
          <p className="text-sm sm:text-base font-medium text-tx-light-dark">
            Create users - Assign role and fill in biodata of a user
          </p>
        </div>
        <div className="mt-16">
          <div className="w-full lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between">
              <h2 className="font-semibold text-lg sm:text-xl text-gray-900 mb-5">
                Personal Information
              </h2>
              <Button
                onClick={handleModal}
                className="bg-green text-white flex items-center gap-x-2 w-fit sm:gap-x-4 btn-shadow"
              >
                <IoMdAdd className="h-5 w-5" />
                <p>Create MDA</p>
              </Button>
            </div>
            <AddUserForm />
            <CreateMdaModal showModal={showModal} setShowModal={setShowModal} />
          </div>
        </div>
      </div>
      {/* ends */}
    </Dashboard>
  );
};

export default AddUser;
