import { useMutation, useQueryClient } from "@tanstack/react-query";
import reportRepository, { Report } from "@lib/repositories/report.repository";
import toast from "react-hot-toast";

const create = (options = {}) => {
  const queryClient = useQueryClient();

  const { mutate, data } = useMutation(
    async (body: Report) => {
      const payload = await reportRepository.create(body);
      return payload;
    },
    {
      mutationKey: ["create-report"],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries(["create-report"]);
        toast.success("Report requested!!! 🎉");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: Report) => mutate(body),
    data,
  };
};

const reportQueries = {
  create,
};
export default reportQueries;
