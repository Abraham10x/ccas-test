import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import monitoringRepository, {
  CompleteMilestone,
  Milestone,
} from "@lib/repositories/monitoring.repository";
import { toast } from "react-hot-toast";
import queryKey from "./keys";
import { useRouter } from "next/router";

const create = (options = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation(
    async (body: Milestone) => {
      const payload = await monitoringRepository.create(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.readSingle]);
        toast.success("KPI created successfully!!! 🎉");
        setTimeout(() => {
          router.reload();
        }, 2000);
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: Milestone) => mutate(body),
  };
};

const readByContractId = (id: any) => {
  const response = useQuery({
    queryKey: [queryKey.readAll],
    queryFn: async () => await monitoringRepository.readByContractId(id),
    onSuccess: (payload: any) => {
      // toast.success
    },
    onError: (err: any) => {
      toast.error(
        err.response.data.message ? err.response.data.message : err.message
      );
    },
  });
  return response;
};

const update = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation(
    async (body: CompleteMilestone) => {
      const payload = await monitoringRepository.update(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.readSingle]);
        setTimeout(() => {
          toast.success("KPI completed successfully!!! 🎉");
          router.reload();
        }, 5000);
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: CompleteMilestone) => mutate(body),
  };
};

const monitorQueries = { create, readByContractId, update };

export default monitorQueries;
