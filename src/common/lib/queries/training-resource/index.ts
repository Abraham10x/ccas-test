import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import trainingResourceRepository, {
  CreateResource,
} from "@lib/repositories/training-resource.repository";
import { toast } from "react-hot-toast";
import queryKey from "./keys";

const createResource = (options = {}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (body: CreateResource) => {
      const payload = await trainingResourceRepository.createResource(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        toast.success("Created successfully!!! 🎉");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: CreateResource) => mutate(body),
  };
};

const getResource = () => {
  const response = useQuery({
    queryKey: [queryKey.read],
    queryFn: async () => await trainingResourceRepository.getResource(),
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

const getSingleResource = (id: any) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [queryKey.read],
    enabled: false,
    queryFn: async () => await trainingResourceRepository.getSingleResource(id),
    onSuccess: (payload: any) => {
      // toast.success
    },
    onError: (err: any) => {
      toast.error(
        err.response.data.message ? err.response.data.message : err.message
      );
    },
  });
  return { isLoading, data, refetch };
};

const resourceQueries = { createResource, getResource, getSingleResource };

export default resourceQueries;
