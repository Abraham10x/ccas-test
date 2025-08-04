import { FC, useEffect, useState } from "react";
import { retrieveToken } from "@lib/helper";
import axios from "axios";
import { useRouter } from "next/router";
import { SubmitButton } from "@components/application/base/Button";

const LessonsDetails: FC = () => {
  const lessonId = retrieveToken("lessonId");
  const [lesson, setLesson] = useState<any>();

  const router = useRouter();

  useEffect(() => {
    const getLesson = async () => {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contracts/get_single_lesson.php?lesson_id=${lessonId}`
      );
      const response = data?.data;
      setLesson(response);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getLesson();
  }, []);

  const lessonData = [
    {
      id: 1,
      title: "Scope of work",
      body: lesson?.scope_of_work,
    },
    {
      id: 2,
      title: "Location",
      body: lesson?.location,
    },
    {
      id: 3,
      title: "Community Issues",
      body: lesson?.community_issues,
    },
    {
      id: 4,
      title: "Cost Control",
      body: lesson?.cost_control,
    },
    {
      id: 5,
      title: "Key Risks",
      body: lesson?.key_risks,
    },
    {
      id: 6,
      title: "Tendering Exercises",
      body: lesson?.tendering_exercises,
    },
    {
      id: 7,
      title: "MDA Management",
      body: lesson?.mda_management,
    },
  ];

  return (
    <div className="px-5 sm:px-10 mt-5 sm:mt-10">
      <div className="my-5 py-5">
        <h1 className="font-extrabold text-xl sm:text-2xl text-tx-dark">
          Lessons Learnt
        </h1>
        <p className="text-sm sm:text-base font-medium text-tx-light-dark">
          View all lessons learnt
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-y-3 justify-between sm:mt-5">
        <h3 className="text-xl uppercase font-semibold">
          {lesson?.contracts_title}
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
              On Track
            </label>
          </div>
        </h3>

        <SubmitButton
          onClick={() => router.back()}
          className="bg-green text-white "
        >
          Go back
        </SubmitButton>
      </div>

      <div className="border flex flex-col w-full lg:w-1/2 gap-8 border-gray-400 rounded-3xl py-10 px-5 sm:px-12 my-12">
        {lessonData.map((data) => (
          <div key={data.id} className="flex flex-col gap-1">
            <h5 className="text-base font-semibold">{data.title}</h5>
            <p className="text-sm sm:text-base font-normal text-tx-light-dark">
              {data.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonsDetails;
