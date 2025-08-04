import Seo from "@components/application/Seo";
import Dashboard from "@components/layouts/Dashboard";
import { NextPage } from "next";
import AuthorizerMenu from "../../../common/lib/dashboard/menu/authorizer.menu.json";
import Header from "@components/dashboard/Header";
import { Button } from "@components/application/base/Button";

const closeOutReview: NextPage = () => {
  const lessonData = [
    {
      id: 1,
      title: "Legal Director Name",
      body: "Mr. Niyi Fawemi",
    },
    {
      id: 2,
      title: "MDA",
      body: "Federal Ministry of Housing",
    },
    {
      id: 3,
      title: "Department",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      id: 4,
      title: "Date",
      body: "June 24, 2023",
    },
    {
      id: 5,
      title: "Legal Adviser Details",
      body: "Lorem-ipsum-dolor.pdf",
    },
  ];
  return (
    <Dashboard navMenu={AuthorizerMenu}>
      <Seo templateTitle="Request Details" />
      <Header />
      <div className="px-10 mt-10">
        <div className="my-5 py-5">
          <h1 className="font-extrabold text-2xl text-tx-dark">Requests</h1>
          <p className="text-base font-medium text-tx-light-dark">
            Accept or decline incoming requests
          </p>
        </div>
        <div className="my-6 flex flex-row justify-start align-middle gap-4">
          <div className="mt-5">
            <h3 className="text-xl uppercase font-semibold">
              Mr. Niyi Fawemi (Legal Director) from Ministry of Works requests
              an approval
            </h3>
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
                Accepted
              </label>
            </div>
            <div className="border flex flex-col gap-8 border-gray-400 rounded-3xl py-10 px-12 mt-12 mb-8">
              {lessonData.map((data) => (
                <div key={data.id} className="flex flex-col gap-1">
                  <h5 className="text-base font-semibold">{data.title}</h5>
                  <p
                    className={`text-base font-normal ${
                      data.id === 5
                        ? "text-[#003FC7] underline"
                        : "text-tx-light-dark"
                    }`}
                  >
                    {data.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-row gap-5 mb-8">
              <Button className="bg-green bg-green/70 rounded-lg font-semibold text-white text-sm">
                Accept
              </Button>
              <Button className="bg-[#C71700] bg-[#C71700]/80 rounded-lg font-semibold text-white text-sm">
                Reject
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default closeOutReview;
