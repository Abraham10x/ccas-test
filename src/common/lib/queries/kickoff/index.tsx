import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import kickoffRepository, {
  CreateKickoff,
  EditKickoff,
} from "@lib/repositories/kickoff.repository";
import toast from "react-hot-toast";
import queryKey from "./keys";
import { useRouter } from "next/router";

const create = (options = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation(
    async (body: CreateKickoff) => {
      const payload = await kickoffRepository.create(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.readSingle]);
        toast.success("Form created successfully!!! 🎉");
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
    mutate: (body: CreateKickoff) => mutate(body),
  };
};

const readAll = () => {
  const response = useQuery({
    queryKey: [queryKey.readAll],
    queryFn: async () => await kickoffRepository.readAll(),
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

const readAllByMda = (mda: any) => {
  const response = useQuery({
    queryKey: [queryKey.readAll],
    queryFn: async () => await kickoffRepository.readAllByMda(mda),
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

const readByUserId = (id: any) => {
  const response = useQuery({
    queryKey: [queryKey.readAll],
    queryFn: async () => await kickoffRepository.readAllByUserId(id),
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

const readSingle = (id: any) => {
  const response = useQuery({
    queryKey: [queryKey.readSingle],
    queryFn: async () => await kickoffRepository.readSingle(id),
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

const readByReviewer = (id: any) => {
  const response = useQuery({
    queryKey: [queryKey.readByReviewer],
    queryFn: async () => await kickoffRepository.readByReviewer(id),
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

const update = (options = {}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (body: EditKickoff) => {
      const payload = await kickoffRepository.update(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.update]);
        toast.success("Form updated successfully!!! 🎉");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: EditKickoff) => mutate(body),
  };
};

const kickoffQueries = {
  create,
  readAll,
  readAllByMda,
  readSingle,
  readByReviewer,
  update,
  readByUserId,
};

export default kickoffQueries;
