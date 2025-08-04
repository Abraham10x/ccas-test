import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import closeOutRepository, {
  CloseOut,
} from "@lib/repositories/close-out.repository";
import toast from "react-hot-toast";
import queryKey from "./keys";

const create = (options = {}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (body: CloseOut) => {
      const payload = await closeOutRepository.create(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.readSingle]);
        toast.success("Closeout created successfully!!! 🎉");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: CloseOut) => mutate(body),
  };
};

const readAll = () => {
  const response = useQuery({
    queryKey: [queryKey.readAll],
    queryFn: async () => await closeOutRepository.readAll(),
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

const readSingle = (id: any) => {
  const response = useQuery({
    queryKey: [queryKey.readSingle],
    queryFn: async () => await closeOutRepository.readSingle(id),
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

const readByUserId = (id: any) => {
  const response = useQuery({
    queryKey: [queryKey.readSingle],
    queryFn: async () => await closeOutRepository.readById(id),
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
const readByMda = (mda: any) => {
  const response = useQuery({
    queryKey: [queryKey.readMda],
    queryFn: async () => await closeOutRepository.readByMda(mda),
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

const readByReviewer = (id: any) => {
  const response = useQuery({
    queryKey: [queryKey.readByReviwer],
    queryFn: async () => await closeOutRepository.readByReviewer(id),
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

const closeoutQueries = {
  create,
  readAll,
  readByUserId,
  readSingle,
  readByMda,
  readByReviewer,
};
export default closeoutQueries;
