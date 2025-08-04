import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import RequestRepository, {
  RequestUser,
  UpdateStatus,
} from "@lib/repositories/request-user.repository";
import toast from "react-hot-toast";
import queryKey from "./keys";
import { useRouter } from "next/router";

const create = (options = {}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (body: RequestUser) => {
      const payload = await RequestRepository.handleUserRequest(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.create]);
        toast.success("Request Sent!!! 🎉");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: RequestUser) => mutate(body),
  };
};

const getRequest = (mda: any) => {
  const response = useQuery({
    queryKey: [queryKey.read],
    queryFn: async () => await RequestRepository.readMdaRequest(mda),
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

const getAllRequest = () => {
  const response = useQuery({
    queryKey: [queryKey.read],
    queryFn: async () => await RequestRepository.readAllRequest(),
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

const updateStatus = (action?: any) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation(
    async (body: UpdateStatus) => {
      const payload = await RequestRepository.handleStatus(body);
      return payload;
    },
    {
      mutationKey: [queryKey.updateStatus],
      onSuccess: async (payload: any) => {
        await queryClient.invalidateQueries([queryKey.updateStatus]);
        toast.success(payload.data.message);
        setTimeout(() => {
          router.reload();
        }, 2000);
      },
      onError: (err: any) => {
        toast.error(
          err.response.data?.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: UpdateStatus) => mutate(body),
  };
};

const RequestuserQueries = { create, getRequest, getAllRequest, updateStatus };
export default RequestuserQueries;
