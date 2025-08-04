import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import contractorEvaluationRepository, {
  ContractorEvaluation,
} from "@lib/repositories/contractor-evaluation";
import toast from "react-hot-toast";
import queryKey from "./keys";
import { useRouter } from "next/router";

const create = (options = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation(
    async (body: ContractorEvaluation) => {
      const payload = await contractorEvaluationRepository.create(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.create]);
        toast.success("Contractor evaluated successfully!!! 🎉");
        setTimeout(() => {
          router.back();
        }, 1000);
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: ContractorEvaluation) => mutate(body),
  };
};

const read = (id: any) => {
  const response = useQuery({
    queryKey: [queryKey.readAll],
    queryFn: async () => await contractorEvaluationRepository.read(id),
    onSuccess: (payload: any) => {
      // toast.success
    },
    onError: (err: any) => {
      toast.error(
        err.response.data?.message ? err.response.data.message : err.message
      );
    },
  });
  return response;
};

const contractorEvalQueries = {
  create,
  read,
};
export default contractorEvalQueries;
