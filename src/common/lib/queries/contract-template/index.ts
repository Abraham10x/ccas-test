import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import contractTemplateRepository, {
  CreateTemplate,
} from "@lib/repositories/contract-template.repository";
import { toast } from "react-hot-toast";
import queryKey from "./keys";

const createTemplate = (options = {}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (body: CreateTemplate) => {
      const payload = await contractTemplateRepository.createTemplate(body);
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
    mutate: (body: CreateTemplate) => mutate(body),
  };
};

const getTemplates = () => {
  const response = useQuery({
    queryKey: [queryKey.read],
    queryFn: async () => await contractTemplateRepository.getTemplate(),
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

const getSingleTemplate = (id: any) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [queryKey.read],
    enabled: false,
    queryFn: async () => await contractTemplateRepository.getSingleTemplate(id),
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

const templateQueries = { createTemplate, getTemplates, getSingleTemplate };

export default templateQueries;
